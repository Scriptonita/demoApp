import React from 'react';
import Screen from '../Components/Screen';
import AccountData from '../Components/AccountData';
import TransactionsHistory from '../Components/TransactionsHistory';

const AccountScreen = () => {
    return (
        <Screen>
            <AccountData />
            <TransactionsHistory />
        </Screen>
    )
}

export default AccountScreen;
