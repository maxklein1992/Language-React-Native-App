import React, { FC } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Constants } from "../general/Constants";

interface AnswerProps {
  onPress: () => void;
  title: string;
  style?: object | object[];
}

const Answer: FC<AnswerProps> = ({ title, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={{ marginVertical: 10 }}>
      <Text style={[styles.button, style]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: "white",
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 17,
    color: Constants.THEME.darkGreen,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
});

export default Answer;
