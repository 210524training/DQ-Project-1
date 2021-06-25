import React, {useState} from 'react';
import Sidebar from '../../navbar/Sidebar'
import Navbar from '../../navbar/Navbar'
import Body from '../body/Body';
import { selectUser, UserState } from '../../../slices/user.slice';
import { useAppSelector } from '../../../hook';
import UserNav from '../../navbar/UserNav';


const Home = () => {
    const user = useAppSelector<UserState>(selectUser);
    if(!user) {
        return (
            <> 
                <Navbar />
                <Body />
            </>
        )
    }
    return (
        <>
            <UserNav />
            <Body />
        </>
    )
}

export default Home