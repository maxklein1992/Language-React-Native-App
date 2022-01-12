import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Alert, FlatList } from "react-native";
import { Constants } from "../general/Constants";
import Button from "../components/Button";
import Verb from "../components/Verb";
import Answer from "../components/Answer";
import firebase from "../../firebase/firebase-config";

const HomeScreen = () => {
  //  USESTATES
  const [status, setStatus] = useState<string>("start");
  const [isChoiceConfirmed, setIsChoiceConfirmed] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  //  FIREBASE SETUP
  const db = firebase.firestore();
  const quizDataCollection = db.collection("quizData");

  //  FETCH DATA
  const getData = async () => {
    try {
      quizDataCollection.onSnapshot(
        (querySnapshot) => {
          let newQuestions: any = [];
          querySnapshot.forEach((doc) => {
            const question = doc.data();
            question.id = doc.id;
            newQuestions.push(question);
          });
          setAllQuestions(newQuestions);
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      Alert.alert("something went wrong");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  //  QUESTIONS HANDLING
  const validateAnswer = () => {
    setIsChoiceConfirmed(true);
    if (selectedAnswer === allQuestions[currentQuestionIndex]?.correct_option) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const updateStatus = (newStatus: string) => {
    if (newStatus === "start") {
      setStatus("start");
    } else if (newStatus === "selected") {
      setStatus("selected");
    } else if (newStatus === "correctAnswer") {
      setStatus("correctAnswer");
    } else if (newStatus === "wrongAnswer") {
      setStatus("wrongAnswer");
    }
  };

  const restartQuiz = () => {
    alert("Hoi");
  };

  const nextQuestion = () => {
    if (currentQuestionIndex + 1 < allQuestions?.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsChoiceConfirmed(false);
      setIsCorrect(false);
      setSelectedAnswer("");
      updateStatus("start");
    } else {
      alert("You finished the exercise! Try again");
      setCurrentQuestionIndex(0);
      setIsChoiceConfirmed(false);
      setIsCorrect(false);
      setSelectedAnswer("");
      updateStatus("start");
    }
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          height: "20%",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Text style={{ color: "white", fontSize: 15 }}>
          {`${currentQuestionIndex + 1}/${
            allQuestions.length
          } Fill in the missing word`}
        </Text>
        <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };

  const renderVerbs = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          height: "30%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            height: "30%",
          }}
        >
          {allQuestions[currentQuestionIndex]?.verbs.map(
            (verb: string, index: number) => (
              <Verb
                key={index}
                title={verb ? verb : selectedAnswer ? selectedAnswer : null}
                style={
                  verb
                    ? "Dotted Line"
                    : !verb && isChoiceConfirmed && isCorrect
                    ? "Blue"
                    : !verb && isChoiceConfirmed && !isCorrect
                    ? "Red"
                    : !verb && !isChoiceConfirmed && selectedAnswer
                    ? "White"
                    : !verb && !isChoiceConfirmed && !selectedAnswer
                    ? "Solid Line"
                    : null
                }
              />
            )
          )}
        </View>
      </View>
    );
  };

  const renderOptions = () => {
    return (
      <View
        style={{
          height: "50%",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            height: "100%",
          }}
        >
          <View style={{ flexDirection: "row", height: "100%", width: "100%" }}>
            <FlatList
              data={allQuestions[currentQuestionIndex]?.options}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Answer
                  title={item}
                  onPress={
                    !isChoiceConfirmed
                      ? () => setSelectedAnswer(item)
                      : () => {}
                  }
                  style={{
                    opacity: isChoiceConfirmed ? 0.4 : undefined,
                  }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <View
        style={{
          height: "50%",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <Button
          title={
            !isChoiceConfirmed && selectedAnswer ? "Check answer" : "Continue"
          }
          onPress={
            isChoiceConfirmed
              ? nextQuestion
              : !isChoiceConfirmed && selectedAnswer
              ? validateAnswer
              : () => {}
          }
          correctAnswer={allQuestions[currentQuestionIndex]?.correct_option}
          style={
            !selectedAnswer
              ? "Green"
              : !isChoiceConfirmed && selectedAnswer
              ? "Blue"
              : isChoiceConfirmed && isCorrect
              ? "White/Blue"
              : isChoiceConfirmed && !isCorrect
              ? "White/Red"
              : null
          }
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: Constants.THEME.background,
      }}
    >
      <View
        style={{
          backgroundColor: Constants.THEME.darkGreen,
          height: "95%",
          width: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View
          style={{
            height: "50%",
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: 30,
          }}
        >
          {renderQuestion()}
          {renderVerbs()}
          {renderOptions()}
        </View>
        {renderButton()}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
