import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const EditInforForm = ({ editData, onChange, onCancel, onSave, user }) => (
  <Box bg="white" borderRadius="xl" p={6} flex={1} boxShadow="md" minW="350px">
    <Flex align="center" mb={4} gap={2}>
      <span role="img" aria-label="info">
        ℹ️
      </span>
      <Heading size="md">Thông tin cá nhân</Heading>
    </Flex>
    <FormControl mb={3}>
      <FormLabel>Họ và tên</FormLabel>
      <Input name="name" value={editData.HoTenKH} onChange={onChange} />
    </FormControl>
    <FormControl mb={3}>
      <FormLabel>Số điện thoại</FormLabel>
      <Input value={user.SDT} isReadOnly />
    </FormControl>
    <FormControl mb={3}>
      <FormLabel>Email</FormLabel>
      <Input name="email" value={editData.Email} onChange={onChange} />
    </FormControl>
    <Flex gap={3} mt={4}>
      <Button variant="outline" onClick={onCancel}>
        Hủy
      </Button>
      <Button colorScheme="blue" onClick={onSave}>
        Lưu
      </Button>
    </Flex>
  </Box>
);

export default EditInforForm;
