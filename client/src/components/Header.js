import React from 'react'
import {Link} from 'react-router-dom'

const Header = () =>(
    <nav>
        <div className="nav-wrapper blue accent-2">
            <Link to={'/'} className = "brand-logo blue accent-2"> E-Shopping </Link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><Link to={'/shop'}>Shop</Link></li>
                <li><Link to={'/about'}>About us</Link></li>
            </ul>
        </div>
    </nav>
    )

export default Header