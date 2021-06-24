import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Reimbursement from '../../../models/reimbursement';
import { useAppDispatch } from '../../../hook';
import { useHistory } from 'react-router-dom';
import { FormOption, FormSelect, Container, Form, FormButton, FormContent, FormH1, FormInput, FormLabel, FormWrap, Icon} from './FormOptionsElem';
import { addReimbursement } from '../../../remote/reimbursement-backend/reimbursement.api';
import { v4 as uuidv4 } from 'uuid'

type Props = {
  reimbursement?: Reimbursement
}

const ReimbursementForm: React.FC<Props> = (props) => {

  const [username, setUsername] = useState<string>('');
  const [fileDate, setFileDate] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [cost, setCost] = useState<number>(0);
  const [format, setFormat] = useState<string>('');


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

  function weekFromNow() {
    let today = Date.parse(fileDate);
    let stringToDate = new Date(fileDate)
    let nextweek = new Date(stringToDate.getFullYear(), stringToDate.getMonth(), stringToDate.getDate() + 7);
    let nextweekParsed = Date.parse(nextweek.toString());
    if ((nextweekParsed - today) >= 604800000) {
      return true
    } else return false;
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
      setCost(Number(e.target.value));
  }


  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (weekFromNow()) {
      //add reimbursement
      const newReimbursement = new Reimbursement(uuidv4(), username, startDate, location, fileDate, type, cost, 'Pending Supervisor', format, 0, 0)
      addReimbursement(newReimbursement);
      alert('reimbursement application submitted');
      history.push('/services')
    } else throw new Error('start date must be at least 7 days from file date');
    return
  }

  return  (
    <>
        <Container>
            <FormWrap>
                <Icon to="/home/:user">Reimbursements-R-Us</Icon>
                <FormContent>
                    <Form onSubmit={handleFormSubmit}>
                        <FormH1>Reimbursement Application</FormH1>
                        <FormLabel htmlFor='username'>Username</FormLabel>
                        <FormInput type='text' required onChange={handleUsernameChange}/>
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
)
}

export default ReimbursementForm;