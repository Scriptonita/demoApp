import { v4 as uuidv4 } from 'uuid';

export const userList = [
    {
        id: uuidv4(),
        username: 'test1',
        password: 'test1',
        balance: 10,
        token: null,
    },
    {
        id: uuidv4(),
        username: 'test2',
        password: 'test2',
        balance: 5,  
        token: null,
    },
    {
        id: uuidv4(),
        username: 'test3',
        password: 'test3',
        balance: 15,
        token: null, 
    },
];

export const transactions = [
    {
        id: uuidv4(),
        from: userList[0].id,
        to: userList[1].id,
        quantity: 2
    },
    {
        id: uuidv4(),
        from: userList[0].id,
        to: userList[2].id,
        quantity: 4
    },{
        id: uuidv4(),
        from: userList[2].id,
        to: userList[1].id,
        quantity: 1
    },{
        id: uuidv4(),
        from: userList[1].id,
        to: userList[0].id,
        quantity: 5
    },{
        id: uuidv4(),
        from: userList[1].id,
        to: userList[2].id,
        quantity: 2
    },{
        id: uuidv4(),
        from: userList[2].id,
        to: userList[0].id,
        quantity: 3
    },
];