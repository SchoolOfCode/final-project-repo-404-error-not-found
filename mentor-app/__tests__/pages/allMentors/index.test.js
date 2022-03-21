import getServerSideProps from "../../../pages/allMentors/index";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        props: {
          mentors: [
            {
              loginid: "12whatever",
              userid: 3,
              firstname: "Bob",
              surname: "Bobbits",
              jobtitle: "The Chief",
              company: "Megacorp",
              email: "bob@bobbits.com",
              biography:
                "Bob first started coding in the original dot.com boom of 1952, and has led the field in Bobness for nearly seven decades now - continually pushing the boundaries of bobness, and taking in multiple shifts in direction.  He has two cats and lives in the Algarve.",
              socials: {
                linkedin: "bob@linkedin",
              },
              location: "Scarborough",
              photourl:
                "https://www.advancy.com/wp-content/uploads/2017/06/portrait-defaut.jpg",
              tagline: "Best Bob in town...",
              skills: ["frontend", "ux-ui", "backend"],
              relationships: {},
              role: "mentor",
            },
          ],
        },
      }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it("Returns some mentors", async () => {
  const mentors = await getServerSideProps();

  expect(mentors).toEqual({
    props: {
      mentors: [
        {
          loginid: "12whatever",
          userid: 3,
          firstname: "Bob",
          surname: "Bobbits",
          jobtitle: "The Chief",
          company: "Megacorp",
          email: "bob@bobbits.com",
          biography:
            "Bob first started coding in the original dot.com boom of 1952, and has led the field in Bobness for nearly seven decades now - continually pushing the boundaries of bobness, and taking in multiple shifts in direction.  He has two cats and lives in the Algarve.",
          socials: {
            linkedin: "bob@linkedin",
          },
          location: "Scarborough",
          photourl:
            "https://www.advancy.com/wp-content/uploads/2017/06/portrait-defaut.jpg",
          tagline: "Best Bob in town...",
          skills: ["frontend", "ux-ui", "backend"],
          relationships: {},
          role: "mentor",
        },
      ],
    },
  });
  expect(fetch).toHaveBeenCalledTimes(1);
});
