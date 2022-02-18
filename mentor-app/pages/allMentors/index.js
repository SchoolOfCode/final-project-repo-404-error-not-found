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
        const { bio, firstName, email, socials } = mentor;
        return (
          <div key={mentor.id}>
            <a>
              <h3>{firstName}</h3>
              <p>{email}</p>
              <p>{bio}</p>
              {/* <p>{[0].socials[0]}</p> */}
            </a>
          </div>

        );
      })}
    </div>
  );
};

export default allMentors;
