import Head from "next/head";
import styles from "../../styles/Home.module.css";
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
