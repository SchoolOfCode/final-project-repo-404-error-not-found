import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import firebase from '../../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'
import css from './mentor.module.css'
import { server } from '../../config'
import { Button } from 'react-bootstrap'
import TwitterIcon from '../../components/TwitterIcon'
import GithubIcon from '../../components/GithubIcon'
import LinkedinIcon from '../../components/LinkedinIcon'

export async function getServerSideProps(context) {
  return {
    props: {
      currentId: context.query.loginid,
    },
  }
}

export default function Profile(props) {
  const { currentId } = props
  const [currentMentor, setCurrentMentor] = useState(null)
  const [user, loading, error] = useAuthState(firebase.auth())

  async function handleApply() {
    console.log(currentMentor)
    const data = { mentor_id: currentMentor.loginid, mentee_id: user.uid }
    const res = await fetch(`${server}/api/connection`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '',
      },
      body: JSON.stringify(data),
    })
    const response = await res.json()
    console.log(response)
  }

  useEffect(async () => {
    const loginid = await currentId
    console.log('about to send GET request!')
    const res = await fetch(`${server}/api/mentors/${loginid}`)
    const data = await res.json()
    setCurrentMentor(data[0])
  }, [])

  if (currentMentor !== null) {
    return (
      <div className={css.profileFullArea}>
        <h1>Mentor profile</h1>
        <br />
        <div className={css.profileMainArea}>
          <div className={css.profileLeft}>
            <img
              className={css.profileImage}
              src={currentMentor.photourl}
            ></img>
            <div className={css.socialsArea}>
              {Object.keys(currentMentor.socials)[0] === 'linkedin' ? (
                <LinkedinIcon
                  handle={Object.values(currentMentor.socials)[0]}
                />
              ) : null}
              {Object.keys(currentMentor.socials)[0] === 'github' ? (
                <GithubIcon handle={Object.values(currentMentor.socials)[0]} />
              ) : null}
              {Object.keys(currentMentor.socials)[0] === 'twitter' ? (
                <TwitterIcon handle={Object.values(currentMentor.socials)[0]} />
              ) : null}
            </div>
          </div>
          <div className={css.profileRight}>
            <h1>
              {currentMentor.firstname} {currentMentor.surname}
            </h1>
            <h3>{currentMentor.location}</h3>
            <h3>{currentMentor.tagline}</h3>
            <span>
              <h4 className={css.jobtitle}>{currentMentor.jobtitle} </h4>
              at <em>{currentMentor.company}</em>
            </span>
            <div className={css.skills}>
              {currentMentor.skills.length > 0
                ? currentMentor.skills.map((item) => (
                    <div className={css.skill}>{item}</div>
                  ))
                : null}
              {/* <div className={css.skill}>skill</div> */}
            </div>
          </div>
          <div className={css.biographyArea}>
            <h3>Biography</h3>

            <p className={css.bio}>{currentMentor.biography}</p>
          </div>
        </div>

        <div className={css.sideDisplay}>
          <div className={css.rightSquare}>
            <div className={css.topSquare}>
              <p>Description of what is offered</p>
            </div>
            <div className={css.lowSquare}>
              {/* <Link href='/edit-profile/mentor'> */}
              <Button onClick={() => handleApply()}>Apply Now</Button>
              {/* </Link> */}
            </div>
            <Link href='/allMentors'>
              <Button>Back to Main</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  } else return <p>loading data...</p>
}
