import React, { useState } from "react";
import { Box, Text, Button, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useParams, useHistory } from "react-router-dom";

const EmployeeSchedule = () => {
  const { maNV } = useParams();
  const history = useHistory();

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
      currentView: "nextWeek",
    });
  };

  const currentData = schedule.schedules[schedule.currentView];

  return (
    <Box p={5} bg="white" borderRadius="lg" boxShadow="md">
      <Flex mb={5} justify="space-between" align="center">
        <Button colorScheme="blue" onClick={() => history.goBack()}>
          Quay lại
        </Button>
        <Text fontSize="lg" fontWeight="bold">
          Lịch làm việc nhân viên
        </Text>
        <Button colorScheme="blue" size="sm" variant="outline">
          10 - 17/10/2025
        </Button>
      </Flex>

      <Text fontSize="md" mb={3}>
        Tên nhân viên: {schedule.TenNV}
      </Text>
      <Text fontSize="md" mb={5}>
        Mã nhân viên: {schedule.MaNV}
      </Text>

      <Grid templateColumns="repeat(8, 1fr)" gap={4} mb={5}>
        <GridItem
          colSpan={1}
          bg="blue.500"
          color="white"
          textAlign="center"
          py={3}
        >
          Thứ
        </GridItem>
        <GridItem
          colSpan={2}
          bg="blue.500"
          color="white"
          textAlign="center"
          py={3}
        >
          Sáng
        </GridItem>
        <GridItem
          colSpan={2}
          bg="blue.500"
          color="white"
          textAlign="center"
          py={3}
        >
          Trưa
        </GridItem>
        <GridItem
          colSpan={2}
          bg="blue.500"
          color="white"
          textAlign="center"
          py={3}
        >
          Chiều
        </GridItem>
        <GridItem
          colSpan={2}
          bg="blue.500"
          color="white"
          textAlign="center"
          py={3}
        >
          Tối
        </GridItem>
        {Object.keys(currentData).map((day) => (
          <React.Fragment key={day}>
            <GridItem bg="gray.100" textAlign="center" py={2}>
              {day}
            </GridItem>
            {["Sáng", "Trưa", "Chiều", "Tối"].map((shift) => (
              <GridItem
                key={shift}
                bg={currentData[day].includes(shift) ? "green.100" : "white"}
                textAlign="center"
                py={2}
              >
                {currentData[day].includes(shift) ? "✔" : ""}
              </GridItem>
            ))}
          </React.Fragment>
        ))}
      </Grid>

      <Flex justify="space-between">
        <Button colorScheme="teal" size="sm" onClick={handleNextWeek}>
          Tuần tiếp theo
        </Button>
      </Flex>
    </Box>
  );
};

export default EmployeeSchedule;
