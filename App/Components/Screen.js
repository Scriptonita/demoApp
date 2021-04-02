import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Container } from 'native-base';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    commonView: {
        padding: 25
    }
});

const ScreenComponent = ({children}) => (
    <SafeAreaView style={styles.container}>
        <Container style={styles.commonView}> 
            { children }
        </Container>
    </SafeAreaView>
)

export default ScreenComponent;
