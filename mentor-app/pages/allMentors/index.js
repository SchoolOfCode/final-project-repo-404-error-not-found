export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/mentors");
  const data = await res.json();

  return {
    props: { mentors: data },
  };
};

const allMentors = ({ mentors }) => {
  return (
    <div>
      <h1>Mentors</h1>
      {mentors.map((mentor) => {
        const {
          biography,
          firstname,
          email,
          socials,
          photourl,
          location,
          userid,
          skills,
        } = mentor;
        return (
          <div key={userid}>
            <a>
              <h3>{firstname}</h3>
              <h4>{location}</h4>
              <p>{email}</p>
              <p>{biography}</p>
              <p>
                {socials.name} {socials.userName}
              </p>
              {skills.map((skill, index) => (
                <p key={index}>{skill}</p>
              ))}

              <img
                src={photourl}
                style={{ width: 100, height: 100, borderRadius: "50%" }}
              ></img>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default allMentors;
