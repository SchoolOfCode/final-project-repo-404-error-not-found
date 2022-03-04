import styles from "../../styles/AllMentors.module.css";
import TwitterIcon from "../../components/TwitterIcon";
import GithubIcon from "../../components/GithubIcon";
import LinkedinIcon from "../../components/LinkedinIcon";
import Link from "next/link";
import { server } from "../../config";
import { Button } from "react-bootstrap";

export const getServerSideProps = async () => {
  const res = await fetch(`${server}/api/mentors`);
  const data = await res.json();

  return {
    props: { mentors: data },
  };
};

const AllMentors = ({ mentors }) => {
  return (
    <div className={styles.mentorList}>
      <h1>Mentors</h1>
      {mentors.map((mentor) => {
        const {
          loginid,
          biography,
          firstname,
          surname,
          email,
          socials,
          photourl,
          location,
          userid,
          skills,
          jobtitle,
          company,
        } = mentor;
        return firstname ? (
          <div key={userid}>
            <a className={styles.mentorCard}>
              <div className={styles.profileLeft}>
                <img
                  className={styles.profilePic}
                  src={photourl}
                  // style={{ width: 100, height: 100, borderRadius: "50%" }}
                ></img>

                {socials ? (
                  <div className={styles.socials}>
                    {Object.keys(socials)[0] === "linkedin" ? (
                      <LinkedinIcon handle={Object.values(socials)[0]} />
                    ) : null}
                    {Object.keys(socials)[0] === "github" ? (
                      <GithubIcon handle={Object.values(socials)[0]} />
                    ) : null}
                    {Object.keys(socials)[0] === "twitter" ? (
                      <TwitterIcon handle={Object.values(socials)[0]} />
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className={styles.cardTextArea}>
                <div className={styles.profileRight}>
                  <h3>
                    {firstname} {surname}
                  </h3>
                  <span>
                    <h4 className={styles.jobtitle}>{jobtitle} </h4>
                    at <em>{company}</em>
                  </span>

                  <p className={styles.location}>{location}</p>
                  <p>Email: {email}</p>
                  <p className={styles.bio}>{biography}</p>
                </div>

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

              <Link
                href={{
                  pathname: "/read-profile/mentor",
                  query: {
                    loginid: loginid,
                  },
                }}
  
                <Button variant="outline-success">View Profile</Button>
              </Link>
            </a>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default AllMentors;
