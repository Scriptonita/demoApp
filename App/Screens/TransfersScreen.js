import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';
import { Body, Button, Card, CardItem, Form, Input, Item, Label, Text, Toast} from 'native-base';
import { connect } from 'react-redux';
import Screen from '../Components/Screen';
import { labels, placeholders } from '../Utils/constants';
import * as R from 'ramda';
import TransactionsActions from '../Redux/TransactionsRedux';
import { ok, status } from '../Utils/constants';

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    button: {
        alignSelf: 'flex-end',
    }
});

const TransfersScreen = ({balance, clearMessage, error, getTransactions, makeTransaction, message, userId, username}) => {
    const [toUser, setToUser] = useState();
    const [quantity, setQuantity] = useState();

    console.log("TYPE: ", typeof quantity)

    useEffect(() => {
        if (message) {
            Toast.show({
                text: message,
                buttonText: ok,
                duration: 3000,
                type: status.success,
            });

            setToUser();
            setQuantity();
            getTransactions(userId);
        }
    }, [message]);

    useEffect(() => {
        if (error) {
            Toast.show({
                text: error,
                buttonText: ok,
                duration: 3000,
                type: 'danger',
            });
            clearMessage()
        }
    }, [error])

    return (
        <Screen>
            <Card>
                <CardItem header>
                    <Text>Haga una transferencia</Text>
                </CardItem>
                <CardItem>
                    <Body>
                        <Form>
                            <Item stackedLabel>
                                <Label>{labels.username}</Label>
                                <Input 
                                    placeholder={placeholders.usertToTransfer} 
                                    onChangeText={(text) => setToUser(text)}
                                    value={toUser}
                                    style={toUser && username && R.toLower(toUser) === R.toLower(username) && {color: 'red'}}
                                />
                            </Item>
                            <Item stackedLabel>
                                <Label>{labels.quantity} (Máx {balance?.toString()})</Label>
                                <Input 
                                    placeholder={placeholders.quantity}
                                    onChangeText={(text) => setQuantity(text)}
                                    value={quantity}
                                    style={quantity && parseFloat(quantity) > parseFloat(balance) && typeof quantity === 'string' && {color: 'red'}}
                                />
                            </Item>
                        </Form>
                    </Body>
                </CardItem>
                <CardItem footer style={styles.footer}>
                    <Button
                        disabled={!toUser || R.toLower(toUser || '') === R.toLower(username || '') || quantity > balance}
                        onPress={() => makeTransaction(userId, toUser, quantity)}
                        style={styles.button}
                    >
                        <Text>Transferir</Text>
                    </Button>
                </CardItem>
            </Card>
        </Screen>
    )
}

const mapStateToProps = (state) => {
    return {
        balance: state.user?.data?.balance,
        username: state.user?.data?.username,
        userId: state.user?.data?.id,
        message: state.transactions.message,
        error: state.transactions.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        makeTransaction: (userId, toUser, quantity) => dispatch(TransactionsActions.makeTransactionRequest(userId, toUser, quantity)),
        clearMessage: () => dispatch(TransactionsActions.clearMessage()),
        getTransactions: (userId) => dispatch(TransactionsActions.getTransactionsRequest(userId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransfersScreen);
