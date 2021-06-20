import React, {useState} from 'react';
import Sidebar from '../../navbar/Sidebar'
import Navbar from '../../navbar/Navbar'
import Body from '../body/Body';
import UserBody from '../body/UserBody';
import UserNav from '../../navbar/UserNav';

const UserHome = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            <UserNav />
            <UserBody />
        </>
    )
}

export default UserHome