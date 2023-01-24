"use client";
import { useEffect } from "react";
import Link from "next/link";
import { Button, Grid, Stack, Container, Typography, Box } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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
        <Box sx={{ width: "70%" }}>The map</Box>
        <Box sx={{ width: "30%" }}>More details about selected</Box>
      </Box>
    </Container>
  );
};

export default Home;

// postgres details
// username: postgres
// password: v2udbmvkYYVr6T3Eij2X
// endpoint: locus-1.c6wv1equojj1.eu-west-2.rds.amazonaws.com
// db name: locus
