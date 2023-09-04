import { User } from '~/types';

const users: User[] = [
    {
        id: 23,
        firstName: 'Bob',
        lastName: 'Greatlance',
        thumbnail: '/images/avatars/avatar-1.jpg',
    },
    {
        id: 48,
        firstName: 'Jack',
        lastName: 'Dowager',
        thumbnail: '/images/avatars/avatar-2.jpg',
    }
];

export default defineEventHandler(async (e): Promise<User[]> => {
    return users;
});
