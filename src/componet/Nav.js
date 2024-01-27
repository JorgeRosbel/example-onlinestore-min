import React from 'react';
import '../style/Nav.css';
import { useState } from 'react';
import imageLogo from '../imagen/logo.svg';
import { GiHamburgerMenu } from "react-icons/gi";


function Link({id,name,href}){
    return(
        <li>
            <a id={id} className='nav-link' href={href} rel='no-follow'>{name}</a>
        </li>
    )
}

function ButtonMenu({handler}){
    
    return(
        <GiHamburgerMenu className='nav-btn' onClick={handler} />
    )
}

function Nav({data,isClosed}){
    return(
        <nav>
            <ul className={isClosed ? 'nav-menu nav-close': 'nav-menu'}>
                {data.map(d => <Link key={d.id} id = {d.id} name = {d.name} href = {d.href} />)}
            </ul>
        </nav>
    )
}

function Logo({image}){
    return(
        <img className='logo' src={image} alt='logo'/>
    )
}


export function Navegation({data}){
    const [mode, setMode] = useState(true);
    const handleMode = () => setMode(!mode);

    return(
        <div className='header-container'>
            <Logo image={imageLogo} />
            <Nav data = {data} isClosed={mode}></Nav>
            <ButtonMenu handler={handleMode} />
        </div>
    )
}
