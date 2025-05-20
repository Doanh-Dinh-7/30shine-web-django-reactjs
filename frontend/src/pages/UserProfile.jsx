import { useState } from "react";
import { Box, Button, Flex, Avatar, Text } from "@chakra-ui/react";
import EditInforForm from "../lib/components/Profile/EditInforForm";
import EditPasswordForm from "../lib/components/Profile/EditPasswordForm";

const mockUser = {
  name: "Đinh Sỹ Quốc Doanh",
  role: "Khách hàng",
  email: "dinhsquocdoanh@gmail.com",
  phone: "0387631548",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [user, setUser] = useState(mockUser);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => setIsEditing(false);
  const handleCancelPassword = () => setIsChangingPassword(false);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser({ ...user, name: editData.name, email: editData.email });
    setIsEditing(false);
  };

  const handleSavePassword = () => {
    // TODO: Gọi API đổi mật khẩu ở đây
    alert("Đổi mật khẩu thành công!");
    setIsChangingPassword(false);
  };

  return (
    <Box bg="#eaf1fe" minH="100vh" p={4}>
      <Flex gap={6}>
        {/* Thông tin cá nhân */}
        <Box
          bg="white"
          borderRadius="xl"
          p={6}
          w="300px"
          boxShadow="md"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar size="2xl" src={user.avatar} mb={4} />
          <Text fontWeight="bold" fontSize="lg">
            {user.name}
          </Text>
          <Text color="gray.500" mb={4}>
            {user.role}
          </Text>
          <Box w="100%" borderTop="1px solid #eee" my={2} />
          <Flex align="center" w="100%" mb={2} gap={2}>
            <span role="img" aria-label="email">
              📧
            </span>
            <Text>{user.email}</Text>
          </Flex>
          <Flex align="center" w="100%" gap={2}>
            <span role="img" aria-label="phone">
              📞
            </span>
            <Text>{user.phone}</Text>
          </Flex>
          <Box w="100%" borderTop="1px solid #eee" my={2} />
          <Button
            colorScheme="blue"
            mt={2}
            w="100%"
            onClick={handleEdit}
            disabled={isEditing || isChangingPassword}
          >
            Sửa thông tin cá nhân
          </Button>
          <Button
            colorScheme="yellow"
            mt={2}
            w="100%"
            onClick={() => setIsChangingPassword(true)}
            disabled={isEditing || isChangingPassword}
          >
            Đổi mật khẩu
          </Button>
        </Box>

        {/* Form chỉnh sửa */}
        {isEditing && (
          <EditInforForm
            editData={editData}
            onChange={handleChange}
            onCancel={handleCancel}
            onSave={handleSave}
            user={user}
          />
        )}
        {isChangingPassword && (
          <EditPasswordForm
            onCancel={handleCancelPassword}
            onSave={handleSavePassword}
          />
        )}
      </Flex>
    </Box>
  );
};

export default UserProfile;
