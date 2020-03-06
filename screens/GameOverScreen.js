import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

import colors from "../constants/colors";

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText> El juego se acabó!</TitleText>
      <View style={styles.imageContainer}>
        <Image
          //source={require("../assets/success.png")}
          source={{
            uri:
              "https://images.pexels.com/photos/235805/pexels-photo-235805.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Tu móvil necesitaba
          <Text style={styles.highlight}> {props.roundNumber}</Text> intentos
          para conseguir tu número
          <Text style={styles.highlight}> {props.userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={props.onRestart}>OTRA VEZ</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 200
  },
  imageContainer: {
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    width: 300,
    height: 300,
    overflow: "hidden",
    marginVertical: 30
  },
  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold"
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15
  },
  resultText: {
    textAlign: "center",
    fontSize: 20
  }
});

export default GameOverScreen;
