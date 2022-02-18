export const getStaticProps = async () => {

    const res = await fetch();
    const data = await res.json();

    return{
        props: { mentors: data }
    }

}

const allMentors = ({ mentors }) => {
  return (
    <div>
      <h1>Mentors</h1>
      {mentors.map(mentor => (
          <div key={mentor.id}>
              <a className={}>
                  <h3>{ mentor.name }</h3>
              </a>
          </div>
      ))}
    </div>
  );
};

export default allMentors;
