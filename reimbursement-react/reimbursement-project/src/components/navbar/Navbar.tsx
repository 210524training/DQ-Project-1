import React, { Props } from 'react';
import {FaBars} from 'react-icons/fa'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink, } from './NavbarElem';

// type PropsFunction = {
//     toggle: () => void
// }

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to='/'>Reimbursements-R-Us</NavLogo>
                    <MobileIcon >
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="/login">Services</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="/register">Register</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                       <NavBtnLink to="/login">Log in</NavBtnLink> 
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar;