import { useState } from "react";
import { SafeAreaView, Text, Image, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Card, TextInput, Button } from 'react-native-paper'; 
import Header from "./Header";
import Footer from './Footer';
import style from "../styles/style";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { 
  NBR_OF_DICES, 
  NBR_OF_THROWS, 
  MIN_SPOT, 
  MAX_SPOT, 
  BONUS_POINTS, 
  BONUS_POINTS_LIMIT
} from '../constants/Game';

export default Home = ({ navigation }) => {

  const [playerName, setPlayerName] = useState('');
  const [hasPlayerName, setHasPlayerName] = useState(false);

  const handlePlayerName = (value) => {
    if (value.trim().length > 0) {
      setHasPlayerName(true);
      Keyboard.dismiss();
    }
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>
          <Header />
          
          <Image
            source={require('../assets/noppa.png')}
            style={[style.noppa, { alignSelf: 'center' }]}
          />
          
          {!hasPlayerName ? (
            <>
              <Card style={style.cardContainer}>
                <Card.Content>
                  <Text style={style.tervetuloa}>Welcome to play!</Text>
                  <TextInput
                    label="Player name"
                    mode="outlined"
                    activeOutlineColor="black"
                    value={playerName}
                    onChangeText={setPlayerName}
                    style={{width: 250}}
                  />
                  <Button
                    mode="contained"
                    onPress={() => handlePlayerName(playerName)}
                    style={style.valmisNappi}
                  >
                    Ready!
                  </Button>
                </Card.Content>
              </Card>
            </>
          ) : (
            <>
            <View style={style.rulesBox}>
              <Text style={style.rulesTitle}>Rules of the game</Text>
              <Text style={style.rules} multiline="true">
                THE GAME: Upper section of the classic Yahtzee dice game. 
                You have {NBR_OF_DICES} dices and for the every dice you have {NBR_OF_THROWS} throws. 
                After each throw you can keep dices in order to get same dice spot counts as many as possible. 
                In the end of the turn you must select your points from {MIN_SPOT} to {MAX_SPOT}. 
                Game ends when all points have been selected. The order for selecting those is free.
                POINTS: After each turn game calculates the sum for the dices you selected. 
                Only the dices having the same spot count are calculated. Inside the game you can not select same points from {MIN_SPOT} to {MAX_SPOT} again.
                GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points is the limit of getting bonus which gives you {BONUS_POINTS} points more.
              </Text>
              
              <View style={style.onnea}>
              <Text style={{fontWeight: 'bold'}}>Good luck, {playerName}!</Text>
              
              <Button
                mode="contained"
                onPress={() => navigation.navigate('GameBoard', {player: playerName})}
                style={style.button}
                >
                PLAY
              </Button>
              </View>
              </View>
            </>
          )}
          <Footer />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  )
}
