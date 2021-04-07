import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Body, Button, Card, CardItem, Container, Input, Item, Form, Label, Text, Toast } from 'native-base';
import { connect } from 'react-redux'
import Screen from '../Components/Screen';
import UserActions from '../Redux/UserRedux';
import { ok, labels, placeholders, screens, status } from '../Utils/constants';

const styles = StyleSheet.create({
    form: {
        width: '100%'
    },
    input: {
        padding: 0,
        paddingLeft: 5,
        textDecorationLine: 'none' 
    },
    singUp: {
        flexDirection: 'row',
    },
    signUpButton: {
        color: 'blue'
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

const SignInScreen = ({ clearMessage, error, message, navigation, signIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (message) {
            Toast.show({
                text: message,
                buttonText: ok,
                duration: 3000,
                type: status.success,
                onClose: () => navigation.navigate(screens.appTabNavigator)
            });

            setUsername('');
            setPassword('');
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
                        <Text>Bienvenido, por favor inicie sesión</Text>
                    </CardItem>
                    <CardItem>
                        <Body> 
                            <Form  style={styles.form}>
                                <Item stackedLabel>
                                    <Label>{labels.username}</Label>
                                    <Input 
                                        placeholder={placeholders.username} 
                                        onChangeText={(text) => setUsername(text)}
                                        value={username}
                                        testID='signInUsernameInput'
                                        style={styles.input}
                                    />
                                </Item>
                                <Item stackedLabel>
                                    <Label>{labels.password}</Label>
                                    <Input 
                                        placeholder={placeholders.password}
                                        onChangeText={(text) => setPassword(text)}
                                        secureTextEntry={true}
                                        value={password}
                                        testID='signInPasswordInput'
                                        style={styles.input}
                                    />
                                </Item>
                            </Form>
                        </Body>
                    </CardItem>
                    <CardItem footer style={styles.footer}>
                        <View style={styles.singUp}>
                            <Text style={{lineHeight: null}}>¿No tienes cuenta?  </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(screens.signUp)}
                                testID='signInGoToSignUpButton'
                            >
                                <Text style={styles.signUpButton}>Registrate</Text>
                            </TouchableOpacity>
                        </View>                     
                        <Button
                            disabled={!(username && password)}
                            onPress={() => signIn(username, password)}
                            style={styles.button}
                            testID='signInSignInButton'
                        >
                            <Text>Iniciar Sesión</Text>
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
        signIn: (username, password) => dispatch(UserActions.signInRequest(username, password)),
        clearMessage: () => dispatch(UserActions.clearMessage())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);

