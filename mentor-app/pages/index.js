import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";
import { Footer } from "../components/footer.js";
export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Homepage</h1>
      <Footer />
    </div>
  );
}
