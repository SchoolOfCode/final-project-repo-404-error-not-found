import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
      <div className='logo'>
        <h1>Mentor App</h1>
      </div>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/about'>
        <a>About</a>
      </Link>
      <Link href='/contact'>
        <a>Contact</a>
      </Link>
      <Link href='/allMentors'>
        <a>Find a Mentor</a>
      </Link>
      <button>Log out</button>
    </nav>
  )
}
export default Navbar
