// import css from "./index.module.css";
import styles from "../../styles/AllMentors.module.css";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/mentors");
  const data = await res.json();

  return {
    props: { mentors: data },
  };
};

const AllMentors = ({ mentors }) => {
  return (
    <div>
      <h1>Mentors</h1>
      {mentors.map((mentor) => {
        const {
          biography,
          firstname,
          surname,
          email,
          socials,
          photourl,
          location,
          userid,
          skills,
        } = mentor;
        return firstname ? (
          <div key={userid}>
            <a className={styles.mentorCard}>
              <div className={styles.profileLeft}>
                <img
                  src={photourl}
                  style={{ width: 100, height: 100, borderRadius: "50%" }}
                ></img>

                {socials ? (
                  <p className={styles.socials}>
                    {socials.name} {socials.userName}
                  </p>
                ) : null}
              </div>
              <div className={styles.cardTextArea}>
                <div className={styles.profileRight}>
                  <h3>
                    {firstname} {surname}
                  </h3>
                  <h4>{location}</h4>
                </div>
                <p>Email: {email}</p>
                <p>{biography}</p>
                {skills ? (
                  <div className={styles.skills}>
                    {skills.map((skill, index) => (
                      <p className={styles.skill} key={index}>
                        {skill}
                      </p>
                    ))}
                  </div>
                ) : null}
              </div>
            </a>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default AllMentors;
