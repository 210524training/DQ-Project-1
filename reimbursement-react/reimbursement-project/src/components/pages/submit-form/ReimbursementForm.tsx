import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Reimbursement from '../../../models/reimbursement';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { useHistory } from 'react-router-dom';
import { FormOption, FormSelect, Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon} from './FormOptionsElem';
import { addReimbursement } from '../../../remote/reimbursement-backend/reimbursement.api';
import { v4 as uuidv4 } from 'uuid'
import { selectUser, UserState } from '../../../slices/user.slice';
import Home from '../home/Home';

type Props = {
  reimbursement?: Reimbursement
}

const ReimbursementForm = () => {

  const user = useAppSelector<UserState>(selectUser);
  const [username, setUsername] = useState<string>('');
  const [fileDate, setFileDate] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [cost, setCost] = useState<string>('0');
  const [format, setFormat] = useState<string>('');
  const [color, setColor] = useState<string>('');

  const dispatch = useAppDispatch();
  const history = useHistory();

  function weekFromNow() {
    console.log(fileDate)
    let today = Date.parse(fileDate);
    let stringToDate = new Date(fileDate);
    let nextweek = new Date(stringToDate.getFullYear(), stringToDate.getMonth(), stringToDate.getDate() + 7);
    let nextweekParsed = Date.parse(nextweek.toString());
    const start = Date.parse(startDate)
    const weekdifference = nextweekParsed - today;
    const difference = start - today;
    if (difference >= weekdifference) {
      console.log('it is at least a week from now')
      return true
  } else {console.log('not a week from today');
     return false;
  }
}

function markUrgent() {
  let today = Date.parse(fileDate);
  let stringToDate = new Date(fileDate)
  let twoWeeksFromNow = new Date(stringToDate.getFullYear(), stringToDate.getMonth(), stringToDate.getDate() + 14);
  let twoWeeksParsed = Date.parse(twoWeeksFromNow.toString());
  if ((twoWeeksParsed - today) >= 1209600000) {
    console.log()
    return false
  } else return true;
}

const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
  setUsername(e.target.value);
}

const handleFileDateChange = (e: ChangeEvent<HTMLInputElement>) => {
  setFileDate(e.target.value);
}

const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
  setStartDate(e.target.value);
}

const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
  setLocation(e.target.value);
}

const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
  const eventType: string = e.target.value;
  setType(eventType);
}

const handleFormatChange = (e: ChangeEvent<HTMLSelectElement>) => {
  const gradeFormat: string = e.target.value;
  setFormat(gradeFormat);
}

const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCost((e.target.value));
}

  
  if(user) {const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (weekFromNow()) {
      //award available
      const amount = user.amountAwarded;
      console.log(amount)
      if(amount >= 1000) {
        alert('you have reached your max benefit amount');
        history.push('/');
      } else {
        const newReimbursement = new Reimbursement(uuidv4(), user.username, startDate, location, fileDate, type, cost, 'Pending Supervisor', format, 0, 0);
        console.log(newReimbursement);
        addReimbursement(newReimbursement);
        alert('reimbursement application submitted');
      }
      
      
      history.push('/services')
    } else alert('start date must be at least 7 days from file date')
    return
  }

  return  (
    <>
        <Container>
            <FormWrap>
                <Icon to="/home">Reimbursements-R-Us</Icon>
                <FormContent>
                    <Form onSubmit={handleFormSubmit}>
                        <FormH1>Reimbursement Application</FormH1>
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        {(user)? (<FormInput type='text' name={user.username} value={user.username} readOnly/>) : (<FormInput type="text" required />)}
                        <FormLabel htmlFor='location'>Location</FormLabel>
                        <FormInput type='text' required onChange={handleLocationChange}/>
                        <FormLabel htmlFor='amount'>Amount</FormLabel>
                        <FormInput type='text' required onChange={handleCostChange}/>
                        <FormLabel htmlFor='start date'>Start Date</FormLabel>
                        <FormInput type='date' required onChange={handleStartDateChange}/>
                        <FormLabel htmlFor='todays date'>Today's Date</FormLabel>
                        <FormInput type='date' required onChange={handleFileDateChange}/>
                        <FormLabel htmlFor='event type'>Event Type</FormLabel>
                        <FormSelect onChange={handleTypeChange}>
                          <FormOption value="University Course">University Course</FormOption>
                          <FormOption value="Seminar">Seminar</FormOption>
                          <FormOption value="Certification Preparation Class">Certification Preparation Class</FormOption>
                          <FormOption value="Certification">Certification</FormOption>
                          <FormOption value="Technical Training">Technical Training</FormOption>
                        </FormSelect>
                        <FormLabel htmlFor='grade format'>Grade Format</FormLabel>
                        <FormSelect onChange={handleFormatChange}>
                          <FormOption value="Letter Grade">Letter Grade</FormOption>
                          <FormOption value="Presentation">Presentation</FormOption>
                        </FormSelect>
                        <FormButton type='submit'>Submit</FormButton>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    </>
)} else return (
  <Home />
)
}

export default ReimbursementForm;