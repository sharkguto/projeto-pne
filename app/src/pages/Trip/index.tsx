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
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { Feather as IconF } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import {
  Container,
  Title,
  TripList,
  Card,
  CardHeader,
  CardText,
  CardColumn,
  CardTextDetalhes
} from "./styles";
import Constants from "expo-constants";
import { CardTitle } from "../Detail/styles";

const Trip = () => {
  const navigation = useNavigation();

  function handleNavigateNewTrip() {
    navigation.navigate("NewTrip");
  }

  function handleNavigateTripDetail() {
    navigation.navigate("TripDetail");
  }

  function handleNavigateTripCurrent() {
    navigation.navigate("TripCurrent");
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <>
      <Logo></Logo>
      <ScrollView style={styles.viewSize}>
        <Container>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleNavigateBack}>
              <IconF name="arrow-left" size={48} color="#000" />
            </TouchableOpacity>
            <Title>Viagens</Title>
            <Text></Text>
          </View>

          <Button onPress={handleNavigateTripCurrent}>
            Continuar Viagem
          </Button>
          <Button onPress={handleNavigateNewTrip}>Nova Viagem</Button>
          <View style={styles.container}>
            <Title>Histório de Viagens</Title>
          </View>

          <Card style={styles.cardStyle}>
            <CardHeader>
              <CardColumn>
                <CardText>Início: 20/06/2020</CardText>
              </CardColumn>
              <CardColumn>
                <CardText>Fim: 20/06/2020</CardText>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardText>Origem: São Paulo-SP</CardText>
              </CardColumn>
              <CardColumn>
                <CardText>Destino: Curitiba-PR</CardText>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardText>Tempo Total: 16h14m49s</CardText>
              </CardColumn>
              <CardColumn>
                <CardText>Pontos PX: 60</CardText>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <TouchableOpacity onPress={handleNavigateTripDetail}>
                  <CardTextDetalhes>MAIS DETALHES</CardTextDetalhes>
                </TouchableOpacity>
              </CardColumn>
            </CardHeader>
          </Card>

          <Card style={styles.cardStyle}>
            <CardHeader>
              <CardColumn>
                <CardText>Início: 20/06/2020</CardText>
              </CardColumn>
              <CardColumn>
                <CardText>Fim: 20/06/2020</CardText>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardText>Origem: São Paulo-SP</CardText>
              </CardColumn>
              <CardColumn>
                <CardText>Destino: Curitiba-PR</CardText>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardText>Tempo Total: 16h14m49s</CardText>
              </CardColumn>
              <CardColumn>
                <CardText>Pontos PX: 60</CardText>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <TouchableOpacity onPress={handleNavigateTripDetail}>
                  <CardTextDetalhes>MAIS DETALHES</CardTextDetalhes>
                </TouchableOpacity>
              </CardColumn>
            </CardHeader>
          </Card>

          <Card style={styles.cardStyle}>
            <CardHeader>
              <CardColumn>
                <CardText>Início: 20/06/2020</CardText>
              </CardColumn>
              <CardColumn>
                <CardText>Fim: 20/06/2020</CardText>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardText>Origem: São Paulo-SP</CardText>
              </CardColumn>
              <CardColumn>
                <CardText>Destino: Curitiba-PR</CardText>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardText>Tempo Total: 16h14m49s</CardText>
              </CardColumn>
              <CardColumn>
                <CardText>Pontos PX: 60</CardText>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <TouchableOpacity onPress={handleNavigateTripDetail}>
                  <CardTextDetalhes>MAIS DETALHES</CardTextDetalhes>
                </TouchableOpacity>
              </CardColumn>
            </CardHeader>
          </Card>
        </Container>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 14,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  },
  header: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 14,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },

  cardStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },

  itemsContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 16
  },

  item: {
    backgroundColor: "#CF2A27",
    borderWidth: 2,
    borderColor: "#000",
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center"
  },

  selectedItem: {
    borderColor: "#34CB79",
    borderWidth: 2
  },

  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 19,
    color: "#fff"
  },
  viewSize: {
    height: "100%",
    backgroundColor: "#fbd762"
  }
});

export default Trip;
