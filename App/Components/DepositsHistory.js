import React, { useEffect } from 'react';
import { Card, CardItem, Item, Text } from 'native-base';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View } from 'react-native';
import DepositsActions from '../Redux/DepositsRedux';
import { depositTypes } from '../Utils/constants';

const styles = StyleSheet.create({
    card: {
        flex: 1,
        marginTop: 20,
    },
    header: {
        paddingBottom: 5,
        marginBottom: 0,
    },
    movement: {
        paddingVertical: 20,
    },
});

const AccountData = ({balance, getDeposits, userId, deposits}) => {
    useEffect(() => {
        if (userId) {
            getDeposits(userId)
        }
    }, [balance])

    const renderItem = (item) => (
        <Item style={styles.movement}>
            <View>
                <Text>Tipo: {item.type === depositTypes.deposit ? 'Depósito' : 'Retiro'}</Text>
                <Text>Cantidad: {item.quantity}</Text>
            </View>
        </Item>
    )

    return (
        <Card style={styles.card}>
            <CardItem header style={styles.header}>
                <Text>Estos han sido tus movimientos</Text>
            </CardItem>
            <CardItem>
                {
                    deposits ? 
                        deposits.length > 0 ?
                            <FlatList 
                                data={deposits}
                                renderItem={({item}) => renderItem(item)}
                                keyExtractor={(item, index) => `${index}-${item?.id?.toString()}`}
                            />
                            :
                            <Text>No has realizado ningún depósito o retiro</Text>
                        :
                        <Text>Lo sentimos, no hay datos disponibles</Text>
                }
            </CardItem>
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.user?.data?.id,
        deposits: state.deposits?.data,
        balance: state.user?.data?.balance,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDeposits: (userId) => dispatch(DepositsActions.getDepositsRequest(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountData);
