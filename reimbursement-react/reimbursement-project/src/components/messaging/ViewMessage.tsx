import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hook";
import Message from "../../models/message";
import User from "../../models/user";
import { getMessageByRecipient, getMessageByRecipientRole } from "../../remote/reimbursement-backend/reimbursement.api";
import { selectUser, UserState } from "../../slices/user.slice";
import UserNav from "../navbar/UserNav";
import { StyledLink } from "../pages/view-reimbursements/FinalGradeElem";
import MessageForm from "./MessageForm";

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const MessagesPage = () => {

    const history = useHistory();
    const user = useAppSelector<UserState>(selectUser);

    const [messages, setMessages] = useState<Message[]>([]);


      useEffect(() => {
          if(user) {
            const setData = async (user: User) => {

                let arr: Message[] = await getMessageByRecipient(user.username);
                setMessages(arr);
              }
              setData(user);
          }
      }, [user]);

    

    return (
        
        <> 
        <UserNav />
        <table className = "table table-striped table-bordered">
         <thead>
        <tr>
           <th>To</th>
           <th>From</th>
           <th>Message</th>
           </tr>
          </thead>
          {
           messages.map((item, index) => (
              <tr key={index}>
               <td>{item.recipient}</td>
               <td>{item.sender}</td>
               <td>{item.note}</td>
              </tr>
           ))
          }
        </table>
        </>
        )
}

export default MessagesPage;

