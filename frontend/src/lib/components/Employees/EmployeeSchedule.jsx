import React from "react";
import { Box, Text, Flex, Tooltip } from "@chakra-ui/react";

// Dữ liệu mẫu nhiều nhân viên, mỗi nhân viên 1 màu
const employees = [
  {
    MaNV: "NV001",
    TenNV: "Nguyễn Anh Tú",
    color: "#7eb6ff",
    textColor: "#174ea6",
    schedule: {
      "Thứ 2": [8, 9, 10, 11, 12, 13],
      "Thứ 3": [14, 15, 16],
      "Thứ 4": [8, 9, 10, 11, 12, 13],
      "Thứ 5": [14, 15, 16, 17, 18],
      "Thứ 6": [8, 9, 10, 11, 12, 13],
      "Thứ 7": [14, 15, 16, 17, 18],
      "Chủ nhật": [8, 9, 10, 11, 12, 13],
    },
  },
  {
    MaNV: "NV002",
    TenNV: "Trần Minh Khoa",
    color: "#7fffd4",
    textColor: "#00796b",
    schedule: {
      "Thứ 2": [14, 15, 16, 17, 18, 19],
      "Thứ 3": [8, 9, 10, 11, 12, 13],
      "Thứ 4": [14, 15, 16, 17, 18, 19],
      "Thứ 5": [8, 9, 10, 11, 12, 13],
      "Thứ 6": [14, 15, 16, 17, 18, 19],
      "Thứ 7": [8, 9, 10, 11, 12, 13],
      "Chủ nhật": [14, 15, 16, 17, 18, 19],
    },
  },
  {
    MaNV: "NV003",
    TenNV: "Lê Thị Hồng",
    color: "#ffd6fa",
    textColor: "#b4005a",
    schedule: {
      "Thứ 2": [18, 19, 20, 21, 22],
      "Thứ 3": [18, 19, 20, 21, 22],
      "Thứ 4": [8, 9, 10],
      "Thứ 5": [18, 19, 20, 21, 22],
      "Thứ 6": [8, 9, 10],
      "Thứ 7": [18, 19, 20, 21, 22],
      "Chủ nhật": [18, 19, 20, 21, 22],
    },
  },
  {
    MaNV: "NV004",
    TenNV: "Phạm Quốc Đạt",
    color: "#ffe97a",
    textColor: "#bfa100",
    schedule: {
      "Thứ 2": [10, 11, 12, 13, 14, 15],
      "Thứ 3": [10, 11, 12, 13, 14, 15],
      "Thứ 4": [14, 15, 16, 17, 18],
      "Thứ 5": [10, 11, 12, 13, 14, 15],
      "Thứ 6": [14, 15, 16, 17, 18],
      "Thứ 7": [10, 11, 12, 13, 14, 15],
      "Chủ nhật": [14, 15, 16, 17, 18],
    },
  },
  {
    MaNV: "NV005",
    TenNV: "Vũ Minh Châu",
    color: "#ffb3b3",
    textColor: "#b71c1c",
    schedule: {
      "Thứ 2": [12, 13, 14, 15],
      "Thứ 3": [16, 17, 18, 19],
      "Thứ 4": [12, 13, 14, 15],
      "Thứ 5": [16, 17, 18, 19],
      "Thứ 6": [12, 13, 14, 15],
      "Thứ 7": [16, 17, 18, 19],
      "Chủ nhật": [12, 13, 14, 15],
    },
  },
];

const days = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
const hours = Array.from({ length: 15 }, (_, i) => 8 + i); // 8h-22h
const hourHeight = 32; // px, chiều cao mỗi giờ

// Gom các khung giờ liên tiếp thành các block
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

// Tìm các block ca làm trùng nhau trong cùng một ngày
function getDayBlocks(day) {
  // Gom tất cả block của mọi nhân viên trong ngày này
  let allBlocks = [];
  employees.forEach((emp, empIdx) => {
    getBlocks(emp.schedule[day]).forEach(([start, end]) => {
      allBlocks.push({
        empIdx,
        emp,
        start,
        end,
      });
    });
  });
  // Sắp xếp theo giờ bắt đầu
  allBlocks.sort((a, b) => a.start - b.start || a.empIdx - b.empIdx);
  // Với mỗi block, xác định vị trí ngang (slot) để không bị chồng lên nhau
  let slots = [];
  allBlocks.forEach((block) => {
    // Tìm slot chưa bị chiếm trong khoảng giờ này
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

const EmployeeSchedule = () => {
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
          ◀ Quay lại
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
        <Box
          ml="auto"
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
          10 - 17/10/2025{" "}
          <Box as="span" fontSize="lg">
            📅
          </Box>
        </Box>
      </Flex>
      {/* Header các thứ */}
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
      <Flex
        borderRadius="md"
        overflow="auto"
        borderWidth={1}
        borderColor="#bcd0ee"
        bg="white"
      >
        {/* Cột giờ */}
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
        {/* Các cột ngày */}
        {days.map((day) => {
          const blocks = getDayBlocks(day);
          // Đếm số slot tối đa trong ngày này để chia width
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
              {/* Grid nền chia giờ */}
              {hours.map((hour) => (
                <Box
                  key={hour}
                  h={`${hourHeight}px`}
                  borderBottomWidth={1}
                  borderColor="#e0e7ef"
                />
              ))}
              {/* Các block màu ca làm, nằm cạnh nhau */}
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
    </Box>
  );
};

export default EmployeeSchedule;
