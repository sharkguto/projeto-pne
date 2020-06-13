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
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../components/Logo";

import {
  Container,
  Title,
  Card,
  News,
  CardNews
} from "./styles";


const DashBoard = () => {

  const navigation = useNavigation();
  
  function handleNavigateTrip () {
    navigation.navigate("Trip");
  }
  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <>
          <Logo></Logo>      
          <ScrollView>
          <Container>                      
            <View>
              <Title>Bem vindo usuário!</Title>
            </View>
            <Card>
              <TouchableOpacity onPress={handleNavigateTrip} style={styles.item}>
              <Icon name="road" size={30} color="#fff" />
              <Text style={styles.itemTitle}>Viagens</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Icon name="tools" size={30} color="#fff" />
              <Text style={styles.itemTitle}>Serviços Próximos</Text>
            </TouchableOpacity>
            </Card> 
            <Card>
              <TouchableOpacity style={styles.item}>
              <Icon name="truck" size={30} color="#fff" />
              <Text style={styles.itemTitle}>Meus Veículos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Icon name="user" size={30} color="#fff" />
              <Text style={styles.itemTitle}>Meu Perfil</Text>
            </TouchableOpacity>
            </Card>
            <Card>
              <TouchableOpacity style={styles.item}>
              <Icon name="envelope" size={30} color="#fff" />
              <Text style={styles.itemTitle}>Chat PX</Text>
            </TouchableOpacity>
            </Card>   
            <CardNews>
              <News>Faça exercícios sempre que puder!</News>
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
    marginBottom: 16,
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
    textAlign: "center",
  },

  selectedItem: {
    borderColor: "#34CB79",
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 19,
    color: "#fff"
  },
});


export default DashBoard;
