import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Select,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [topServices, setTopServices] = useState([]);
  const [topStaff, setTopStaff] = useState([]);
  const [revenueByMonth, setRevenueByMonth] = useState([]);

  useEffect(() => {
    // API 1 - Tham số tổng quát
    axios
      .get("http://127.0.0.1:8000/api/tai-khoan/dashboard-revenue/")
      .then((res) => setSummary(res.data));

    // API 2 - Dịch vụ hot
    axios
      .get("http://127.0.0.1:8000/api/tai-khoan/dashboard-top-services/")
      .then((res) => setTopServices(res.data.top_services));

    // API 3 - Nhân viên ưa thích
    axios
      .get("http://127.0.0.1:8000/api/tai-khoan/dashboard-appointments/")
      .then((res) => setTopStaff(res.data.top_staff));

    // API 4 - Doanh thu theo tháng
    axios
      .get("http://127.0.0.1:8000/api/tai-khoan/dashboard-revenue-by-month/")
      .then((res) => setRevenueByMonth(res.data.revenue_by_month));
  }, []);

  return (
    <VStack spacing={4} p={4} align="stretch">
      {/* Filter + Stat */}
      <Flex justify="space-between" gap={4}>
        <HStack>
          <Select placeholder="Chọn năm" width="150px">
            <option value="2024">2024</option>
          </Select>
          <Select placeholder="Chọn tháng" width="150px">
            <option value="All">All</option>
          </Select>
        </HStack>

        {/* Tham số tổng quát */}
        <HStack spacing={4}>
          <Stat>
            <Flex align="center" direction="column">
              <StatLabel mr={2} whiteSpace="nowrap">
                Tổng doanh thu
              </StatLabel>
              <StatNumber color="red.500" whiteSpace="nowrap">
                {summary ? summary.total_revenue.toLocaleString() : "..."} VNĐ
              </StatNumber>
            </Flex>
          </Stat>
          <Stat>
            <Flex align="center" direction="column">
              <StatLabel mr={2} whiteSpace="nowrap">
                Tổng số hóa đơn
              </StatLabel>
              <StatNumber whiteSpace="nowrap">
                {summary ? summary.total_invoice : "..."}
              </StatNumber>
            </Flex>
          </Stat>
          <Stat>
            <Flex align="center" direction="column">
              <StatLabel mr={2} whiteSpace="nowrap">
                Khách hàng mới
              </StatLabel>
              <StatNumber whiteSpace="nowrap">
                {summary ? summary.new_customers : "..."}
              </StatNumber>
            </Flex>
          </Stat>
        </HStack>
      </Flex>

      {/* Charts */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={1}>
          <Text fontWeight="bold">Doanh thu theo tháng</Text>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={revenueByMonth.map((item) => ({
                month: item.month,
                revenue: item.total_revenue,
              }))}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#6B21A8" name="Doanh thu" />
            </BarChart>
          </ResponsiveContainer>
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontWeight="bold">Top dịch vụ hot</Text>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              layout="vertical"
              data={topServices.map((item) => ({
                name: item.MaDV__TenDV,
                value: item.total,
              }))}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Bar dataKey="value" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontWeight="bold">Top nhân viên ưa thích</Text>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              layout="vertical"
              data={topStaff.map((item) => ({
                name: item.HoTenNV,
                value: item.total,
              }))}
            >
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Dashboard;
