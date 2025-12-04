import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'jdoe@test.com' },
    { id: '2', name: 'Jane Smith', email: 'jsmith@test.com' },
    { id: '3', name: 'Alice Johnson pentes', email: 'ajohnson@test.com' },
    { id: '4', name: 'Alice finner', email: 'afinner@test.com' },
  ];
}
