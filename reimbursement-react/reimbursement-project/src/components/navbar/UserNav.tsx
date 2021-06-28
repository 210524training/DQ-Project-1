import React from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import {FaBars} from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../../hook'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavBtn, NavLinks, UserNavBtnLink, } from './NavbarElem';
import { logout } from '../../slices/user.slice';
// type PropsFunction = {
//     toggle: () => void
// }




const UserNav = () => {

    const history = useHistory();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    
        history.push('/');
      }

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
                        <NavItem>
                            <NavLinks to="/messages">Messages</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                       <UserNavBtnLink onClick={handleLogout}>Sign out</UserNavBtnLink> 
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default UserNav;