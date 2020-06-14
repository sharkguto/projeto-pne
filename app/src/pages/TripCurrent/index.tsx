import React, { useCallback, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity
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
  BotaoContainer
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

const TripCurrent = () => {
  const destinoInputRef = useRef<TextInput>(null);

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const finishTrip = () =>
    Alert.alert(
      "Atenção!",
      "Deseja encerrar essa viagem?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => finishTripSuccess()}
      ],
      { cancelable: false }
    );

    const finishTripSuccess = () =>
    Alert.alert(
      "Parabéns!",
      "Viagem concluída com sucesso!",
      [
        { text: "Sim", onPress: () => handleNavigateBack()}
      ],
      { cancelable: false }
    );

  function handleTripFinishStop() {
    navigation.navigate("TripFinishStop");
  }

  function handleTripStartStop() {
    navigation.navigate("TripStartStop");
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
            <Icon name="arrow-left" size={48} color="#000" />
          </TouchableOpacity>
          <Title>Viagem Atual</Title>
          <Text></Text>
        </View>
        <Container>
          <Rota>
            <RotaText>Origem: São Paulo-SP</RotaText>
            <RotaText>Destino: Curitiba-SP</RotaText>
          </Rota>
          <Card style={styles.shadow}>
            <CardHeader>
              <CardTitle>Tempo de Viagem</CardTitle>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardTime>00d00h00m59s</CardTime>
              </CardColumn>
            </CardHeader>
          </Card>
          <Card style={styles.shadow}>
            <CardHeader>
              <CardTitle>Parada recomendada em</CardTitle>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardTime>00d5h29m01s</CardTime>
              </CardColumn>
            </CardHeader>
          </Card>
          <Card style={styles.shadow}>
            <CardHeader>
              <CardTitle>Jornada máxima Restante</CardTitle>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardTime>00d11h59m01s</CardTime>
              </CardColumn>
            </CardHeader>
          </Card>

          <BotaoContainer>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleTripStartStop()}
              activeOpacity={0.6}
            >
              <Icon name="map-pin" size={40} color="#fff" />
              <Text style={styles.itemTitle}>Iniciar Parada</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleTripFinishStop()}
              activeOpacity={0.6}
            >
              <Icon name="map-pin" size={26} color="#fff" />
              <Text style={styles.itemTitle}>Encerrar Parada</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={finishTrip}
              activeOpacity={0.6}
            >
              <Icon name="x-square" size={40} color="#fff" />
              <Text style={styles.itemTitle}>Encerrar Viagem</Text>
            </TouchableOpacity>
          </BotaoContainer>
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
    backgroundColor: "#fbd762"
  },
  itemsContainer: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#fbd762"
  },

  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#CF2A27",
    borderWidth: 2,
    borderColor: "#CF2A27",
    height: 90,
    width: 95,
    borderRadius: 1,
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 16,
    marginRight: 8,
    marginLeft:8,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center"
  },
  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 18,
    color: "#fff"
  },
  viewSize: {
    height: "100%",
    backgroundColor: "#fbd762"
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  }
});

export default TripCurrent;
