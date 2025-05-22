import React, { useRef, useState, useEffect } from "react";
import { Box, Text, Flex, Tooltip, Button, Spinner } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const colorMap = [
  { color: "#7eb6ff", textColor: "#174ea6" },
  { color: "#7fffd4", textColor: "#00796b" },
  { color: "#ffd6fa", textColor: "#b4005a" },
  { color: "#ffe97a", textColor: "#bfa100" },
  { color: "#ffb3b3", textColor: "#b71c1c" },
];

const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
const hours = Array.from({ length: 12 }, (_, i) => 8 + i); // 8h-19h
const hourHeight = 32;

function getBlocks(hoursArr) {
  if (!hoursArr || hoursArr.length === 0) return [];
  const sorted = [...hoursArr].sort((a, b) => a - b);
  const blocks = [];
  let start = sorted[0];
  let end = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) {
      end = sorted[i];
    } else {
      blocks.push([start, end]);
      start = sorted[i];
      end = sorted[i];
    }
  }
  blocks.push([start, end]);
  return blocks;
}

function getDayBlocks(day, employees) {
  let allBlocks = [];
  employees.forEach((emp, empIdx) => {
    getBlocks(emp.schedule[day]).forEach(([start, end]) => {
      allBlocks.push({ empIdx, emp, start, end });
    });
  });
  allBlocks.sort((a, b) => a.start - b.start || a.empIdx - b.empIdx);
  let slots = [];
  allBlocks.forEach((block) => {
    let slot = 0;
    while (
      slots.some(
        (s) => block.start <= s.end && block.end >= s.start && s.slot === slot
      )
    ) {
      slot++;
    }
    block.slot = slot;
    slots.push({ start: block.start, end: block.end, slot });
  });
  return allBlocks;
}

function getMondayAndSundayOfWeek(offset = 0) {
  const now = new Date();
  const day = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7) + offset * 7);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { monday, sunday };
}

function formatDateVN(date) {
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
}

