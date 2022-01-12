import React, { FC } from "react";
import { Text, StyleSheet } from "react-native";
import { Constants } from "../general/Constants";

interface VerbProps {
  title: string | null;
  style: string | null;
}

const Verb: FC<VerbProps> = ({ title, style }) => {
  let styleVerb = null;

  switch (style) {
    case "Dotted Line":
      styleVerb = styles.dottedLine;
      break;
    case "Red":
      styleVerb = [styles.red, styles.color];
      break;
    case "Blue":
      styleVerb = [styles.blue, styles.color];
      break;
    case "White":
      styleVerb = [styles.white, styles.color];
      break;
    case "Solid Line":
      styleVerb = styles.solidLine;
      break;
    default:
      break;
  }

  return <Text style={[styleVerb]}>{title}</Text>;
};

const styles = StyleSheet.create({
  dottedLine: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
    borderBottomWidth: 2,
    borderStyle: "dotted",
    borderColor: Constants.THEME.lightGreen,
    height: 25,
  },
  solidLine: {
    color: "white",
    fontSize: 18,
    marginRight: 10,
    width: 60,
    borderBottomWidth: 2,
    borderColor: Constants.THEME.lightGreen,
    height: 25,
  },
  color: {
    marginRight: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 17,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,
    elevation: 19,
  },
  white: {
    backgroundColor: "white",
    color: Constants.THEME.darkGreen,
  },
  blue: {
    backgroundColor: Constants.THEME.blue,
    color: "white",
  },
  red: {
    backgroundColor: Constants.THEME.red,
    color: "white",
  },
});

export default Verb;
