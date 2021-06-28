import styled from 'styled-components';
import { Link as LinkRouter } from 'react-router-dom'

export const BodyContainer = styled.div`
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 900px;
    position: relative;
    z-index: 1
    `

export const BodyBackground = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const PictureBackground = styled.img`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background: #232a34;
    `;

export const BodyH1 = styled.h1`
    color: #fff;
    font-size: 48px;
    text-align: center;

    @media screen and (max-width: 768px) {
        font-size: 40px;
    }

    @media screen and (max-width: 480px) {
        font-size: 32px;
    }
`

export const BodyP = styled.p`
    margin-top: 24px;
    color: #fff;
    font-size: 24px;
    text-align: center;
    max-width: 600px;

    @media screen and (max-width: 768px) {
        font-size: 24px;
    }

    @media screen and (max-width: 480px) {
        font-size: 18px;
    }
    `

export const BodyContent = styled.div`
        z-index: 3;
        max-width: 1200px;
        position: absolute;
        padding: 8px 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
    `

export const UserBodyContainer = styled.div`
        height: 900px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #010606;

        @media screen and (max-width: 768px) {
            height: 1100px;
        }

        @media screen and (max-width: 480px) {
            height: 1300px;
        }
    `

export const UserBodyWrapper = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    grid-gap: 16px;
    padding: 0 50px;

@media screen and (max-width: 2000px) {
    grid-template-columns: 1fr 1fr;
}

@media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
}
`

export const ServicesCard = styled.div`
    background: #fff;
    display: flex;
    flex-direction: flex-start;
    align-items: center;
    border-radius: 10px;
    max-height: 340px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
    `

export const ServiceIcon = styled.img`
    height: 160px;
    width: 160px;
    margin-bottom: 10px;
`

export const UserBodyH1 = styled.h1`
    font-size: 2.5rem;
    color: #fff;
    margin-bottom: 64px;

    @media screen and (max-width: 480px) {
        font-size: 2rem;
    }
    `

export const UserBodyH2 = styled.h2`
    font-size: 1rem;
    margin-bottom:10px;
    text-decoration: none;
    `

export const ServiceLink = styled(LinkRouter)`
    text-decoration: none;
    height: 100%;
    width: 100%;
`

