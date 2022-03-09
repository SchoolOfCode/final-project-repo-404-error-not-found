import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { server } from '../../config'
import firebase from '../../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import 'antd/dist/antd.css' // or 'antd/dist/antd.less'

import css from './mentor.module.css'

import TwitterIcon from '../../components/TwitterIcon'
import GithubIcon from '../../components/GithubIcon'
import LinkedinIcon from '../../components/LinkedinIcon'

export default function Profile() {
  //currentMentee is the mentor pulled from our database
  const [currentMentee, setCurrentMentee] = useState(null)
  // user is the user provided by firebase
  const [user, loading, error] = useAuthState(firebase.auth())

  //takes the firebase uid and fetches the corresponding mentor from database, then assigns it to currentMentee
  useEffect(async () => {
    if (user !== null) {
      const loginid = user.uid
      // const loginid = 'hJAvwClURqXX0aiqsKsIlXqNa0R2'

      console.log('about to send GET request!')
      const res = await fetch(`${server}/api/mentees/${loginid}`)
      const data = await res.json()
      setCurrentMentee(data[0])
    }
  }, [user])

  //render page only if currentMentee is loaded, otherwise show loading text
  if (currentMentee !== null) {
    // let socialsKey = Object.keys(currentMentee.socials);

    return (
      <div className={css.profileFullArea}>
        <h1>Your profile</h1>
        <br />
        <div className={css.profileMainArea}>
          <div className={css.profileLeft}>
            <img
              className={css.profileImage}
              src={currentMentee.photourl}
            ></img>
            <div className={css.socialsArea}>
              {Object.keys(currentMentee.socials)[0] === 'linkedin' ? (
                <LinkedinIcon
                  handle={Object.values(currentMentee.socials)[0]}
                />
              ) : null}
              {Object.keys(currentMentee.socials)[0] === 'github' ? (
                <GithubIcon handle={Object.values(currentMentee.socials)[0]} />
              ) : null}
              {Object.keys(currentMentee.socials)[0] === 'twitter' ? (
                <TwitterIcon handle={Object.values(currentMentee.socials)[0]} />
              ) : null}
            </div>
          </div>
          <div className={css.profileRight}>
            <h1>
              {currentMentee.firstname} {currentMentee.surname}
            </h1>
            <h3>{currentMentee.location}</h3>
            <h3>{currentMentee.tagline}</h3>
            <span>
              <h4 className={css.jobtitle}>{currentMentee.jobtitle} </h4>
              at <em>{currentMentee.company}</em>
            </span>
            <div className={css.skills}>
              {currentMentee.skills.length > 0
                ? currentMentee.skills.map((item) => (
                    <div className={css.skill}>{item}</div>
                  ))
                : null}
              {/* <div className={css.skill}>skill</div> */}
            </div>
          </div>
          <div className={css.biographyArea}>
            <h3>Biography</h3>

            <p className={css.bio}>{currentMentee.biography}</p>
          </div>
        </div>

        <div className={css.sideDisplay}>
          <div className={css.rightSquare}>
            <div className={css.topSquare}>
              <p>Description of what is offered</p>
            </div>
            <div className={css.lowSquare}>
              <Link>
                <button>Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  } else return <p>loading data...</p>
}