const EmployeeScheduleGeneral = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [weekType, setWeekType] = useState("current");
  const { monday, sunday } =
    weekType === "current"
      ? getMondayAndSundayOfWeek(0)
      : getMondayAndSundayOfWeek(1);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [stateWeek, setStateWeek] = useState(0);

  // Fetch lịch làm việc theo tuần
  useEffect(() => {
    let ignore = false;
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/nhan-vien/lich-lam-viec/by-week/?week=${stateWeek}`
        );
        if (!res.ok) throw new Error("Không thể tải lịch làm việc");
        const data = await res.json();
        const empMap = {};
        let colorIdx = 0;
        for (const item of data.data) {
          const maNV = item.MaNV;
          if (!empMap[maNV]) {
            empMap[maNV] = {
              MaNV: maNV,
              TenNV: item.TenNV || item.MaNV,
              color: colorMap[colorIdx % colorMap.length].color,
              textColor: colorMap[colorIdx % colorMap.length].textColor,
              schedule: {},
            };
            days.forEach((d) => (empMap[maNV].schedule[d] = []));
            colorIdx++;
          }
          const ngay = new Date(item.NgayLam);
          const thu = days[ngay.getDay() === 0 ? 6 : ngay.getDay() - 1];
          const start = parseInt(item.GioBatDau.split(":")[0], 10);
          const end = parseInt(item.GioKetThuc.split(":")[0], 10) - 1;
          for (let h = start; h <= end; h++) {
            empMap[maNV].schedule[thu].push(h);
          }
        }
        if (!ignore) setEmployees(Object.values(empMap));
      } catch (err) {
        console.log(err);
        if (!ignore) setEmployees([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchSchedule();
    return () => {
      ignore = true;
    };
  }, [stateWeek]);

  // Reload lại tuần hiện tại
  const reloadSchedule = () => {
    setWeekType((w) => (w === "current" ? "next" : "current"));
    setTimeout(
      () => setWeekType((w) => (w === "current" ? "next" : "current")),
      0
    );
  };

  // Import file CSV
  const handleImportCSV = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImporting(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/nhan-vien/lich-lam-viec/import-csv/", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("Import lịch làm việc thành công!");
        reloadSchedule();
      } else {
        const err = await res.text();
        alert("Import thất bại: " + err);
      }
    } catch (error) {
      alert("Lỗi khi import: " + error.message);
    }
    setImporting(false);
    e.target.value = null;
  };

  return (
    <Box bg="#eaf0fb" p={4} borderRadius="xl" boxShadow="md" minH="80vh">
      <Flex align="center" mb={2} gap={2}>
        <Box
          as="button"
          px={3}
          py={1}
          borderRadius="xl"
          bg="gray.100"
          fontWeight="medium"
          mr={2}
        >
          <Button leftIcon={<FiArrowLeft />} onClick={() => navigate(-1)}>
            Quay lại
          </Button>
        </Box>
        <Text
          as="a"
          href="#"
          color="blue.600"
          fontWeight="bold"
          fontSize="lg"
          _hover={{ textDecoration: "underline" }}
        >
          Lịch làm nhân viên
        </Text>
        <Box ml="auto" display="flex" alignItems="center" gap={2}>
          <Box
            borderWidth={1}
            borderRadius="md"
            px={3}
            py={1}
            bg="white"
            fontWeight="bold"
            color="blue.900"
            display="flex"
            alignItems="center"
            gap={2}
          >
            {formatDateVN(monday)} - {formatDateVN(sunday)}{" "}
            <Box as="span" fontSize="lg">
              📅
            </Box>
          </Box>
          <Button
            colorScheme="blue"
            bg="#2563eb"
            color="white"
            fontWeight="bold"
            borderRadius="md"
            px={4}
            py={2}
            _hover={{ bg: "#174ea6" }}
            onClick={() => fileInputRef.current.click()}
            isLoading={importing}
          >
            Thêm lịch làm việc
          </Button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImportCSV}
            disabled={importing}
          />
        </Box>
      </Flex>
      <Flex pl="60px" pr={2} mb={1}>
        {days.map((day) => (
          <Box
            key={day}
            flex={1}
            minW="120px"
            textAlign="center"
            fontWeight="bold"
            color="white"
            bg="#2563eb"
            py={2}
            borderTopLeftRadius={day === days[0] ? "md" : 0}
            borderTopRightRadius={day === days[days.length - 1] ? "md" : 0}
            borderRightWidth={1}
            borderColor="#bcd0ee"
          >
            {day}
          </Box>
        ))}
      </Flex>
      {loading ? (
        <Flex justify="center" align="center" minH="400px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : employees.length === 0 ? (
        <Box textAlign="center" color="gray.500" py={10}>
          Không có lịch làm việc cho tuần này.
        </Box>
      ) : (
        <Flex
          borderRadius="md"
          overflow="auto"
          borderWidth={1}
          borderColor="#bcd0ee"
          bg="white"
        >
          <Box
            w="60px"
            flexShrink={0}
            borderRightWidth={1}
            borderColor="#bcd0ee"
            bg="#f6faff"
          >
            {hours.map((hour) => (
              <Box
                key={hour}
                h={`${hourHeight}px`}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                pr={2}
                fontWeight="bold"
                color="#222"
              >
                {hour}h
              </Box>
            ))}
          </Box>
          {days.map((day) => {
            const blocks = getDayBlocks(day, employees);
            const maxSlot =
              blocks.reduce((max, b) => Math.max(max, b.slot), 0) + 1;
            return (
              <Box
                key={day}
                flex={1}
                minW="120px"
                borderRightWidth={1}
                borderColor="#bcd0ee"
                position="relative"
                bg="#f6faff"
              >
                {hours.map((hour) => (
                  <Box
                    key={hour}
                    h={`${hourHeight}px`}
                    borderBottomWidth={1}
                    borderColor="#e0e7ef"
                  />
                ))}
                {blocks.map((block, idx) => {
                  const top = (block.start - 8) * hourHeight;
                  const height = (block.end - block.start + 1) * hourHeight;
                  const widthPercent = 100 / maxSlot;
                  return (
                    <Tooltip
                      key={block.emp.MaNV + day + block.start}
                      label={`${block.emp.TenNV}: ${block.start}h00 - ${
                        block.end + 1
                      }h00`}
                      placement="top"
                      hasArrow
                      bg={block.emp.color}
                      color={block.emp.textColor}
                      fontWeight="bold"
                    >
                      <Box
                        position="absolute"
                        left={`calc(${block.slot} * ${widthPercent}%)`}
                        top={`${top}px`}
                        height={`${height}px`}
                        width={`calc(${widthPercent}% - 6px)`}
                        bg={block.emp.color}
                        borderRadius="md"
                        boxShadow="sm"
                        border={`2px solid ${block.emp.color}`}
                        zIndex={2 + block.slot}
                        _hover={{ filter: "brightness(0.95)", zIndex: 10 }}
                      />
                    </Tooltip>
                  );
                })}
              </Box>
            );
          })}
        </Flex>
      )}
      <Box mt={6}>
        <Text fontWeight="bold" color="blue.600" mb={2}>
          Chú thích màu nhân viên:
        </Text>
        <Flex gap={4} wrap="wrap">
          {employees.map((emp) => (
            <Flex key={emp.MaNV} align="center" gap={2}>
              <Box
                w={6}
                h={3}
                borderRadius="md"
                bg={emp.color}
                borderWidth={1}
                borderColor="gray.300"
              />
              <Text color={emp.textColor} fontWeight="bold">
                {emp.TenNV}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
      <Flex mt={6} gap={4} justify="center">
        <Box
          as="button"
          fontWeight="bold"
          color={weekType === "current" ? "white" : "#2563eb"}
          bg={weekType === "current" ? "#2563eb" : "transparent"}
          borderRadius="md"
          px={4}
          py={2}
          borderWidth={weekType === "current" ? 0 : 1}
          borderColor="#2563eb"
          textDecoration={weekType === "current" ? "underline" : "none"}
          onClick={() => setWeekType("current")}
          _hover={{ bg: weekType === "current" ? "#174ea6" : "#eaf0fb" }}
          onClickCapture={() => setStateWeek(0)}
        >
          Tuần hiện tại
        </Box>
        <Box
          as="button"
          fontWeight="bold"
          color={weekType === "next" ? "white" : "#2563eb"}
          bg={weekType === "next" ? "#2563eb" : "transparent"}
          borderRadius="md"
          px={4}
          py={2}
          borderWidth={weekType === "next" ? 0 : 1}
          borderColor="#2563eb"
          textDecoration={weekType === "next" ? "underline" : "none"}
          onClick={() => setWeekType("next")}
          _hover={{ bg: weekType === "next" ? "#174ea6" : "#eaf0fb" }}
          onClickCapture={() => setStateWeek(1)}
        >
          Tuần kế tiếp
        </Box>
      </Flex>
    </Box>
  );
};

export default EmployeeScheduleGeneral;
