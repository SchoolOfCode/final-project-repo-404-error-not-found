export const getStaticProps = async () => {

    const res = await fetch('http://localhost:3000/api/mentors');
    const data = await res.json();

    return{
        props: { mentors: data }
    }

}

const allMentors = ({ mentors }) => {
  return (
    <div>
      <h1>Mentors</h1>
      {mentors.map(mentors => (
          <div key={mentors.id}>
              <a >
                  <h3>{ mentors.firstName }</h3>
              </a>
          </div>
      ))}
    </div>
  );
};

export default allMentors;
