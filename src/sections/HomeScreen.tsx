import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Alert, Pressable } from "react-native";
import { Constants } from "../general/Constants";
import Button from "../components/Button";
import Verb from "../components/Verb";
import Answer from "../components/Answer";
import firebase from "../../firebase/firebase-config";

const HomeScreen = () => {
  //  USESTATES
  const [status, setStatus] = useState("start");
  const [question, setQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [allAnswers, setAllAnswers] = useState<any[]>([]);
  const [allInfo, setAllInfo] = useState<any[]>([]);

  const [currentQuestions, setCurrentQuestions] = useState<any[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<any[]>([]);
  const [currentInfo, setCurrentInfo] = useState<any[]>([]);

  //  FIREBASE SETUP
  const db = firebase.firestore();
  const questionsCollection = db.collection("questions");
  const answersCollection = db.collection("answers");
  const infoCollection = db.collection("quiz");

  //  FETCH DATA
  const getData = async () => {
    try {
      questionsCollection.onSnapshot(
        (querySnapshot) => {
          const newQuestions = [];
          querySnapshot.forEach((doc) => {
            const question = doc.data();
            question.id = doc.id;
            newQuestions.push(question);
          });
          setAllQuestions(newQuestions);
          setCurrentQuestions(newQuestions.filter((a) => a.id === "1"));
        },
        (error) => {
          console.log(error);
        }
      );
      answersCollection.onSnapshot(
        (querySnapshot) => {
          const newAnswers = [];
          querySnapshot.forEach((doc) => {
            const answer = doc.data();
            answer.id = doc.id;
            newAnswers.push(answer);
          });
          setAllAnswers(newAnswers);
          setCurrentAnswers(newAnswers.filter((a) => a.id === "1"));
        },
        (error) => {
          console.log(error);
        }
      );
      infoCollection.onSnapshot(
        (querySnapshot) => {
          const newInfo = [];
          querySnapshot.forEach((doc) => {
            const info = doc.data();
            info.id = doc.id;
            newInfo.push(info);
          });
          setAllInfo(newInfo);
          setCurrentInfo(newInfo.filter((a) => a.id === "1"));
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
    if (selectedAnswer === currentInfo[0].answer) {
      updateStatus("correct");
    } else {
      updateStatus("false");
    }
  };

  const updateStatus = (newStatus: string) => {
    if (newStatus === "start") {
      setStatus("start");
    } else if (newStatus === "selected") {
      setStatus("selected");
    } else if (newStatus === "correct") {
      setStatus("correct");
    } else if (newStatus === "false") {
      setStatus("false");
    }
  };

  const getNewDetails = async (question: number) => {
    setCurrentQuestions(
      allQuestions.filter((a) => a.id === question.toString())
    );
    setCurrentAnswers(allAnswers.filter((a) => a.id === question.toString()));
    setCurrentInfo(allInfo.filter((a) => a.id === question.toString()));
  };

  const nextQuestion = () => {
    if (question < 5) {
      setQuestion(question + 1);
      getNewDetails(question + 1);
      setSelectedAnswer("");
      updateStatus("start");
    } else {
      alert("You are finished");
    }
  };

  /*const answer = ({ item }) => {
    return (
      <View>
        {status === "start" || status === "selected" ? (
          <Pressable
            onPress={() => {
              setStatus("selected");
              setSelectedAnswer(item);
            }}
            style={{ marginVertical: 10 }}
          >
            <Text
              style={{
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
              }}
            >
              {item.answer}
            </Text>
          </Pressable>
        ) : (
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{
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
              }}
            >
              {item.answer}
            </Text>
          </View>
        )}
      </View>
    );
  };*/

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
          <Text style={{ color: "white", fontSize: 15 }}>
            Fill in the missing word
          </Text>
          <Text style={{ color: "white", fontSize: 20, marginTop: 20 }}>
            {currentInfo[0]?.sentence}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              height: "30%",
            }}
          >
            {currentQuestions.map((question) => {
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
                  <Verb
                    value={question?.question_1}
                    status={status}
                    selectedAnswer={selectedAnswer}
                  ></Verb>
                  <Verb
                    value={question?.question_2}
                    status={status}
                    selectedAnswer={selectedAnswer}
                  ></Verb>
                  <Verb
                    value={question?.question_3}
                    status={status}
                    selectedAnswer={selectedAnswer}
                  ></Verb>
                  <Verb
                    value={question?.question_4}
                    status={status}
                    selectedAnswer={selectedAnswer}
                  ></Verb>
                </View>
              );
            })}
          </View>
          <View
            style={{
              height: "70%",
              width: "100%",
            }}
          >
            {currentAnswers.map((answer) => {
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
                  <Answer
                    value={answer?.answer_1}
                    status={status}
                    handlePress={() => {
                      setStatus("selected");
                      setSelectedAnswer(answer?.answer_1);
                    }}
                  ></Answer>
                  <Answer
                    value={answer?.answer_2}
                    status={status}
                    handlePress={() => {
                      setStatus("selected");
                      setSelectedAnswer(answer?.answer_2);
                    }}
                  ></Answer>
                  <Answer
                    value={answer?.answer_3}
                    status={status}
                    handlePress={() => {
                      setStatus("selected");
                      setSelectedAnswer(answer?.answer_3);
                    }}
                  ></Answer>
                  <Answer
                    value={answer?.answer_4}
                    status={status}
                    handlePress={() => {
                      setStatus("selected");
                      setSelectedAnswer(answer?.answer_4);
                    }}
                  ></Answer>
                </View>
              );
            })}
            {/*<FlatList
                  data={answers}
                  renderItem={answer}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  contentContainerStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                />*/}
          </View>
        </View>
        <View
          style={{
            height: "50%",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <Button
            status={status}
            validatePress={validateAnswer}
            continuePress={nextQuestion}
            correctAnswer={currentInfo[0]?.answer}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
