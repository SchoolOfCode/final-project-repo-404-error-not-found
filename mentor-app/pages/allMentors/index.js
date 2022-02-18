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
        const { bio } = mentor;
        return (
          <div key={mentor.id}>
            <a>
              <h3>{mentor.firstName}</h3>
              {/* <p>{bio.firstParagraph}</p> */}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default allMentors;
