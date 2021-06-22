// view reimbursement status
// view messages
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
}

const userService = new UserService();

export default userService;
