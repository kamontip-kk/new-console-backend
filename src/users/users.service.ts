import { Injectable } from '@nestjs/common';
import { type } from 'os';

export type User = {
    id: number;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            username: 'test1',
            password: 'test1',
        },
        {
            id: 2,
            username: 'test2',
            password: 'test2',
        },
    ]

    async findOne(username: string): Promise<User | undefined>{
        return this.users.find(user => user.username === username);
    }
}
