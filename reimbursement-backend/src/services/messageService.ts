import Message from '../models/message';
import messageRepository, { MessageRepository } from '../repositories/messages';

export class MessageService {
    private dao: MessageRepository;

    constructor() {
      this.dao = messageRepository;
    }

    getByRecipient(recipient: string): Promise<Message[]> {
      console.log('inside message service');
      return this.dao.getByRecipient(recipient);
    }

    getBySenderRole(senderRole: string): Promise<Message[]> {
      console.log('inside message service');
      return this.dao.getBySenderRole(senderRole);
    }

    getByRecipientRole(recipientRole: string): Promise<Message[]> {
      console.log('inside message service');
      return this.dao.getByRecipientRole(recipientRole);
    }

    async add(message: Message): Promise<boolean> {
      console.log('inside service');
      // eslint-disable-next-line max-len
      console.log(message.sender, message.recipient, message.senderRole, message.recipientRole, message.note);
      return this.dao.addMessage(message);
    }
}

const messageService = new MessageService();

export default messageService;
