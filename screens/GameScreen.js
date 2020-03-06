import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView
} from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (value, numOfRound) => {
  return (
    <View key={value} style={styles.listItem}>
      <BodyText>#{numOfRound}</BodyText>
      <BodyText>{value}</BodyText>
    </View>
  );
};

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === "baja" && currentGuess < props.userChoice) ||
      (direction === "sube" && currentGuess > props.userChoice)
    ) {
      Alert.alert(
        "No te mientas :(",
        "Di la verdad para que puedo adivinar corectamente",
        [{ text: "Perdona!", type: "cancel" }]
      );
      return;
    }
    if (direction === "baja") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    //setRound(currentRound => currentRound + 1);
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <Text>Suposición del ordenador</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button
          title="Baja"
          onPress={() => {
            nextGuessHandler("baja");
          }}
        />
        <Button
          title="Sube"
          onPress={() => {
            nextGuessHandler("sube");
          }}
        />
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: 300,
    maxWidth: "80%"
  },
  listContainer: {
    flex: 1,
    width: "80%"
  },
  list: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default GameScreen;
