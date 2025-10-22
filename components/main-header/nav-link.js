'use client'

import Link from 'next/link'
import classes from './nav-link.module.css'
import { usePathname } from 'next/navigation'

export default function NavLink({ href, children }) {
  const path = usePathname()

  // Smart matching logic:
  // - Exact match for the current page
  // - For /meals, also match /meals/[slug] but NOT /meals/share
  const isActive =
    path === href ||
    (href === '/meals' &&
      path.startsWith('/meals/') &&
      !path.startsWith('/meals/share'))

  return (
    <Link
      href={href}
      className={isActive ? `${classes.link} ${classes.active}` : classes.link}
    >
      {children}
    </Link>
  )
}
