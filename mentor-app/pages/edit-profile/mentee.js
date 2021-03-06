// import React from 'react'

// export default function mentee() {
//   return <div>mentee</div>
// }

import Link from 'next/link'
import firebase from '../../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

import React, { useEffect } from 'react'
import { useState } from 'react'
import { Checkbox } from 'antd'
import css from './mentor.module.css'
import { server } from '../../config'
import { StylesProvider } from '@chakra-ui/react'
const url = process.env.REACT_APP_BACKEND_URL

function EditMentee() {
  const router = useRouter()
  const [user, loading, error] = useAuthState(firebase.auth())
  const [mentee, setMentee] = useState(null)
  const [skills, setSkills] = useState([]) //
  const [socialMediaType, setSocialMediaType] = useState('') //
  const [socialMediaUserName, setSocialMediaUserName] = useState('') //
  const [socials, setSocials] = useState({}) //

  function handleChange(e) {
    const name = e.target.name
    const value = e.target.value
    setMentee({ ...mentee, [name]: value })
  }
  //update social media object whenever the type or username changes
  useEffect(() => {
    setSocials({ [socialMediaType]: socialMediaUserName })
    setMentee({ ...mentee, socials: socials })
  }, [socialMediaType, socialMediaUserName])

  function updateSkills(e) {
    if (e.target.checked) {
      setSkills([...skills, e.target.id])
      setMentee({ ...mentee, skills: skills })
    } else if (e.target.checked === false) {
      setSkills([...skills.filter((item) => item !== e.target.id)])
    }
  }
  //GET USER DATA
  useEffect(async () => {
    if (user !== null) {
      const loginid = user.uid
      const res = await fetch(`${server}/api/mentees/${loginid}`)
      const data = await res.json()
      setMentee(data[0])
    }
  }, [user])

  //SEND EDIT MENTOR DATA
  const submitForm = async (e) => {
    e.preventDefault()
    const body = mentee
    const loginid = user.uid
    const res = await fetch(`${server}/api/mentees/${loginid}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    router.push('/profile/mentee')
  }
  //RENDER PAGE
  if (mentee === null) {
    return <h2>...Loading</h2>
  } else {
    return (
      <>
        <div className={css.body}>
          <div className={css.UpdateMentorProfileFormContainer}>
            <h1>Setup your mentee profile</h1>
            <h2>Add or edit your information below</h2>
            <div>
              <form
                onSubmit={submitForm}
                className={css.UpdateMentorProfileForm}
              >
                <div className={css.firstname}>
                  <label htmlFor='first-name'>First Name</label>
                  <input
                    id='first-name'
                    type='text'
                    name='firstname'
                    value={mentee.firstname}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className={css.surname}>
                  <label htmlFor='surname'>Surname</label>
                  <input
                    id='surname'
                    type='text'
                    name='surname'
                    value={mentee.surname}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className={css.email}>
                  <label htmlFor='email'>Email</label>
                  <input
                    id='email'
                    type='text'
                    value={mentee.email}
                    name='email'
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className={css.jobtitle}>
                  <label htmlFor='jobtitle'>Job Title</label>
                  <input
                    id='jobtitle'
                    type='text'
                    name='jobtitle'
                    value={mentee.jobtitle}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className={css.company}>
                  <label htmlFor='aims'>Aims</label>
                  <input
                    id='aims'
                    type='text'
                    name='aims'
                    value={mentee.aims}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className={css.location}>
                  <label htmlFor='location'>Location</label>
                  <input
                    id='location'
                    type='text'
                    name='location'
                    value={mentee.location}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className={css.biography}>
                  <label htmlFor='biography'>Biography</label>
                  <textArea
                    id='biography'
                    type='text'
                    name='biography'
                    value={mentee.biography}
                    onChange={(e) => handleChange(e)}
                    required
                    maxlength='500ch'
                  >
                    {mentee.biography}
                  </textArea>
                </div>
                <div className={css.photourl}>
                  <label htmlFor='photourl'>Profile photo URL</label>
                  <input
                    id='photourl'
                    type='text'
                    name='photourl'
                    value={mentee.photourl}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={css.tagline}>
                  <label htmlFor='tagline'>Profile Tagline</label>
                  <input
                    id='tagline'
                    type='text'
                    name='tagline'
                    value={mentee.tagline}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className={css.skills}>
                  <h4>
                    <label htmlFor='skills'>Skills</label>
                  </h4>
                  <div className={css.checkboxes}>
                    <Checkbox id='frontend' onChange={updateSkills}>
                      Frontend
                    </Checkbox>
                    <Checkbox id='fullstack' onChange={updateSkills}>
                      Fullstack
                    </Checkbox>
                    <Checkbox id='backend' onChange={updateSkills}>
                      Backend
                    </Checkbox>
                    <Checkbox id='ux-ui' onChange={updateSkills}>
                      UX/UI
                    </Checkbox>
                  </div>
                </div>
                {/* break into two inputs - social media type, social media name/handle  */}
                <div className={css.socialType}>
                  <label htmlFor='socialmediatype'>Social Media Type</label>
                  <select
                    name='socialMediaType'
                    className={css.dropdown}
                    id='socialmediatype'
                    onChange={(e) => setSocialMediaType(e.target.value)}
                  >
                    <option value=''>--Please choose an option--</option>
                    <option value='github'>GitHub</option>
                    <option value='linkedin'>LinkedIn</option>
                    <option value='twitter'>Twitter</option>
                  </select>
                </div>
                <div className={css.socialName}>
                  <label htmlFor='socialmediausername'>
                    Social Media Handle
                  </label>
                  <input
                    id='socialmediausername'
                    type='text'
                    value={mentee.socialMediaUserName}
                    onChange={(e) => setSocialMediaUserName(e.target.value)}
                    required
                  />
                </div>
                <button className={css.submitButton} onClick={submitForm}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default EditMentee
