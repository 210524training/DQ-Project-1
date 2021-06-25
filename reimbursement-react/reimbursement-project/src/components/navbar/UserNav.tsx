import React, { Props } from 'react';
import {FaBars} from 'react-icons/fa'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavBtn, NavBtnLink, NavLinks, } from './NavbarElem';
import { NavLink } from 'react-router-dom';
// type PropsFunction = {
//     toggle: () => void
// }

const UserNav = () => {
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to='/home'>Reimbursements-R-Us</NavLogo>
                    <MobileIcon >
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="/services">Services</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                       <NavBtnLink to="/">Sign out</NavBtnLink> 
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default UserNav;