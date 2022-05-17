import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import useAuth from "../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function MainHeader() {
  const { isAuthenticated, logout } = useAuth();

  let navigate = useNavigate();
  const { website } = useSelector((state) => state.website);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate(`/${website.websiteId}`)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {website?.name}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              return isAuthenticated ? logout() : null;
            }}
          >
            {" "}
            {isAuthenticated ? "Sign Out" : `Sign In`}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
