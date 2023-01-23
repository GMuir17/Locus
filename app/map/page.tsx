import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./../page.module.css";

const inter = Inter({ subsets: ["latin"] });

const Map = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>HI BANANA</p>
      </div>
    </main>
  );
};

export default Map;
