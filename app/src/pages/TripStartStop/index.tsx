import React, { useCallback, useRef, useState } from "react";
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
} from "./styles";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";

interface SignUpFormData {
  name: string;
  phone: string;
  cpf: string;
  nascimento: string;
  apelido: string;
  password: string;
}

const TripStartStop = () => {
  
  const navigation = useNavigation();

  function handleNavigateAlongamento() {
    navigation.navigate("Stretching");
  }
  
  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <>
      <Logo></Logo>
      <ScrollView style={styles.viewSize}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleNavigateBack}>
            <Icon name="arrow-left" size={25} color="#000" />
          </TouchableOpacity>
          <Title>Check-In de Parada</Title>
          <Text></Text>
        </View>
        <Container>
          <InfoText>
            Após um longo tempo dirigindo é importante que você realize um
            alongamento para impedir lesões e desconfortos por ter ficado muito
            tempo sentado
          </InfoText>         
          <Button onPress={handleNavigateAlongamento}>Iniciar série de alongamento</Button>
          <Button>Pular e iniciar parada</Button>
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

export default TripStartStop;
