import React, { FC } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Constants } from "../general/Constants";

interface AnswerProps {
  handlePress: () => void;
  value: string;
  status: string;
}

const Answer: FC<AnswerProps> = ({ value, status, handlePress }) => {
  let styleAnswer = null;

  if (status === "start" || status === "selected") {
    styleAnswer = styles.noopacity;
  } else {
    styleAnswer = styles.opacity;
  }

  const onPress =
    status === "correct" || status === "false" ? () => {} : handlePress;

  return (
    <Pressable onPress={onPress} style={{ marginVertical: 10 }}>
      <Text style={[styleAnswer]}>{value}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  opacity: {
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
    opacity: 0.4,
  },
  noopacity: {
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
