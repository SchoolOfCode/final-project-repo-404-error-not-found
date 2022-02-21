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
        const { bio, firstname, email, socials, photourl, location, userid } =
          mentor;
        return (
          <div key={userid}>
            <a>
              <h3>{firstname}</h3>
              <h4>{location}</h4>
              <p>{email}</p>
              <p>{bio}</p>
              <p>
                {socials.name} {socials.userName}
              </p>
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
