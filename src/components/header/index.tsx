import logo from '../../assets/Logo.png'

import './header.css'

export default function Header() {
    return (
    <>
        <header>
            <nav>
                <img src={logo}/>
                <ul className="nav-items">
                    <li>Contact</li>
                    <li>About</li>
                    <li>Home</li>
                </ul>
            </nav>
        </header>
    </>
    )

}