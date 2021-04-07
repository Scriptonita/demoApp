import React from 'react';
import { Button, Card, CardItem, Text } from 'native-base';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import UserActions from '../Redux/UserRedux';
import {screens} from '../Utils/constants';

const styles = StyleSheet.create({
    item: {
        flex: 1
    },
    button: {
        alignSelf: 'center',
    }
});

export const Logout = ({logout, navigation}) => {
    const handleLogout = () => {
        logout();
        navigation.navigate(screens.signIn)
    }

    return (
        <Card>
            <CardItem style={styles.item}>
                <Button
                    style={styles.button}
                    onPress={() => handleLogout()}
                >
                    <Text>Salir</Text>
                </Button>
            </CardItem>
        </Card>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(UserActions.logoutRequest())
    }
};

export default connect(null, mapDispatchToProps)(Logout);
