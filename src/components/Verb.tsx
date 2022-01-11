import React, { FC } from "react";
import { Pressable, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Constants } from "../general/Constants";
import { useState, useEffect } from "react";

interface VerbProps {
  value: string;
  selectedAnswer: any;
  status: string;
}

const Verb: FC<VerbProps> = ({ value, selectedAnswer, status }) => {
  let styleVerb = null;

  if (value) {
    styleVerb = styles.value;
  } else if (!value && selectedAnswer && status === "selected") {
    styleVerb = styles.selected;
  } else if (!value && selectedAnswer && status === "correct") {
    styleVerb = styles.correct;
  } else if (!value && selectedAnswer && status === "false") {
    styleVerb = styles.false;
  } else {
    styleVerb = styles.novalue;
  }

  let title = "";
  if (value) {
    title = value;
  } else if (!value && selectedAnswer) {
    title = selectedAnswer;
  } else {
    title = "";
  }

  return <Text style={[styleVerb]}>{title}</Text>;
};

const styles = StyleSheet.create({
  value: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
    borderBottomWidth: 2,
    borderStyle: "dotted",
    borderColor: Constants.THEME.lightGreen,
    height: 25,
  },
  novalue: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
    width: 60,
    borderBottomWidth: 2,
    borderColor: Constants.THEME.lightGreen,
    height: 25,
  },
  selected: {
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
  correct: {
    marginRight: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: Constants.THEME.blue,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 17,
    color: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  false: {
    marginRight: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: Constants.THEME.red,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 17,
    color: "white",
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

export default Verb;
