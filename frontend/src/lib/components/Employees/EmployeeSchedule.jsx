import React, { useState } from "react";
import {
  Box,
  Text,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Link,
  Checkbox,
  Input,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiCalendar } from "react-icons/fi";

const EmployeeSchedule = () => {
  const { maNV } = useParams();
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState({
    MaNV: maNV,
    TenNV: "Nguyễn Anh Tú",
    schedules: {
      currentWeek: {
        "Thứ 2": ["Sáng", "Chiều"],
        "Thứ 3": ["Trưa", "Chiều"],
        "Thứ 4": ["Sáng", "Chiều"],
        "Thứ 5": ["Trưa", "Tối"],
        "Thứ 6": ["Sáng", "Chiều"],
        "Thứ 7": ["Trưa", "Tối"],
        "Chủ nhật": ["Sáng", "Chiều"],
      },
      nextWeek: {
        "Thứ 2": ["Sáng", "Tối"],
        "Thứ 3": ["Trưa", "Chiều"],
        "Thứ 4": ["Sáng"],
        "Thứ 5": ["Chiều"],
        "Thứ 6": ["Tối"],
        "Thứ 7": ["Sáng", "Chiều"],
        "Chủ nhật": ["Trưa"],
      },
    },
    currentView: "currentWeek",
  });

  const handleNextWeek = () => {
    setSchedule({
      ...schedule,
      currentView:
        schedule.currentView === "currentWeek" ? "nextWeek" : "currentWeek",
    });
  };

  const currentData = schedule.schedules[schedule.currentView];
  const isCurrentWeek = schedule.currentView === "currentWeek";

  return (
    <Box>
      <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
        <Flex align="center" mb={2} gap={2}>
          <Button
            variant="ghost"
            colorScheme="gray"
            leftIcon={<FiArrowLeft />}
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>
          <Text color="blue.600" fontWeight="medium">
            Lịch làm nhân viên
          </Text>
        </Flex>

        <Flex justify="space-between" align="center" mb={2}>
          <Box bg="gray.100" p={3} borderRadius="md" mb={2}>
            <Text mb={1}>
              Tên nhân viên: <b>{schedule.TenNV}</b>
            </Text>
            <Text>
              Mã nhân viên: <b>{schedule.MaNV}</b>
            </Text>
          </Box>
          <Flex align="center" gap={2}>
            <Input
              variant="outline"
              bg="white"
              color="blue.600"
              borderColor="blue.600"
              size="sm"
              // rightIcon={<FiCalendar />}
              type="date"
              value="2025-04-09"
            />
          </Flex>
        </Flex>

        <Flex
          gap={4}
          mb={2}
          fontSize="sm"
          color="gray.600"
          justifyContent="flex-end"
        >
          <Text
            fontWeight="semibold"
            borderBottom={isCurrentWeek ? "2px solid blue" : "none"}
            color={isCurrentWeek ? "blue.600" : "gray.600"}
            cursor="pointer"
            onClick={() => {
              if (!isCurrentWeek) handleNextWeek();
            }}
          >
            Tuần hiện tại
          </Text>
          <Text
            fontWeight="semibold"
            borderBottom={!isCurrentWeek ? "2px solid blue" : "none"}
            color={!isCurrentWeek ? "blue.600" : "gray.600"}
            cursor="pointer"
            onClick={() => {
              if (isCurrentWeek) handleNextWeek();
            }}
          >
            Tuần tiếp theo
          </Text>
        </Flex>

        <Grid
          templateColumns="repeat(8, 1fr)"
          borderRadius="md"
          overflow="hidden"
        >
          <GridItem
            bg="gray.200"
            py={2}
            px={1}
            fontWeight="bold"
            textAlign="center"
          >
            &nbsp;
          </GridItem>
          {[
            "Thứ 2",
            "Thứ 3",
            "Thứ 4",
            "Thứ 5",
            "Thứ 6",
            "Thứ 7",
            "Chủ nhật",
          ].map((day) => (
            <GridItem
              key={day}
              bg="blue.600"
              color="white"
              textAlign="center"
              py={2}
              fontWeight="medium"
            >
              {day}
            </GridItem>
          ))}

          {["Sáng", "Trưa", "Chiều", "Tối"].map((shift) => (
            <React.Fragment key={shift}>
              <GridItem
                bg="gray.200"
                py={2}
                textAlign="center"
                fontWeight="medium"
              >
                {shift}
              </GridItem>
              {[
                "Thứ 2",
                "Thứ 3",
                "Thứ 4",
                "Thứ 5",
                "Thứ 6",
                "Thứ 7",
                "Chủ nhật",
              ].map((day) => (
                <GridItem
                  key={day + shift}
                  bg={currentData[day]?.includes(shift) ? "blue.100" : "white"}
                  textAlign="center"
                  py={2}
                >
                  <Checkbox
                    isChecked={currentData[day]?.includes(shift)}
                    colorScheme="blue"
                  />
                </GridItem>
              ))}
            </React.Fragment>
          ))}
        </Grid>

        <Flex
          mt={4}
          justify="space-between"
          align="center"
          justifyContent="flex-end"
          gap="6"
        >
          <Text fontSize="sm" color="red.500">
            Lịch làm chưa được duyệt
          </Text>
          <Button colorScheme="blue" size="sm">
            ✓ Duyệt
          </Button>
        </Flex>
      </Box>
      <Box mt={4} fontSize="sm" color="blue">
        <Text>Địa chỉ: Hải Châu - Đà Nẵng</Text>
        <Text>Liên hệ Hotline: 0987654321</Text>
        <Text>
          Fanpage:{" "}
          <Link
            color="blue.600"
            href="https://www.facebook.com/30shineI30XVNT"
            isExternal
          >
            https://www.facebook.com/30shineI30XVNT
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default EmployeeSchedule;
