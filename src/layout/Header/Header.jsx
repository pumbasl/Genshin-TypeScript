import React from 'react';
import { NavLink } from 'react-router-dom';

import { Navbar, Nav } from "react-bootstrap";

//Components
import Subfields from './SubFields';
import { LanguageButton, Profile, Server } from '../../components';
//

//Style
import { Header as HeaderStyle } from '../../style/style';
//

export default function Header(){
    return(
        <HeaderStyle>
            <Navbar collapseOnSelect expand="xl" variant="dark" className="navbar-custom">
            <NavLink to="/" className="navbar-brand ms-3">Genshin Promo</NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                    <Subfields />

                    <Nav className="ml-auto">
                        <Profile className="dropDown-custom ms-1" />
                        <Server className="dropDown-custom ms-1" />
                        <LanguageButton drop="start" className="ms-1" />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </HeaderStyle>
    );
}