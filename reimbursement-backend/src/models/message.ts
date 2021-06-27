export default class Message {
  constructor(
        public recipient: string,
        public recipientRole: string,
        public note: string,
        public sender: string,
        public senderRole: string,
  ) {}
}
