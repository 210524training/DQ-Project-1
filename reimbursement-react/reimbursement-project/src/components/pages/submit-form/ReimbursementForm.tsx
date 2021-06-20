import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Reimbursement, { Status , GradeFormat, EventType, } from '../../../models/reimbursement';
import User from '../../../models/user';
import { useAppDispatch } from '../../../hook';
import { useHistory } from 'react-router-dom';
import { FormOption, FormSelect } from './FormOptionsElem';
import { Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon } from '../register/RegisterElem';

type Props = {
  requestor?: User,
  reimbursement?: Reimbursement
}


function prettyDate(date: Date): string {
  return (date.getMonth() + 1) + '/' + (date.getDate() + 1) + '/' + date.getFullYear();
}

const ReimbursementForm: React.FC<Props> = (props) => {

  // const gradeTypeKeys = Object.keys(GradeFormat);
  // const gradeTypeValues: string[] = Object.values(GradeTypeEnum);
  // const gradeTypeArray: {value: string, text: string}[] = [];
  // for (let i = 0; i < gradeTypeKeys.length; i += 1) {
  //   const value = gradeTypeKeys[i];
  //   const text = gradeTypeValues[i];
  //   gradeTypeArray.push({value, text});
  // }

  // const eventTypeKeys = Object.keys(EventTypeEnum);
  // const eventTypeValues: string[] = Object.values(EventTypeEnum);
  // const eventTypeArray: {value: string, text: string}[] = [];
  // for (let i = 0; i < eventTypeKeys.length; i += 1) {
  //   const value = eventTypeKeys[i];
  //   const text = eventTypeValues[i];
  //   eventTypeArray.push({value, text});
  // }

  const [username, setUsername] = useState<string>('');
  const [fileDate, setFileDate] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [type, setType] = useState<EventType>();
  const [amount, setAmount] = useState<number>();
  const [status, setStatus] = useState<Status>();
  const [format, setFormat] = useState<GradeFormat>();
  const [id, setId] = useState<number>();

  const dispatch = useAppDispatch();
  const history = useHistory();


  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }

  const handleFileDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileDate(e.target.value);
    console.log(new Date(e.target.value));
  }

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    console.log(new Date(e.target.value));
  }
  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  }

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const eventType: EventType = e.target.value as EventType;
    setType(eventType);
  }

  const handleFormatChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const gradeFormat: GradeFormat = e.target.value as GradeFormat;
    setFormat(gradeFormat);
  }

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!Number.isNaN(e.target.value)) {
      setAmount(Number(e.target.value));
    }
  }


  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();



    // const pendingReviewer = 'my-boss';
    
    // const claimID = new Date().getTime();
    // addClaim( {
    //   claimID,
    //   requestor,
    //   pendingReviewer,
    //   requestDate,
    //   eventDate,
    //   eventName,
    //   location,
    //   eventType,
    //   gradingFormat,
    //   description,
    //   cost,
    // })
  }

  return  (
    <>
        <Container>
            <FormWrap>
                <Icon to="/">Reimbursements-R-Us</Icon>
                <FormContent>
                    <Form onSubmit={handleFormSubmit}>
                        <FormH1>Reimbursement Application</FormH1>
                        <FormLabel htmlFor='for'>Username</FormLabel>
                        <FormInput type='text' required onChange={handleUsernameChange}/>
                        <FormLabel htmlFor='for'>Location</FormLabel>
                        <FormInput type='text' required onChange={handleLocationChange}/>
                        <FormLabel htmlFor='for'>Amount</FormLabel>
                        <FormInput type='text' required onChange={handleAmountChange}/>
                        <FormLabel htmlFor='for'>Start Date</FormLabel>
                        <FormInput type='date' required onChange={handleStartDateChange}/>
                        <FormLabel htmlFor='for'>Today's Date</FormLabel>
                        <FormInput type='date' required onChange={handleFileDateChange}/>
                        <FormLabel htmlFor='for'>Event Type</FormLabel>
                        <FormSelect onChange={handleTypeChange}>
                          <FormOption value="University Course">University Course</FormOption>
                          <FormOption value="Seminar">Seminar</FormOption>
                          <FormOption value="Certification Preparation Class">Certification Preparation Class</FormOption>
                          <FormOption value="Certification">Certification</FormOption>
                          <FormOption value="Technical Training">Technical Training</FormOption>
                        </FormSelect>
                        <FormLabel htmlFor='for'>Grade Format</FormLabel>
                        <FormSelect onChange={handleFormatChange}>
                          <FormOption value="Letter Grade">Letter Grade</FormOption>
                          <FormOption value="Presentation">Presentation</FormOption>
                        </FormSelect>
                        <FormButton type='submit'>Register</FormButton>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    </>
)
}

export default ReimbursementForm;