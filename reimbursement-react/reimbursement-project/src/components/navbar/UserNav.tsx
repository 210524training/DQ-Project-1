import React, { Props } from 'react';
import {FaBars} from 'react-icons/fa'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtn, NavBtnLink, } from './NavbarElem';

// type PropsFunction = {
//     toggle: () => void
// }

const UserNav = () => {
    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to='/user/home'>Reimbursements-R-Us</NavLogo>
                    <MobileIcon >
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="/user/home">Services</NavLinks>
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