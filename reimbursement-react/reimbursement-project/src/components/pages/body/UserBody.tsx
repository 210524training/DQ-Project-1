import React from 'react'
import { ServiceIcon, ServicesCard, UserBodyContainer, UserBodyH1, UserBodyH2, UserBodyWrapper } from './BodyElem'
import Image1 from './images/image1.svg'
import Image2 from './images/image2.svg'

const UserBody = () => {
    return (
        <UserBodyContainer id="services">
            <UserBodyH1>Our Services</UserBodyH1>
            <UserBodyWrapper>
                <ServicesCard>
                    <ServiceIcon src={Image1} />
                    <UserBodyH2>View Reimbursements</UserBodyH2>
                </ServicesCard>
                <ServicesCard>
                    <ServiceIcon src={Image2} />
                    <UserBodyH2>Submit Reimbursement Form</UserBodyH2>
                </ServicesCard>
            </UserBodyWrapper>
        </UserBodyContainer>
    )
}

export default UserBody