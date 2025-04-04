import { Stack } from "@chakra-ui/react";
import { router } from "./lib/router/browserRouter";
import { RouterProvider } from "react-router-dom";

// export const BASE_URL =
//   import.meta.env.MODE === "development"
//     ? import.meta.env.VITE_API_BASE_URL
//     : "/api";

function App() {
  return (
    <Stack maxHeight="100vh" overflowY={"hidden"}>
      <RouterProvider router={router} />
    </Stack>
  );
}

export default App;
