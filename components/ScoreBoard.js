import { useState, useEffect } from "react";
import { SafeAreaView, Text, FlatList, Pressable, View } from "react-native";
import Footer from './Footer';
import Header from "./Header";
import { SCOREBOARD_KEY } from "../constants/Game";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "react-native-paper"; 

export default ScoreBoard = ({ navigation }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getScoreboardData();
    });
    return unsubscribe;
  }, [navigation]);

  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
      if (jsonValue !== null) {
        const tmpScores = JSON.parse(jsonValue);
        setScores(tmpScores);
        console.log('Scoreboard: Read successful.');
      }
    } catch (e) {
      console.log('Scoreboard: Read error:' + e);
    }
  };

  const clearScoreboard = async () => {
    try {
      await AsyncStorage.removeItem(SCOREBOARD_KEY);
      setScores([]);
      console.log('Scoreboard: Cleared.');
    } catch (e) {
      console.log('Clear error:' + e);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={{ margin: 8, padding: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
      <Text>Date: {item.date} | Time: {item.time}</Text>
      <Text>Points: {item.points} pts</Text>
    </Card>
  );

  return (
    <>
      <Header />
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Scoreboard</Text>
        
        {/* Clear Scoreboard -button */}
        <Pressable onPress={clearScoreboard} style={{ margin: 15, padding: 10, backgroundColor: 'red', borderRadius: 5 }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Clear Scoreboard</Text>
        </Pressable>

        {/* FlatList cards */}
        <FlatList
          data={scores}
          keyExtractor={(item) => item.key.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
          style={{ flex: 1 }} 
        />
      </SafeAreaView>
      <Footer />
    </>
  );
};
