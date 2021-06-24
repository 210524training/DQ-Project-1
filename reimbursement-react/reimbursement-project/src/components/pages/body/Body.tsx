import React from 'react'
import { BodyBackground, BodyContainer, BodyContent, BodyH1, BodyP, PictureBackground, } from './BodyElem'

const Body = () => {
    return (
        <BodyContainer id="home">
            <BodyBackground>
                <PictureBackground src="#" />
            </BodyBackground>
            <BodyContent>
                <BodyH1>Get Paid to Train</BodyH1>
                <BodyP>
                    Receive up to $1000 per year in reimbursements for select courses
                </BodyP>
            </BodyContent>
        </BodyContainer>
    )
}

export default Body