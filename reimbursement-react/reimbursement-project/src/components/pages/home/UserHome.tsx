import React, {useState} from 'react';
import Navbar from '../../navbar/Navbar'
import Body from '../body/Body';
import UserBody from '../body/services';
import UserNav from '../../navbar/UserNav';

const UserHome = () => {
    return (
        <>
            <UserNav />
            <Body />
        </>
    )
}

export default UserHome