import Image from 'next/image'
import classes from './main-header.module.css'
import Link from 'next/link'
import imgLogo from '@/assets/logo.png'
import MainHeaderBackground from './main-header-background'
import NavLink from './nav-link'

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
              <NavLink href='/meals'>Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href='/meals/share'>Share a Meal</NavLink>
            </li>
            <li>
              <NavLink href='/community'>Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}
