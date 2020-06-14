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

const TripFinishStop = () => {
  const [isSelected, setSelection] = useState(false);


  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
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

  function handleNavigatePoints() {
    navigation.navigate("TripPoints");
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
          <Title>Encerrar Parada</Title>
          <Text></Text>
        </View>
        <Container>
          <Card>
            <CardHeader>
              <CardTitle>Tempo de Parada</CardTitle>
            </CardHeader>
            <CardHeader>
              <CardColumn>
                <CardTime>00d01h30m39s</CardTime>
              </CardColumn>
            </CardHeader>
          </Card>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Você realizou alguma refeição durante
esta parada?</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Você descansou/cochilou/dormiu?</Text>
          </View>
          <Button>Encerrar Parada</Button>
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

export default TripFinishStop;
