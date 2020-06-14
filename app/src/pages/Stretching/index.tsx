import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import {
  Container,
  Title,
  Card,
  CardHeader,
  CardColumn,
  CardText,
  RotaText,
  CardTitle,
  CardTime,
  Rota,
  BotaoContainer,
  InfoText,
  TimeText,
} from "./styles";

import CountDown from "react-native-countdown-component";

interface SignUpFormData {
  name: string;
  phone: string;
  cpf: string;
  nascimento: string;
  apelido: string;
  password: string;
}

const Stretching = () => {
  const navigation = useNavigation();

  let [count, setCount] = useState<number>(0);
  let [exercicio, setExercicio] = useState<number>(0);
  let [button, setButton] = useState<boolean>(true);

  function handleNavigateBack() {
    navigation.goBack();
  }
  function handleNavigateTripCurrent() {
    navigation.navigate("TripCurrent");
  }

  function nextExercice() {

    if(exercicio >=2) {
      Alert.alert(
        "Parabéns!",
        "Exercícios realizados sucesso!",
        [{ text: "Sim", onPress: () => handleNavigateTripCurrent() }],
        { cancelable: false }
      );
      return;
    }

    setExercicio(exercicio + 1);
    setButton(true);
  }

  const handleStart = useCallback(
     () => {
      setCount(count + 5);
      if(count >= 5) {
        setButton(false);
      }     
    },
    [count],
  );

  
  return (
    <>
      <Logo></Logo>
      <ScrollView style={styles.viewSize}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleNavigateBack}>
            <Icon name="arrow-left" size={25} color="#000" />
          </TouchableOpacity>
          <Title>Alogamento</Title>
          <Text></Text>
        </View>
        <Container>
          <InfoText>
            Você deve realizar a posićão de alongamento abaixo por 30s
          </InfoText>
          <Card>
            {exercicio == 1 &&
               <Image source={require("../../assets/alongamento-1.png")}></Image>
            }

             {exercicio == 2 &&
               <Image source={require("../../assets/alongamento-2.png")}></Image>
            }
            
          </Card>
          <CountDown
            until={count}
             onFinish={() => nextExercice()}
            // onPress={() => alert("hello")}
            timeToShow={['S']}
            timeLabels={{s: 'Segundos'}}
            size={30}
          />
          {button &&
            <Button onPress={handleStart}>Iniciar</Button>
          }
          
        </Container>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 8,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    backgroundColor: "#fbd762",
  },
  itemsContainer: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#fbd762",
  },

  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#CF2A27",
    borderWidth: 2,
    borderColor: "#CF2A27",
    height: 90,
    width: 110,
    borderRadius: 1,
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },
  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
  },
  viewSize: {
    height: "100%",
    backgroundColor: "#fbd762",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});

export default Stretching;
