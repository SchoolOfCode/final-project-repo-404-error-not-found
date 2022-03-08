import styles from "../styles/hamburgermenu.module.css";
import { useState } from "react";

const Hamburger = () =>{
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
        console.log("clicked")
      }

    return(
      <div>
        <button onClick={toggleHamburger}>
           <div className={styles.hamburger}>
               <div className={styles.line1}/>
               <div className={styles.line2}/>
               <div className={styles.line3}/>
           </div>
        </button>
      </div>
    )

}
export default Hamburger;