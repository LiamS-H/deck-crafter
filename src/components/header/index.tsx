import { Link } from 'react-router-dom'
import logo from '../../assets/Logo.png'

import './header.css'

import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import LoginButton from './login-button'

export default function Header() {
    return (
    <>
        <header>
            <nav>
                <Link to={'/home'}><img src={logo}/></Link>
                <ul className="nav-items">
                    <li><Link to={'decks'}>Decks</Link></li>
                    <SignedOut><li><LoginButton /></li></SignedOut>
                    <SignedIn><li><UserButton /></li></SignedIn>
                </ul>
            </nav>
        </header>
    </>
    )

}