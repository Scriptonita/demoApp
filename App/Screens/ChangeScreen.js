import React from 'react';
import Screen from '../Components/Screen';
import { Tab, Tabs } from 'native-base';
import Deposit from '../Components/Deposit';
import DepositsHistory from '../Components/DepositsHistory';
import { depositTypes } from '../Utils/constants';

const ChangeScreen = () => {
    return (
        <Screen>
            <Tabs>
                <Tab heading="Depositar" >
                    <Deposit type={depositTypes.deposit} />
                </Tab>
                <Tab heading="Retirar">
                    <Deposit type={depositTypes.withdraw} />
                </Tab>
                <Tab heading="Histórico">
                    <DepositsHistory />
                </Tab>
            </Tabs>
        </Screen>
    )
}

export default ChangeScreen;
