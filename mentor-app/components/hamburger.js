import styles from "../styles/hamburgermenu.module.css";

const Hamburger = () =>{

    return(
        <div className={styles.hamburger}>
            <div className={styles.line1}/>
            <div className={styles.line2}/>
            <div className={styles.line3}/>
        </div>
    )

}
export default Hamburger;