export default class Message {
  constructor(
        public username: string,
        public role: string,
        public note: string,
        public sender: string,
  ) {}
}
