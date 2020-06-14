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

const Vehicle = () => {
  const navigation = useNavigation();

  function handleNavigateNewVehicle() {
    navigation.navigate("VehicleNew");
  }
  function handleNavigateVehicleDetail() {
    navigation.navigate("VehicleNew");
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <>
      <Logo></Logo>
      <ScrollView
      style={styles.viewSize}
      >
        <Container>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleNavigateBack}>
              <Icon name="arrow-left" size={25} color="#000" />
            </TouchableOpacity>
            <Title>Meus Veículos</Title>
            <Text></Text>
          </View>
          <View style={styles.itemsContainer}></View>
          <Card>
            <CardHeader>
              <CardColumn>
                <CardText>Apelido: Grandão</CardText>
              </CardColumn>
              <CardColumn>
                <TouchableOpacity onPress={handleNavigateVehicleDetail}>
                  <Icon name="edit" size={20} color="#000" />
                </TouchableOpacity>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardText>Placa: XXX-3333</CardText>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardText>Licenciamento: 12/2019</CardText>
              </CardColumn>
              <CardColumn>
                <Icon name="check" size={20} color="#019533" />
              </CardColumn>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardColumn>
                <CardText>Apelido: Grandão</CardText>
              </CardColumn>
              <CardColumn>
                <TouchableOpacity onPress={handleNavigateVehicleDetail}>
                  <Icon name="edit" size={20} color="#000" />
                </TouchableOpacity>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardText>Placa: XXX-3333</CardText>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardText>Licenciamento: 12/2019</CardText>
              </CardColumn>
              <CardColumn>
                <Icon name="check" size={20} color="#019533" />
              </CardColumn>
            </CardHeader>
          </Card>
          <Button onPress={handleNavigateNewVehicle}>
            Adicionar novo veículo
          </Button>
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

  viewSize: {
    height: "100%",
    backgroundColor: "#fbd762"
  },

  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 19,
    color: "#fff"
  }
});

export default Vehicle;
