import React, { FC } from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Constants } from "../general/Constants";
import { Ionicons } from "@expo/vector-icons";

interface ButtonProps {
  continuePress: () => void;
  validatePress: () => void;
  status: string;
  correctAnswer: any;
}

const Button: FC<ButtonProps> = ({
  continuePress,
  validatePress,
  status,
  correctAnswer,
}) => {
  let title = "";
  if (status === "selected") {
    title = "Check answer";
  } else {
    title = "Continue";
  }

  let onPress = null;
  if (status === "selected") {
    onPress = validatePress;
  } else if (status === "correct" || status === "false") {
    onPress = continuePress;
  } else {
    onPress = () => {};
  }

  let styleBackground = null;
  if (status === "start" || status === "selected") {
    styleBackground = styles.background;
  } else if (status === "correct") {
    styleBackground = styles.backgroundBlue;
  } else if (status === "false") {
    styleBackground = styles.backgroundRed;
  }

  let styleButton = null;
  if (status === "start") {
    styleButton = styles.start;
  } else if (status === "selected") {
    styleButton = styles.selected;
  } else if (status === "correct") {
    styleButton = styles.correct;
  } else {
    styleButton = styles.false;
  }

  let isVisible = false;
  if (status === "correct" || status === "false") {
    isVisible = true;
  } else {
    isVisible = false;
  }

  return (
    <View style={[styleBackground]}>
      <Text
        style={{
          color: "white",
          fontSize: 18,
          position: "absolute",
          top: 20,
          left: 35,
          fontWeight: "bold",
          display: isVisible ? "flex" : "none",
        }}
      >
        {status === "correct" ? "Great Job!" : `Answer: ${correctAnswer}`}
      </Text>
      <Ionicons
        name="flag-sharp"
        size={24}
        color="white"
        style={{
          position: "absolute",
          top: 20,
          right: 35,
          display: isVisible ? "flex" : "none",
        }}
      />
      <Pressable style={[styles.button, styleButton]} onPress={onPress}>
        <Text style={[styles.text, styleButton]}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
  start: {
    backgroundColor: Constants.THEME.lightGreen,
    color: "white",
  },
  selected: {
    backgroundColor: Constants.THEME.blue,
    color: "white",
  },
  correct: {
    backgroundColor: "white",
    color: Constants.THEME.blue,
  },
  false: {
    backgroundColor: "white",
    color: Constants.THEME.red,
  },
  background: {
    height: "70%",
    width: "100%",
    padding: 30,
    justifyContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
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
