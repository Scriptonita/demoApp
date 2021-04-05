import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Body, Button, Card, CardItem, Form, Input, Item, Label, Text, Toast} from 'native-base';
import { connect } from 'react-redux';
import { labels, placeholders } from '../Utils/constants';
import { depositTypes, ok, status } from '../Utils/constants';
import DepositsActions from '../Redux/DepositsRedux';

const styles = StyleSheet.create({
    card: {
        marginTop: 20,
    },
    form: {
        width: '100%',
        marginTop: 20
    },
    footer: {
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    button: {
        alignSelf: 'flex-end',
        marginTop: 15
    }
});

const Deposit = ({balance, clearMessage, error, makeDeposit, message, type, userId}) => {
    const [quantity, setQuantity] = useState();

    useEffect(() => {
        if (message) {
            Toast.show({
                text: message,
                buttonText: ok,
                duration: 3000,
                type: status.success,
            });

            setQuantity();
            clearMessage()
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

    const checkValidQuantity = () => {
        if (!quantity) {
            return false;
        }
        if (isNaN(quantity)) {
            return false;
        }
        if (quantity > balance) {
            return false;
        }

        return true;
    }

    return (
        <Card style={styles.card}>
            <CardItem header>
                <Text>Haga un { type === depositTypes.deposit ? "depósito" : "retiro" }</Text>
            </CardItem>
            <CardItem>
                <Body>
                    <Text>Actualmente dispone de {balance}</Text>
                    <Form style={styles.form}>
                        <Item stackedLabel>
                            <Label>{labels.quantity}</Label>
                            <Input 
                                placeholder={placeholders.desiredQuantity} 
                                onChangeText={(text) => setQuantity(text)}
                                value={quantity}
                                style={checkValidQuantity() ? { color: 'black' } : { color: 'red' }}
                                />
                        </Item>
                    </Form>
                </Body>
            </CardItem>
            <CardItem footer style={styles.footer}>
                <Button
                    disabled={!checkValidQuantity()}
                    onPress={() => makeDeposit(userId, quantity, type)}
                    style={styles.button}
                >
                    <Text>{ type === depositTypes.deposit ? "Depositar" : "Retirar" }</Text>
                </Button>
            </CardItem>
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        balance: state.user?.data?.balance,
        username: state.user?.data?.username,
        userId: state.user?.data?.id,
        message: state.deposits?.message,
        error: state.deposits?.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        makeDeposit: (userId, quantity, type) => dispatch(DepositsActions.makeDepositRequest(userId, quantity, type)),
        clearMessage: () => dispatch(DepositsActions.clearMessage()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
