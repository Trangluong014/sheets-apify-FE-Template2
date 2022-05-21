import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiService from "../app/apiService";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link, CardActionArea, CardActions, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

function LandingPage() {
  const { website } = useSelector((state) => state.website);
  const { spreadsheetId } = website;
  const [landingList, setLandingList] = useState();

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await apiService.get(`/item/${spreadsheetId}`, {
          params: {
            range: "Landing",
          },
        });
        const { itemList } = response.data.data;
        console.log("item", itemList);
        setLandingList(itemList);
        console.log(landingList);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [website]);
  if (!landingList) return <LoadingScreen />;
  return (
    <>
      {landingList.map((item) => (
        <section>
          <Box display="flex" flexDirection="column">
            <Link
              underline="none"
              component={RouterLink}
              to={`/${website.websiteId}/home`}
            >
              <img src={item?.image} alt="landing" width="100%" />
            </Link>
          </Box>
        </section>
      ))}
    </>
  );
}

export default LandingPage;
