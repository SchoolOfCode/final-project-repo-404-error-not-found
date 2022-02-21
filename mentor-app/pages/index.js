import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import styles from "../styles/Home.module.css";
import { Footer } from "../components/footer.js";


function clickChange ()  {

}


export default function Home() {
  return (
    <div>
      <h1>Homepage</h1>
      <h2> Join as a...</h2>
      <button>Mentee</button> 
      <button> Mentor</button>
    </div>
  );
}
