import Link from 'next/link'
import { useRouter } from 'next/router'
import firebase from '../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
// import styles from "../styles/hamburgermenu.module.css";
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
import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

import { createBreakpoints } from '@chakra-ui/theme-tools'
import { Show, Hide } from '@chakra-ui/react'

const auth = getAuth()


const NavbarS = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [user, loading, error] = useAuthState(firebase.auth())
  const [isLogIn, setLogIn] = useState(null) //state check if
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

  const breakpoints = createBreakpoints({

    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  })

  return (
    <nav className={styles.navbar}>
      <div className='logo'>
        <Link href='/'>
          <Image src={logo}></Image>
        </Link>
      </div>

      <div className={styles.main}>
        <div className={styles.mains}>

          <Link href='/'>
            <a>Home</a>
          </Link>

          <Link href='/#about'>
            <a>About</a>
          </Link>

          <Link href='/#contact'>
            <a>Contact</a>
          </Link>

          <Link href='/allMentors'>

            <a>Find a Mentor</a>
          </Link>
        </div>
      </div>

      {currentUser && (

        <Show breakpoint='(min-width: 48em)'>
          <Menu display='none'>

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
        </Show>
      )}

      {/* {isLogIn && (
        <Button variant="outline-success" onClick={handleLogout}>
          Logout
        </Button>
      )} */}

      <Hide above='md'>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
          />
          <MenuList
            height='300px'
            width='100px'
            zIndex={2000}
            color='blackAlpha.50'
            // fontSize={20}
          >
            <MenuItem>
              <Link href='/'>
                <a>Home</a>

              </Link>
            </MenuItem>

            <MenuItem>

              <Link href='/#about'>
                <a>About</a>
              </Link>
            </MenuItem>

            <MenuItem>

              <Link href='/#contact'>
                <a>Contact</a>
              </Link>
            </MenuItem>

            <MenuItem>
              <Link href='/allMentors'>

                <a>Find a Mentor</a>
              </Link>
            </MenuItem>

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
          </MenuList>
        </Menu>
      </Hide>
    </nav>
  )
}
export default NavbarS
