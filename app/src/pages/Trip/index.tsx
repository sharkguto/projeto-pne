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
  TripList
} from "./styles";
import Constants from "expo-constants";


const Trip = () => {

  const navigation = useNavigation();
  
  function goNavigatePoints () {
    navigation.navigate("Points");
  }
  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <>
          <Logo></Logo>      
          <ScrollView>
          <Container>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleNavigateBack}>
                  <Icon name="arrow-left" size={25}  color="#000" />
              </TouchableOpacity>            
              <Title>Viagens</Title>
              <Text></Text>
            </View>
            
            <Button>
             Continuar Viagem
            </Button>
            <Button>
             Nova Viagem
            </Button>
            <View style={styles.container}>              
            <Title>Histório de Viagens</Title> 
            </View>                          
            
            <TripList></TripList>
                     
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


export default Trip;
