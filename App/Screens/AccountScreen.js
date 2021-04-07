import React from 'react';
import { StyleSheet, View } from 'react-native';
import Screen from '../Components/Screen';
import AccountData from '../Components/AccountData';
import Logout from '../Components/Logout';
import TransactionsHistory from '../Components/TransactionsHistory';


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

const AccountScreen = ({navigation}) => {
    return (
        <Screen>
            <View style={styles.row}>
                <AccountData />
                <Logout navigation={navigation} />
            </View>
            <TransactionsHistory />
        </Screen>
    )
}

export default AccountScreen;
