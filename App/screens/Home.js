import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Button } from 'native-base';
import { useDispatch } from 'react-redux';
import { setGameDetail } from '../store/actions/gameAction';

const bgImage = { uri: "https://st2.depositphotos.com/1000336/6150/i/950/depositphotos_61500581-stock-photo-puzzle-game-background.jpg" };

export default function Home( { navigation } ) {
    const [gameInfo, setGameInfo] = useState({
        username: '',
        level: 'easy',
        time: null
    })
    const dispatch = useDispatch();

    function play(){
        dispatch(setGameDetail(gameInfo));
        navigation.navigate('Game');
    }

    function changeUsername(username){
        let newGameInfo = {...gameInfo, username};
        setGameInfo(newGameInfo);
    }

    function changeLevel(level){
        let newGameInfo = {...gameInfo, level};
        setGameInfo(newGameInfo);
    }
    return (
        <Container>
        <ImageBackground source={bgImage} style={styles.image}>
        <Content>
          <Form style={{marginVertical: 20}}>
            <Item stackedLabel>
              <Label style={{fontSize: 20}}>Username</Label>
              <Input value={gameInfo.username} onChangeText={(text) => changeUsername(text)} style={{fontWeight: 'bold', backgroundColor:'white', marginVertical: 20, marginHorizontal: 10, paddingHorizontal: 10}}/>
            </Item>
            <Item stackedLabel last>
              <Label style={{fontSize: 20}}>Level</Label>
              <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ backgroundColor: 'white', marginVertical: 20, marginRight: 10, marginLeft: 10}}
                selectedValue={gameInfo.level} 
                onValueChange={(value) => changeLevel(value) }
              >
                <Picker.Item label="Easy" value="easy" />
                <Picker.Item label="Medium" value="medium" />
                <Picker.Item label="Hard" value="hard" />
              </Picker>
            </Item>
            </Item>
                <Button onPress={() => play()} warning rounded style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 20, marginHorizontal: 20}}>
                    <Text style={{color: 'white', fontSize:20}}>Play</Text>
                </Button>
          </Form>
        </Content>
        </ImageBackground>

      </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    gameInfo: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 20,
        marginHorizontal: 20
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
});