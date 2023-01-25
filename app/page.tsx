"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Button, Grid, Stack, Container, Typography, Box } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";

import MapPage from "./map/map";

const Home = () => {
  const { isLoading, error, data } = useQuery(["roman-sites"], async () => {
    const res = await axios.get(`/api/sites`);
    return res.data;
  });

  useEffect(() => {
    console.log("banana data", { data });
  }, [data]);

  return (
    <Container maxWidth={false} sx={{ height: "100vh", py: 4, px: 4 }}>
      <Box sx={{ height: "15%" }}>A nice bit of explainer</Box>
      <Box sx={{ height: "85%", display: "flex" }}>
        <Box sx={{ width: "70%" }}>
          <MapPage />
        </Box>
        <Box sx={{ width: "30%" }}>More details about selected</Box>
      </Box>
    </Container>
  );
};

export default Home;
