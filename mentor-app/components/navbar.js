import Link from 'next/link'
import { Link as LinkS } from 'react-scroll'
import { useRouter } from 'next/router'
import firebase from '../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import { server } from '../config'
import logo from '../Images/mentoree_home_logo.jpg'
import { Button } from 'react-bootstrap'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react'

const auth = getAuth()

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [user, loading, error] = useAuthState(firebase.auth())
  const [isLogIn, setLogIn] = useState(null) //state check if user is logged in
  const router = useRouter()

  useEffect(async () => {
    if (user !== null) {
      setTimeout(async () => {
        const loginid = user.uid
        const res = await fetch(`${server}/api/mentors/${loginid}`)
        const data = await res.json()
        if (data[0]) {
          setCurrentUser(data[0].role)
        }
      }, 2000)
    }
  }, [user])

  useEffect(async () => {
    if (user !== null) {
      setTimeout(async () => {
        const loginid = user.uid
        const res = await fetch(`${server}/api/mentees/${loginid}`)
        const data = await res.json()
        if (data[0]) {
          setCurrentUser(data[0].role)
        }
      }, 2000)
    }
  }, [user])

  useEffect(() => {
    setLogIn(user)
  }, [user])

  function handleLogout() {
    signOut(auth)
      .then(() => {
        setCurrentUser(null)
        console.log('Logged out')
        router.push('/')
      })
      .catch((error) => {
        console.log('error')
      })
  }

  return (
    <nav className={styles.navbar}>
      <div className='logo'>
        <Link href='/'>
          <Image src={logo}></Image>
        </Link>
      </div>
      <Link href='/'>
        <a>Home</a>
      </Link>
      
      <Link href="/">
      <LinkS
        to='#about'
        smooth={true}
        className='#about'
        // duration={500}
        // offset={150}
      >
        <a>About</a>
      </LinkS>
      </Link>

      <Link href="/">
      <LinkS
        to={'#contact'}
        smooth={true}
        className='#contact'
        // duration={500}
        // offset={2000}
      >
        <a>Contact</a>
      </LinkS>
      </Link>

      <Link href='/allMentors'>
        <a>Find a Mentor</a>
      </Link>

      {currentUser && (
        <Menu>
          <MenuButton as={Button}>Profile</MenuButton>
          <MenuList>
            <MenuItem>
              <Link href={`/edit-profile/${currentUser}`}>
                <a>Edit profile</a>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href={`/dashboard/${currentUser}`}>
                <a>Dashboard</a>
              </Link>
            </MenuItem>
            <MenuDivider />
            <MenuItem variant='outline-success' onClick={handleLogout}>

              <a>Logout</a>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
      {/* {isLogIn && (
        <Button variant="outline-success" onClick={handleLogout}>
          Logout
        </Button>
      )} */}
    </nav>
  )
}
export default Navbar
