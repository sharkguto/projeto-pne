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
  Modal,
  TouchableHighlight,
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
  Card,
  CardHeader,
  CardText,
  CardColumn,
  CardTextDetalhes,
  BodyText,
  CardTitle,
  ModalButtons,
} from "./styles";
import Constants from "expo-constants";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";

interface Search {
  search: string;
}

const ChatPx = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const handleSignUp = useCallback(
    async (data: Search) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Name is required"),
          password: Yup.string().min(6, "Password must have at least 6 digits"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        //	await api.post('users', data);

        Alert.alert("Account successfully created!", "Now you can login");

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          "Registration Error",
          "An error ocurred when trying to sign up"
        );
      }
    },
    [navigation]
  );

 
  function handleNavigateNewVehicle() {
    navigation.navigate("VehicleNew");
  }
  function handleNavigateChatComunidade() {
    navigation.navigate("ChatPxComunidade");
  }

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <>
      <Logo></Logo>
      <ScrollView style={styles.viewSize}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Esta comunidade é protegida
para entrar, informe a senha:</Text>
            <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
               secureTextEntry
               name="password"
               placeholder="Sua senha"
               returnKeyType="send"
              icon="key"
            />
          </Form>
          <ModalButtons>
          <TouchableOpacity style={styles.openButton} onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.itemTitle}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.openButton} onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.itemTitle}>Cancelar</Text>
          </TouchableOpacity>
          </ModalButtons>          
          </View>
        </View>
      </Modal>
        <Container>
          <View style={styles.header}>
            <TouchableOpacity  onPress={handleNavigateBack}>
              <IconF name="arrow-left" size={48} color="#000" />
            </TouchableOpacity>
            <Title>Chat PX</Title>
            <Text></Text>
          </View>
          <View style={styles.itemsContainer}></View>
          <Form ref={formRef} onSubmit={handleSignUp}>
            <Input
              autoCapitalize="words"
              keyboardType="default"
              name="search"
              icon="search"
              placeholder="Buscar Comunidade"
              returnKeyType="next"
            />
          </Form>
          <BodyText>Comunidades</BodyText>
          <Card style={styles.shadow}>
            <CardHeader>
              <CardColumn>
                <CardTitle>São Paulo News #20392</CardTitle>
              </CardColumn>
              <CardColumn>
                <TouchableOpacity onPress={handleNavigateChatComunidade}>
                  <Icon name="arrow-right" size={20} color="#019533" />
                </TouchableOpacity>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <IconF name="user" size={20} color="#000" />
                <CardText>5382 Participantes</CardText>
              </CardColumn>
              <CardColumn>
                <IconF name="unlock" size={20} color="#000" />
              </CardColumn>
            </CardHeader>
          </Card>
          <Card style={styles.shadow}>
            <CardHeader>
              <CardColumn>
                <CardTitle>Galera do Trucão #1001</CardTitle>
              </CardColumn>
              <CardColumn>
                <TouchableOpacity onPress={handleNavigateChatComunidade}>
                  <Icon name="arrow-right" size={20} color="#019533" />
                </TouchableOpacity>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <IconF name="user" size={20} color="#000" />
                <CardText>51943 Participantes</CardText>
              </CardColumn>
              <CardColumn>
                <IconF name="unlock" size={20} color="#000" />
              </CardColumn>
            </CardHeader>
          </Card>
          <Card style={styles.shadow}>
            <CardHeader>
              <CardColumn>
                <CardTitle>Transportadora X #98927</CardTitle>
              </CardColumn>
              <CardColumn>
                <TouchableOpacity onPress={handleNavigateChatComunidade}>
                  <Icon name="arrow-right" size={20} color="#019533" />
                </TouchableOpacity>
              </CardColumn>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <IconF name="user" size={20} color="#000" />
                <CardText>100 Participantes</CardText>
              </CardColumn>
              <CardColumn>
                <TouchableOpacity onPress={() => {
          setModalVisible(true);
        }}>
                  <IconF name="lock" size={20} color="#000" />
                </TouchableOpacity>
              </CardColumn>
            </CardHeader>
          </Card>

          <Button onPress={handleNavigateNewVehicle}>
            Criar nova comunidade
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
    alignItems: "center",
  },
  itemsContainer: {
    flexDirection: "row",
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#fbd762",
  },
  header: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 14,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  viewSize: {
    height: "100%",
    backgroundColor: "#fbd762",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
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
    height: 40,
    width: 100,
    borderRadius: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  itemTitle: {
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
    fontSize: 16,
    color: "#fff"
  }
});

export default ChatPx;
