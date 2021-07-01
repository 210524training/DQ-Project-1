import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Reimbursement from '../../../models/reimbursement';
import { useAppDispatch, useAppSelector } from '../../../hook';
import { useHistory } from 'react-router-dom';
import { FormOption, FormSelect, Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon} from './FormOptionsElem';
import { addReimbursement } from '../../../remote/reimbursement-backend/reimbursement.api';
import { v4 as uuidv4 } from 'uuid'
import { selectUser, UserState } from '../../../slices/user.slice';
import Home from '../home/Home';
import UserNav from '../../navbar/UserNav';

type Props = {
  reimbursement?: Reimbursement
}

const ReimbursementForm = () => {

  const user = useAppSelector<UserState>(selectUser);
  const [username, setUsername] = useState<string>('');
  const [file, setFile] = useState<string>('');
  const [start, setStart] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [cost, setCost] = useState<string>('0');
  const [format, setFormat] = useState<string>('');
  const [urgent, setUrgent] = useState<boolean>(false);
  const [projection, setProjection] = useState<number>(0);
  const [note, setNote] = useState<string>('');
  const dispatch = useAppDispatch();
  const history = useHistory();

  function weekFromNow() {
    console.log(file)
    let today = Date.parse(file);
    let stringToDate = new Date(file);
    let nextweek = new Date(stringToDate.getFullYear(), stringToDate.getMonth(), stringToDate.getDate() + 7);
    let nextweekParsed = Date.parse(nextweek.toString());
    const startDate = Date.parse(start)
    const weekdifference = nextweekParsed - today;
    const difference = startDate - today;
    if (difference >= weekdifference) {
      console.log('it is at least a week from now')
      return true
  } else {console.log('not a week from today');
     return false;
  }
}

const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
  setUsername(e.target.value);
}

const handleFileDateChange = (e: ChangeEvent<HTMLInputElement>) => {
  setFile(e.target.value);
}

const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
  setStart(e.target.value);
}

const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
  setLocation(e.target.value);
}

const handleNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
  const str: string = e.target.value
  setNote(str);
  console.log(note);
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

function percentage(num: number, per: number) {
  return (num / 100) * per;
}

function capProjection(num: number) {
  let cap;
 (num > 1000) ? cap = 1000 : cap = num;
return cap
}

function markUrgent(fileDate: string, startDate: string) {
  let today = Date.parse(fileDate);
  let stringToDate = new Date(fileDate)
  let twoWeeksFromNow = new Date(stringToDate.getFullYear(), stringToDate.getMonth(), stringToDate.getDate() + 14);
  let twoWeeksParsed = Date.parse(twoWeeksFromNow.toString());
  const start = Date.parse(startDate)
  const twoWeeksDifference = twoWeeksParsed - today
  const difference = start - today;
  if(difference >= twoWeeksDifference) {
    console.log('it is at least two weeks till the deadline for acceptance')
    setUrgent(false);
  } else {
    setUrgent(true);
  }
}

 useEffect(() => {
  function projectedAmount(cost: string, type: string) {
    let result: number;
    let cappedResult: number;
    switch (type) {
    case 'University Course':
      result = percentage(Number(cost), 80);
      cappedResult = capProjection(result);
      setProjection(cappedResult);
      break;
    case 'Seminar':
      result = percentage(Number(cost), 60);
      cappedResult = capProjection(result);
      setProjection(cappedResult);
      break;
    case 'Certification Preparation Class':
      result = percentage(Number(cost), 75);
      cappedResult = capProjection(result);
      setProjection(cappedResult);
      break;
    case 'Certification':
      result = percentage(Number(cost), 80);
      cappedResult = capProjection(result);
      setProjection(cappedResult);
      break;
    case 'Technical Training':
      result = percentage(Number(cost), 90);
      cappedResult = capProjection(result);
      setProjection(cappedResult);
      break;
    case 'Other':
      result = percentage(Number(cost), 30);
      cappedResult = capProjection(result);
      setProjection(cappedResult);
      break;
    }
   }
   projectedAmount(cost, type);
 }, [cost, type]);







  
  if(user) {const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    markUrgent(file, start);
    
    if (weekFromNow()) {
      //award available
      const amount = user.awarded;
      console.log(amount)
      if(amount >= 1000) {
        alert('you have reached your max benefit amount');
        history.push('/');
      } else {
        const newReimbursement = new Reimbursement(uuidv4(), user.username, start, location, file, type, cost, 'Pending Supervisor', format, projection, 0, note, urgent);
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
      <UserNav />
        <Container>
            <FormWrap>
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
                        <FormLabel htmlFor='projected reimbursement'>Additional Info:</FormLabel>
                        <FormInput type='text' onChange={handleNoteChange}/>
                        <FormLabel htmlFor='projected reimbursement'>Projected Reimbursement</FormLabel>
                        <FormInput type='text' value={projection} readOnly/>
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