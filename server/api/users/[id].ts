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
        fistName: 'Jack',
        lastName: 'Dowager',
        thumbnail: '/images/avatars/avatar-2.jpg',
    }
];

export default defineEventHandler(async (e): User | undefined => {
    // Grab the parameter from the route
    const { id } = e.context.params;
    return users.find(user => user.id.toString() === id.toString());
});
