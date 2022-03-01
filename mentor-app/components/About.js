import styles from "../styles/Home.module.css";
import Image from "next/image";
import svg1 from "../Images/undraw_pair_programming_re_or4x.svg";
import svg2 from "../Images/undraw_connection_re_lcud.svg";
import svg3 from "../Images/undraw_programming_re_kg9v.svg";

const About = () => {
  return (
    <div>
      <h1 className={styles.heading} id="#about">
        About
      </h1>
      <p className={styles.aboutDescription}>
        Whatever your background, experiences or skill set may be, Mentoree aims
        to provide a safe platform to connect people who are interested in tech
        or already in industry to share and exchange knowledge.
      </p>
      <h1 className={styles.heading}>How does it work</h1>

      <div className={styles.card}>
        <div className={styles.stepCard}>
          {
            <Image
              alt="example"
              style={{ width: 150, height: 150 }}
              // src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              src={svg1}
            />
          }
          <div className={styles.stepContent}>
            <h3 className={styles.abouttitle}> Challenge your knowledge </h3>
            <p className={styles.aboutpara}>
              {" "}
              Teaching is one of the best ways to solidify your own knowledge,
              discover your weak spots, and see innovative ideas you'd never
              have dreamed of.
            </p>
          </div>
        </div>

        <div className={styles.stepCard}>
          {
            <Image
              alt="example"
              style={{ width: 150, height: 150 }}
              src={svg2}
            />
          }
          <div className={styles.stepContent}>
            <h3 className={styles.abouttitle}>
              {" "}
              Provide opportunity for others{" "}
            </h3>
            <p className={styles.aboutpara}>
              {" "}
              Mentors can have a tremendous impact on students' learning,
              rapidly accelerating their skills. Be that catalyst for change in
              another’s life.
            </p>
          </div>
        </div>

        <div className={styles.stepCard}>
          {
            <Image
              alt="example"
              style={{ width: 150, height: 150 }}
              src={svg3}
            />
          }
          <div className={styles.stepContent}>
            <h3 className={styles.abouttitle}> Develop your "soft skills" </h3>
            <p className={styles.aboutpara}>
              {" "}
              Soft skills like communication and being able to take feedback are
              paramount in progressing in any field or profession.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
