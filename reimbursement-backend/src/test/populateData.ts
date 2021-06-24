import dotenv from 'dotenv';
import User from '../models/user';
import userService from '../services/userService';

dotenv.config({});

async function populateTable() {
  await userService.attemptRegister(
    new User(
      'david',
      'pass',
      'Employee',
      '',
      0,
    ),
  );

  await userService.attemptRegister(
    new User(
      'dee',
      'gordon',
      'Supervisor',
      '',
      0,
    ),
  );
}

(async () => {
  try {
    await populateTable();
  } catch(error) {
    console.log('Failed to populate table: ', error);
  }
})();
