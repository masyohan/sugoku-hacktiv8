import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import {  useSelector } from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Button } from 'native-base';

const bgImage = { uri: "https://st2.depositphotos.com/1000336/6150/i/950/depositphotos_61500581-stock-photo-puzzle-game-background.jpg" };

export default function Finish() {
    const { gameDetail } = useSelector(state => state.gameReducer);
    return (
        <Container>
            <ImageBackground source={bgImage} style={styles.image}>
                <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 20, marginLeft:10, marginRight:10, backgroundColor: 'white'}}>
                    <Text style={styles.info}>Congratulation { gameDetail.username }, You Win !</Text>
                    <Text style={styles.info}>Difficulty: { gameDetail.level }</Text>
                </View>
            </ImageBackground>
        </Container>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    info: {
        color: 'black',
        fontWeight: 'bold',
        flex: 1
    }

});