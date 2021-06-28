import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../hook";
import Message from "../../models/message";
import User from "../../models/user";
import { getMessageByRecipientRole } from "../../remote/reimbursement-backend/reimbursement.api";
import { selectUser, UserState } from "../../slices/user.slice";
import UserNav from "../navbar/UserNav";

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

const MessagesPage = () => {

    const history = useHistory();
    const user = useAppSelector<UserState>(selectUser);

    const [messages, setMessages] = useState<Message[]>([]);


      useEffect(() => {
          if(user) {
            const setData = async (user: User) => {

                let arr: Message[]
                switch(user.role) {
                    case 'Supervisor':
                        arr = await getMessageByRecipientRole('Supervisor');
                        setMessages(arr);
                        break;
                    case 'Department Head':
                        arr = await getMessageByRecipientRole('Supervisor');
                        setMessages(arr);
                        break;
                    case 'Benco':
                        arr = await getMessageByRecipientRole('Supervisor');
                        setMessages(arr);
                        break;
                    case 'Employee':
                        arr = await getMessageByRecipientRole('Supervisor');
                        setMessages(arr);
                        break;
                }
              }
              setData(user)
          }
      }, [user]);

    

    return (
        
        <> 
        <UserNav />
        <table>
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
        {/* add file upload button */}
        {/* add link to message form */}
        </>
        )
}

export default MessagesPage;

