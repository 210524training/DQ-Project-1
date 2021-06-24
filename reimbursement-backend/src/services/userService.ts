// view reimbursement status
// view messages
import Reimbursement from '../models/reimbursement';
import User from '../models/user';
import userRepository, { UserRepository } from '../repositories/userRepo';

export class UserService {
  private dao: UserRepository;

  constructor() {
    this.dao = userRepository;
  }

  getAll(): Promise<User[]> {
    return this.dao.getAll();
  }

  findByUsername(username: string): Promise<User | null> {
    return this.dao.findByUsername(username);
  }

  attemptRegister(user: User): Promise<boolean> {
    return this.dao.attemptRegister(
      new User(user.username, user.password, user.role),
    );
  }

  deleteUser(user: User): Promise<boolean> {
    return this.dao.deleteUser(user);
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.dao.findByUsername(username);

    if(!user) {
      throw new Error('No username matches');
    }

    if(user.password !== password) {
      throw new Error('Password does not match');
    }

    return user;
  }

  register(user: User): Promise<boolean> {
    return this.attemptRegister(user);
  }

  // async addNotes(username: string): Promise<User | null> {
  //   // get by username and role?
  //   const found = await this.dao.findByRole(username);
  //   // if they exist, send info as object
  //   const note = `${username}: ${note}`;
  //   // assign it to user.message
  //   if(found) {
  //     found.messages = note;
  //     await this.dao.updateMessage(found);
  //     return found;
  //   }
  //   return null;
  // }

  // getNotes(username: string): Promise<Message[]> {
  //   return this.dao.getMessages(username);
  // }

  // get user from reimbursement and add amoun awarded value
  async getUser(reimbursement: Reimbursement): Promise<User | null> {
    const found = await this.dao.findByUsername(reimbursement.username);
    if(found) {
      found.amountAwarded = reimbursement.amountAwarded;
      return found;
    } return null;
  }

  // add award to user table
  addAward(user:User): Promise<boolean> {
    return this.dao.addAward(user);
  }

  async updateAward(reimbursement: Reimbursement): Promise<boolean> {
    const found = await this.getUser(reimbursement);
    if(found) {
      return this.addAward(found);
    } return false;
  }

  // check if user has maxed their benefits
  async awardAvailable(username: string): Promise<boolean> {
    const result = await this.dao.findByUsername(username);

    if(result) {
      const amount = result.amountAwarded;
      if(amount >= 1000) {
        return false;
      } if(result === null) {
        return false;
      }
    } return true;
  }
}

const userService = new UserService();

export default userService;
