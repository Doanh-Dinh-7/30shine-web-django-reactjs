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
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const barData = [
  { month: "1", sales: 50000000000, revenue: 60000000000 },
  { month: "2", sales: 30000000000, revenue: 25000000000 },
  { month: "3", sales: 20000000000, revenue: 15000000000 },
  { month: "4", sales: 20000000000, revenue: 18000000000 },
  { month: "5", sales: 15000000000, revenue: 13000000000 },
];

const topCustomersRevenue = [
  { name: "Chị Hoa", value: 240000000 },
  { name: "Kim tuyến", value: 220000000 },
  { name: "Cô Hoa", value: 210000000 },
  { name: "Tạp hóa", value: 190000000 },
  { name: "Bảy Trang", value: 170000000 },
  { name: "Chị hương", value: 160000000 },
  { name: "chị lệ", value: 150000000 },
  { name: "Hùng bình", value: 140000000 },
  { name: "Phương Thảo", value: 130000000 },
  { name: "Kmart", value: 120000000 },
];

const topCustomersOrder = [
  { name: "Cô Hoa", value: 230 },
  { name: "Tạp hóa", value: 210 },
  { name: "Chị hương", value: 190 },
  { name: "Chị Hoa", value: 180 },
  { name: "Chị thủy", value: 160 },
  { name: "Chị hà", value: 150 },
  { name: "Chị Hiền", value: 140 },
  { name: "Chị phượng", value: 130 },
  { name: "Phương", value: 120 },
  { name: "Cô thủy", value: 110 },
];

const pieChannel = [
  { name: "GT", value: 1.5, color: "#F97316" },
  { name: "N/A", value: 98.5, color: "#3B82F6" },
];

const pieGroup = [
  { name: "Nhóm Siêu thị", value: 57.5, color: "#10B981" },
  { name: "Nhóm cửa hàng", value: 34.5, color: "#E11D48" },
  { name: "Bán lẻ", value: 7.7, color: "#A855F7" },
  { name: "N/A", value: 0.2, color: "#FACC15" },
];

const pieCustomerType = [
  { name: "Khách đăng ký 1 chỉ vàng", value: 59.5, color: "#FACC15" },
  { name: "DK doanh số 30 triệu", value: 19.2, color: "#22D3EE" },
  {
    name: "Khách đăng ký 1 suất du lịch Trung Quốc",
    value: 10.3,
    color: "#4ADE80",
  },
  { name: "Khách đăng ký 1/2 chỉ vàng", value: 4.7, color: "#C084FC" },
  { name: "Khác", value: 3.5, color: "#F472B6" },
  { name: "N/A", value: 2.8, color: "#94A3B8" },
];

const Dashboard = () => {
  return (
    <VStack spacing={4} p={4} align="stretch">
      {/* Filter + Stat */}
      <Flex justify="space-between" wrap="wrap" gap={4}>
        <HStack>
          <Select placeholder="Chọn năm" width="150px">
            <option value="2024">2024</option>
          </Select>
          <Select placeholder="Chọn tháng" width="150px">
            <option value="All">All</option>
          </Select>
        </HStack>

        <HStack spacing={4}>
          <Stat>
            <StatLabel>Tổng doanh số</StatLabel>
            <StatNumber>120,169,502,800</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Tổng doanh thu</StatLabel>
            <StatNumber>120,185,934,800</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Tổng số viếng thăm</StatLabel>
            <StatNumber>535,734</StatNumber>
          </Stat>
        </HStack>
      </Flex>

      {/* Charts */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={1}>
          <Text fontWeight="bold">
            Biến động doanh số, doanh thu theo tháng
          </Text>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => {
                  if (value >= 1_000_000_000)
                    return `${value / 1_000_000_000} Tỉ`;
                  if (value >= 1_000_000) return `${value / 1_000_000} Triệu`;
                  if (value >= 1_000) return `${value / 1_000} Nghìn`;
                  return value;
                }}
              />
              <Tooltip />
              <Bar dataKey="sales" fill="#6B21A8" name="Doanh số" />
              <Bar dataKey="revenue" fill="#059669" name="Doanh thu" />
            </BarChart>
          </ResponsiveContainer>
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontWeight="bold">Top 10 khách hàng có doanh thu cao nhất</Text>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={topCustomersRevenue}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Bar dataKey="value" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontWeight="bold">Top 10 khách hàng đặt hàng nhiều nhất</Text>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={topCustomersOrder}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={100} />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontWeight="bold">Tỉ trọng doanh thu theo kênh</Text>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieChannel}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                label
              >
                {pieChannel.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontWeight="bold">Tỉ trọng doanh thu theo nhóm KH</Text>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieGroup}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                label
              >
                {pieGroup.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontWeight="bold">Tỉ trọng doanh thu theo loại KH</Text>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieCustomerType}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                label
              >
                {pieCustomerType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </GridItem>
      </Grid>
    </VStack>
  );
};

export default Dashboard;
