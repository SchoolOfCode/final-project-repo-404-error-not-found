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
        console.log({ mentors });
        const { bio, firstname, email, socials, photourl, location } = mentor;
        return (
          <div key={mentor.id}>
            <a>
              <h3>{firstname}</h3>
              <h4>{location}</h4>
              <p>{email}</p>
              <p>{bio}</p>
              <p>
                {socials.name}: {socials.userName}
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
