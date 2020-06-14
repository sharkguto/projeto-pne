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

import { Container, Title, Card, News, CardNews } from "./styles";

const DashBoard = () => {
  const navigation = useNavigation();

  function handleNavigateTrip() {
    navigation.navigate("Trip");
  }

  function handleNavigateServico() {
    navigation.navigate("Servico");
  }

  function handleNavigateVehicle() {
    navigation.navigate("Vehicle");
  }

  function handleNavigatePerfil() {
    navigation.navigate("Perfil");
  }

  function handleNavigateLogout() {
    navigation.navigate("Login");
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
          <View>
            <Title></Title>
          </View>
          <Card>
            <TouchableOpacity onPress={handleNavigateTrip} style={styles.item}>
              <Icon name="road" size={48} color="#fff" />
              <Text style={styles.itemTitle}>Viagens</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNavigateServico}
              style={styles.item}
            >
              <Icon name="tools" size={48} color="#fff" />
              <Text style={styles.itemTitle}>Serviços Próximos</Text>
            </TouchableOpacity>
          </Card>
          <Card>
            <TouchableOpacity
              onPress={handleNavigateVehicle}
              style={styles.item}
            >
              <Icon name="truck" size={48} color="#fff" />
              <Text style={styles.itemTitle}>Meus Veículos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNavigatePerfil}
              style={styles.item}
            >
              <Icon name="user" size={48} color="#fff" />
              <Text style={styles.itemTitle}>Meu Perfil</Text>
            </TouchableOpacity>
          </Card>
          <Card>
            <TouchableOpacity style={styles.item}>
              <Icon name="envelope" size={48} color="#fff" />
              <Text style={styles.itemTitle}>Chat PX</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNavigateLogout}
              style={styles.item}
            >
              <Icon name="sign-out-alt" size={48} color="#fff" />
              <Text style={styles.itemTitle}>Sair</Text>
            </TouchableOpacity>
          </Card>

          <CardNews>
            <News></News>
          </CardNews>
        </Container>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 16
  },

  viewSize: {
    height: "100%",
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
    height: 140,
    width: 140,
    borderRadius: 1,
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
  }
});

export default DashBoard;
