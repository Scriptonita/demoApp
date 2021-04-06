import React, { useEffect } from 'react';
import { Card, CardItem, Item, Text } from 'native-base';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View } from 'react-native';
import TransactionsActions from '../Redux/TransactionsRedux';

const styles = StyleSheet.create({
    card: {
        flex: 1,
    },
    header: {
        paddingBottom: 5,
        marginBottom: 0,
    },
    movement: {
        paddingVertical: 20,
    },
});

export const TransactionsHistory = ({getTransactions, userId, transactions}) => {
    useEffect(() => {
        if (userId) {
            getTransactions(userId)
        }
    }, [])

    const renderItem = (item) => (
        <Item style={styles.movement}>
            <View>
                <Text>Cantidad: {item.quantity}</Text>
                <Text>De: {item.from}</Text>
                <Text>A: {item.to}</Text>
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
                    transactions ?
                        <FlatList 
                            data={transactions}
                            renderItem={({item}) => renderItem(item)}
                            keyExtractor={(item, index) => `${index}-${item?.id?.toString()}`}
                        />
                        :
                        <Text>No hay datos disponibles</Text>
                } 
            </CardItem>
        </Card>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.user?.data?.id,
        transactions: state.transactions?.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTransactions: (userId) => dispatch(TransactionsActions.getTransactionsRequest(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsHistory);
