import styles from "../styles/Home.module.css"

const About = () => {
  return (
    <div>
      <h1 className="#about">About</h1>
      <p>
      Whatever your background, experiences or skill set may be, Mentoree aims to provide a safe platform 
      to connect people who are interested in tech or already in industry to share and exchange knowledge.
      </p>
      <h1 className={styles.aboutmain}>How does it work</h1>
    
      <div className= {styles.card}>
  
        <div className={styles.step1}>
        {<img alt="example" style={{ width: 150 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        <h3 className={styles.abouttitle}> Challenge your knowledge </h3>
        <p className={styles.aboutpara}> Teaching is one of the best ways to solidify your own knowledge, 
        discover your weak spots, and see innovative ideas you'd never have dreamed of.
        </p>
        </div> 

        <div className={styles.step2}>
        {<img alt="example" style={{ width: 150 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        <h3 className={styles.abouttitle}> Provide opportunity for others </h3>
        <p className={styles.aboutpara}>  Mentors can have a tremendous impact on students' learning, rapidly accelerating their skills.
         Be that catalyst for change in another’s life. 
         </p>
        </div> 

        <div className={styles.step3}>
        {<img alt="example" style={{ width: 150 }} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        <h3 className={styles.abouttitle}> Develop your "soft skills" </h3>
        <p className={styles.aboutpara}> Soft skills like communication and being able to take feedback are paramount in progressing
         in any field or profession. 
         </p>
        </div> 
        </div>
        </div>
)}
       ;
export default About;
