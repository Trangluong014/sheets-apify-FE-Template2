import { Outlet } from "react-router-dom";

import { Stack } from "@mui/material";

function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
