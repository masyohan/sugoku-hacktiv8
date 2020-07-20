import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard, solveBoard } from '../store/actions/boardAction';
import Board from '../components/Board';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Button } from 'native-base';
import CountDown from 'react-native-countdown-component';

const bgImage = { uri: "https://st2.depositphotos.com/1000336/6150/i/950/depositphotos_61500581-stock-photo-puzzle-game-background.jpg" };

export default function Game({ navigation }) {
    const { board } = useSelector(state => state.boardReducer);
    const { gameDetail } = useSelector(state => state.gameReducer);
    
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('fetch board')
        dispatch(getBoard(gameDetail.level));
    }, [gameDetail])

    return (
        <Container>
            <ImageBackground source={bgImage} style={styles.image}>
                <View style={{flexDirection: 'row', justifyContent:'space-between', paddingHorizontal: 20, marginLeft:10, marginRight:10, backgroundColor: 'white'}}>
                    <Text style={styles.info}>Player Name: { gameDetail.username }</Text>
                    <Text style={styles.info}>Difficulty: { gameDetail.level }</Text>
                </View>
                <View>
                    <Board board={board} finish={() => navigation.navigate('Finish')}/>
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