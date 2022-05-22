import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useSelector } from "react-redux";
import { useWebsiteConfig } from "../hooks/userWebsiteConfig";
import { Link } from "@mui/material";

function MainHeader() {
  const { website } = useSelector((state) => state.website);
  const websiteConfig = useWebsiteConfig();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: "transparent" }}>
        <Toolbar>
          <Link
            aria-label="menu"
            href={
              website?.websiteId
                ? `/${website.websiteId}`
                : "javascript:void(0)"
            }
            sx={{
              textDecoration: "none",
              whiteSpace: "nowrap",
              color: "text.primary",
            }}
          >
            {websiteConfig.logo && (
              <img
                alt={website?.name || "logo"}
                src={websiteConfig.logo}
                style={{ height: 32, marginRight: "1rem" }}
              />
            )}
            {website?.name}
          </Link>

          {/* <Button
            color="inherit"
            onClick={() => {
              return isAuthenticated ? logout() : null;
            }}
          >
            {" "}
            {isAuthenticated ? "Sign Out" : `Sign In`}
          </Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
