import React from 'react';
import { Body, Card, CardItem, Text } from 'native-base';
import { connect } from 'react-redux';

export const AccountData = ({balance, username}) => {

    return (
        <Card>
            <CardItem header>
                <Text>¡Bienvenido {username}!</Text>
            </CardItem>
            <CardItem>
                <Body>
                    <Text>Tu saldo actual es de: {balance}</Text>
                </Body>
            </CardItem>
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        balance: state.user?.data?.balance,
        username: state.user?.data?.username,
    }
}

export default connect(mapStateToProps, {})(AccountData);
