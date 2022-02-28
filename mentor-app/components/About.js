import styles from "../styles/Home.module.css"

const About = () => {
  return (
    <div>
      <h1 className="#about">About</h1>
      <p>
      Whatever your background, experiences or skill set may be, Mentoree aims to provide a safe platform 
      to connect people who are interested in tech or already in industry to share and exchange knowledge.
      </p>
      <h1>How does it work</h1>
    
      <div className= {styles.card}>
  
        <div className={styles.step1}>
        {<img alt="example" style={{ width: 150 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        <h3> hello hi hey </h3>
        <p> mentoree</p>
        </div> 

        <div className={styles.step2}>
        {<img alt="example" style={{ width: 150 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        <h3> hello hi hey </h3>
        <p> mentoree</p>
        </div> 

        <div className={styles.step3}>
        {<img alt="example" style={{ width: 150 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        <h3> hello hi hey </h3>
        <p> mentoree</p>
        </div> 
        </div>
        </div>
)}
       ;
export default About;
