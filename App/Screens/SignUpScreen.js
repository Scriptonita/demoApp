import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Body, Button, Card, CardItem, Container, Input, Item, Form, Label, Text, Toast } from 'native-base';
import { connect } from 'react-redux'
import Screen from '../Components/Screen';
import UserActions from '../Redux/UserRedux';
import { ok, labels, placeholders, status } from '../Utils/constants';

const SignIn = 'SignIn';

const styles = StyleSheet.create({
    footer: {
        alignSelf: 'flex-end'
    }
});

const SignUpScreen = ({ clearMessage, error, message, navigation, signUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (message) {
            Toast.show({
                text: message,
                buttonText: ok,
                duration: 3000,
                type: status.success,
                onClose: () => navigation.navigate(SignIn)
            });

            setUsername('');
            setPassword('');
            setConfirmPassword('');
            clearMessage();
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
            <Container>
                <Card >
                    <CardItem header>
                        <Text>Rellene los siguiente datos de usuario</Text>
                    </CardItem>
                    <CardItem>
                        <Body> 
                            <Form>
                                <Item stackedLabel>
                                    <Label>{labels.username}</Label>
                                    <Input 
                                        placeholder={placeholders.username} 
                                        onChangeText={(text) => setUsername(text)}
                                        value={username}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>{labels.password}</Label>
                                    <Input 
                                        placeholder={placeholders.password}
                                        onChangeText={(text) => setPassword(text)}
                                        secureTextEntry={true}
                                        value={password}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>{labels.confirmPassword}</Label>
                                    <Input 
                                        placeholder={placeholders.confirmPassword} 
                                        onChangeText={(text) => setConfirmPassword(text)}
                                        secureTextEntry={true}
                                        style={(confirmPassword !== password ? {color: 'red'} : {})}
                                        value={confirmPassword}
                                    />
                                </Item>
                            </Form>
                        </Body>
                    </CardItem>
                    <CardItem footer style={styles.footer}>
                        <Button
                            disabled={!(username && password && (password === confirmPassword))}
                            onPress={() => signUp(username, password)}
                        >
                            <Text>Registrar</Text>
                        </Button>
                    </CardItem>
                </Card>
            </Container>
        </Screen>
    )
}

const mapStateToProps = (state) => {
    return {
        error: state.user.error,
        message: state.user.message,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (username, password) => dispatch(UserActions.signUpRequest(username, password)),
        clearMessage: () => dispatch(UserActions.clearMessage())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
