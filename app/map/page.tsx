"use client";

import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./../page.module.css";
import Button from "@mui/material/Button";

const inter = Inter({ subsets: ["latin"] });

const Map = () => {
  return (
    <div>
      <Button variant="contained">Hello Banana</Button>
    </div>
  );
};

export default Map;
