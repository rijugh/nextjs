import Image from 'next/image'
import classes from './main-header.module.css'
import Link from 'next/link'
import imgLogo from '@/assets/logo.png'
import MainHeaderBackground from './main-header-background'

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link href='/' className={classes.logo}>
          <Image className={classes.logoIcon} src={imgLogo} alt='Logo icon' />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <Link href='/meals'>Browse Meals</Link>
            </li>
            <li>
              <Link href='/community'>Foodies Community</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
