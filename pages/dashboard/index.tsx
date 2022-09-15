import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import styles from "../../styles/Home.module.css";
import DashboardButton from "./components/DashboardButton";
import { DashboardScreenSelection } from "../../src/utils/Types";
import { useCallback, useState } from "react";

import router from "next/router";
import NavBar from "./components/NavBar";

export default function Dashboard() {
  return (
    <div className={styles.containerAuthenticated}>
      <Head>
        <title>Nitrus</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar userName="isaac_parsons" />
    </div>
  );
}
