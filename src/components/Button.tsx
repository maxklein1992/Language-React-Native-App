import React, { FC } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Constants } from "../general/Constants";
import { Ionicons } from "@expo/vector-icons";

interface ButtonProps {
  onPress: () => void;
  correctAnswer: string;
  style: string | null;
  title: string | null;
}

const Button: FC<ButtonProps> = ({ onPress, correctAnswer, style, title }) => {
  let styleButton = null;
  let styleBackground = null;
  let textStatus = null;

  switch (style) {
    case "Green":
      styleButton = styles.green;
      break;
    case "Blue":
      styleButton = styles.blue;
      break;
    case "White/Blue":
      styleButton = styles.whiteBlue;
      styleBackground = styles.backgroundBlue;
      textStatus = "Blue";
      break;
    case "White/Red":
      styleButton = styles.whiteRed;
      styleBackground = styles.backgroundRed;
      textStatus = "Red";
      break;
    default:
      break;
  }

  return (
    <View style={[styles.background, styleBackground]}>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          position: "absolute",
          top: 20,
          left: 35,
          fontWeight: "bold",
          display: textStatus ? "flex" : "none",
        }}
      >
        {textStatus === "Blue"
          ? "Great Job!"
          : textStatus === "Red"
          ? `Answer: ${correctAnswer}`
          : null}
      </Text>
      <Ionicons
        name="flag-sharp"
        size={24}
        color="white"
        style={{
          position: "absolute",
          top: 20,
          right: 35,
          display: textStatus ? "flex" : "none",
        }}
      />
      <Pressable style={[styles.button, styleButton]} onPress={onPress}>
        <Text style={[styles.text, styleButton]}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  //  General
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 280,
    minHeight: 56,
    borderRadius: 25,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.25,
  },
  background: {
    height: "70%",
    width: "100%",
    padding: 30,
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  //  Colors buttons
  green: {
    backgroundColor: Constants.THEME.lightGreen,
    color: "white",
  },
  blue: {
    backgroundColor: Constants.THEME.blue,
    color: "white",
  },
  whiteBlue: {
    backgroundColor: "white",
    color: Constants.THEME.blue,
  },
  whiteRed: {
    backgroundColor: "white",
    color: Constants.THEME.red,
  },

  //  Background
  backgroundBlue: {
    height: "70%",
    width: "100%",
    padding: 30,
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Constants.THEME.blue,
  },
  backgroundRed: {
    height: "70%",
    width: "100%",
    padding: 30,
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Constants.THEME.red,
  },
});

export default Button;
