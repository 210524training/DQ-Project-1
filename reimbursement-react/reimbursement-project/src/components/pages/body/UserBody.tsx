import React from 'react'
import { ServiceIcon, ServiceLink, ServicesCard, UserBodyContainer, UserBodyH1, UserBodyH2, UserBodyWrapper } from './BodyElem'
import Image1 from './images/image1.svg'
import Image2 from './images/image2.svg'

const UserBody = () => {
    return (
        <UserBodyContainer>
            <UserBodyH1>Our Services</UserBodyH1>
            <UserBodyWrapper>
            <ServiceLink to="/reimbursements">
                <ServicesCard>
                    <ServiceIcon src={Image1} />
                    <UserBodyH2>View Reimbursements</UserBodyH2>
                </ServicesCard>
                </ServiceLink>
                <ServiceLink to="/form">
                <ServicesCard>
                    <ServiceIcon src={Image2} />
                    <UserBodyH2>Submit Reimbursement Form</UserBodyH2>
                </ServicesCard>
                </ServiceLink>
            </UserBodyWrapper>
        </UserBodyContainer>
    )
}

export default UserBody