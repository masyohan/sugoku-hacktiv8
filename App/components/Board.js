import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Alert } from 'react-native';
import { Button } from 'native-base';

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export default function Board(props) {
    const [userBoard, setUserBoard] = useState([]);
    function changeBoard(indexRow, indexCol, text) {
        let newBoard = [...userBoard];
        newBoard[indexRow][indexCol] = Number(text);
        setUserBoard(newBoard);
    }

    async function solve() {
        const fetchSolve = await fetch(`https://sugoku.herokuapp.com/solve`, {
            method: 'POST',
            body: encodeParams({ board: props.board }),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        const { solution } = await fetchSolve.json();
        setUserBoard(solution);
    }

    async function validate(inputBoard) {
        const fetchValidate = await fetch(`https://sugoku.herokuapp.com/validate`, {
            method: 'POST',
            body: encodeParams({ board: inputBoard }),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        const { status } = await fetchValidate.json();
        if(status == 'solved'){
            props.finish()
        }else{
            Alert.alert('Wrong', 'Your answer uncorrect !')
        }
    }

    useEffect(() => {
        setUserBoard(JSON.parse(JSON.stringify(props.board)));
    }, [props.board])

    return (
        <View>
            {userBoard.map((row,indexRow) => {
                return (
                    <View style={styles.row} key={indexRow}>
                        {row.map((col, indexCol) => {
                            return (
                            <TextInput onChangeText={(text) => changeBoard(indexRow, indexCol, text)}
                            style={[styles.col,{backgroundColor: props.board[indexRow][indexCol] ? 'red' : 'white'}]} 
                            value={col ? col.toString() : ''} 
                            editable={props.board[indexRow][indexCol] ? false : true}
                            />
                            )
                        })}
                    </View>
                )
            })}
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10}}>
                <Button onPress={() => validate(userBoard)} info rounded style={{flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10}}>
                    <Text style={{color: 'white', fontSize:20}}>Validate</Text>
                </Button>
                <Button onPress={() => solve()} success rounded style={{flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10}}>
                    <Text style={{color: 'white', fontSize:20}}>Solve</Text>
                </Button>
            </View>
        </View>
    )
}

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
        justifyContent:'center'
    },
    col: {
        width: (width - 40)/9,
        height: (width - 40)/9,
        borderWidth: 1,
        borderColor: 'black',
        textAlign:'center',
        fontWeight: 'bold'
    }
});