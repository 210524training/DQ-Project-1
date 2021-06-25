import React, {useState} from 'react';
import Navbar from '../../navbar/Navbar'
import Body from '../body/Body';
import { selectUser, UserState } from '../../../slices/user.slice';
import { useAppSelector } from '../../../hook';
import UserNav from '../../navbar/UserNav';


const Home = () => {
    const user = useAppSelector<UserState>(selectUser);
        return (
            <> 
                <Navbar />
                <Body />
            </>
    )
}

export default Home