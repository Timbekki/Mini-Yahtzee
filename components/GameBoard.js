import { Text, Pressable, SafeAreaView, View } from "react-native";
import style from "../styles/style";
import Header from "./Header";
import Footer from './Footer.js';
import { useEffect, useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Container, Row, Col } from "react-native-flex-grid";
import { 
  NBR_OF_DICES, 
  NBR_OF_THROWS, 
  MIN_SPOT, 
  MAX_SPOT, 
  BONUS_POINTS, 
  BONUS_POINTS_LIMIT,
  SCOREBOARD_KEY
} from '../constants/Game';
import AsyncStorage from "@react-native-async-storage/async-storage";

let board = [];

export default GameBoard = ({navigation, route}) => {
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices.');
  const [gameEndStatus, setGameEndStatus] = useState(false);

  //Mitkä arpakuutioista ovat valittuina?
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
  //Arpakuutioiden silmäluvut
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
  // Valittujen arpakuutioiden kokonaispistemäärät
  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
  // Mitkä arpakuutioiden silmäluvuista on valittu pisteisiin
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(0));
  const [playerName, setPlayerName] = useState('');
  const [scores, setScores] = useState([]);

  useEffect (() => {
    if (playerName === '' && route.params?.player) {
      setPlayerName(route.params.player);
    }
  },[]);

  useEffect (() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getScoreboardData();
    });
    return unsubscribe;
  }, [navigation]);

  const getScoreboardData = async() => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if(jsonValue !== null){
        const tmpScores = JSON.parse(jsonValue);
        setScores(tmpScores);
        console.log('Gameboard: Read successful.');
      }
    } catch (e){
      console.log('Gameboard: Read error:' + e);
    }
  };

  const savePlayerPoints = async () => {
    let totalPoints = dicePointsTotal.reduce((sum, point) => sum + point, 0);
    let bonus = 0;
    
    if (totalPoints >= BONUS_POINTS_LIMIT) {
      bonus = BONUS_POINTS;
      totalPoints += bonus;
    }
  
    const playerPoints = {
      key: scores.length + 1,
      name: playerName,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      points: totalPoints
    };
  
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      const existingScores = jsonValue ? JSON.parse(jsonValue) : [];
  
      const newScore = [playerPoints, ...existingScores];
      newScore.sort((a, b) => b.points - a.points); 
  
      const jsonNewScore = JSON.stringify(newScore);
  
      await AsyncStorage.setItem(SCOREBOARD_KEY, jsonNewScore);
      setScores(newScore);
      console.log('Gameboard: Save successful. Points: ', totalPoints);
    } catch (e) {
      console.log('Gameboard: Save error: ' + e);
    }
  };
  

  const getSpotTotal = (i) => dicePointsTotal[i];

  const chooseDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS) {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);
    } else {
      setStatus("You have to throw dices first.");
    }
  };

  const getDiceColor = (i) => selectedDices[i] ? "black" : "#81c257";
  const getDicePointsColor = (i) => (selectedDicePoints[i] && !gameEndStatus) ? "black" : "#81c257";

  const chooseDicePoints = (i) => {
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
      setStatus("Throw the dices at least once.");
      return;
    }

    if (nbrOfThrowsLeft >= 0) {
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];

      if (!selectedDicePoints[i]) {
        selectedPoints[i] = true;
        let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
        points[i] = nbrOfDices * (i + 1);
      } else {
        setStatus("You already selected points for " + (i + 1));
        return points[i];
      }

      setDicePointsTotal(points);
      setSelectedDicePoints(selectedPoints);
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
      setNbrOfThrowsLeft(NBR_OF_THROWS);

      if (selectedPoints.every(point => point === true)) {
        let totalPoints = points.reduce((sum, point) => sum + point, 0);
        let bonus = 0;

        if (totalPoints >= BONUS_POINTS_LIMIT) {
          bonus = BONUS_POINTS;
          totalPoints += bonus;
          setStatus(
            "Your score: " + (totalPoints - bonus) + " pts\nBonus: " + bonus + " pts\nOverall score: " + totalPoints + " pts"
          );
        } else {
          setStatus(
            "\nYour score: " + totalPoints + " pts\nNo bonus\nOverall score: " + totalPoints + " pts"
          );
        }

        setGameEndStatus(true);
      } else {
        setStatus("Points set for " + (i + 1) + ". Starting new round.");
      }
      return points[i];
    }
  };

  const throwDices = () => {
    if (nbrOfThrowsLeft === 0) {
      setStatus('No throws left. Select your points.');
      return;
    }

    let spots = [...diceSpots];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectedDices[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
        spots[i] = randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
    setDiceSpots(spots);
    setStatus('Select and throw dices again.');
  };

  const startNewGame = () => {
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    setDiceSpots(new Array(NBR_OF_DICES).fill(0));
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    setDicePointsTotal(new Array(MAX_SPOT).fill(0));
    setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
    setGameEndStatus(false);
    setStatus("New game started. Throw dices!");
  };

  const dicesRow = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    dicesRow.push(
      <Col key={"dice" + dice}>
        <Pressable onPress={() => chooseDice(dice)}>
          <MaterialCommunityIcons
            name={board[dice]}
            size={55}
            color={getDiceColor(dice)}
          />
        </Pressable>
      </Col>
    );
  }

  const pointsRow = [];
  for(let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={'pointRow' + spot}>
        <Text key={"pointRow" + spot}>{ getSpotTotal(spot) }</Text>
      </Col>
    );
  }

  const pointsToSelectRow = [];
  for(let diceButton = 0; diceButton < MAX_SPOT; diceButton++){
    pointsToSelectRow.push(
      <Col key={"buttonsRow" + diceButton}>
        <Pressable onPress={() => chooseDicePoints(diceButton)}>
          <MaterialCommunityIcons
            name={"numeric-" + (diceButton + 1) + "-circle"}
            size={35}
            color={getDicePointsColor(diceButton)}
          />
        </Pressable>
      </Col>
    );
  }

  return (
    <>
      <Header />
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {!gameEndStatus ? (
          <Text style={{marginBottom: 30, fontSize: 25}}>Throws left: {nbrOfThrowsLeft}</Text>
        ) : (
          <Text style={{marginBottom: 30, fontSize: 25}}>Game Over!</Text>
        )}

        <Container style={{ alignItems: 'center', marginBottom: 20 }}>
          <Row>{dicesRow}</Row>
        </Container>

        <Text style={style.throwStatus}>{status}</Text>

        <Container style={{ marginTop: 20 }}>
          <Row>{pointsRow}</Row>
        </Container>

        <Container style={{ marginTop: 20 }}>
          <Row>{pointsToSelectRow}</Row>
        </Container>

        {!gameEndStatus && (
          <Pressable onPress={() => throwDices()} style={style.throwButton}>
            <Text style={style.throwButtonText}>THROW DICES</Text>
          </Pressable>
        )}

        {gameEndStatus && (
          <>
            <Pressable onPress={() => startNewGame()} style={style.newGame}>
              <Text style={style.StartNewGameText}>START NEW GAME</Text>
            </Pressable>
            <Pressable onPress={() => savePlayerPoints()} style={style.throwButton}>
              <Text style={style.SavePointText}>SAVE POINTS</Text>
            </Pressable>
          </>
        )}

        <Text style={{ marginTop: 20 }}>Player: {playerName}</Text>
      </SafeAreaView>
      <Footer />
    </>
  );
};