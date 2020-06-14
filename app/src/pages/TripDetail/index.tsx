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
  CardText
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

const TripDetail = () => {
  const destinoInputRef = useRef<TextInput>(null);

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Name is required"),
          password: Yup.string().min(6, "Password must have at least 6 digits")
        });

        await schema.validate(data, {
          abortEarly: false
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
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <ScrollView style={styles.viewSize}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleNavigateBack}>
              <Icon name="arrow-left" size={25} color="#000" />
            </TouchableOpacity>
            <Title>Detalhes da Viagem</Title>
            <Text></Text>
          </View>
          <Container>
            <Card style={styles.shadow}>
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
                  <TouchableOpacity onPress={handleNavigatePoints}>
                    <Icon name="search" size={25} color="#000" />
                  </TouchableOpacity>
                </CardColumn>
              </CardHeader>
              <CardHeader>
                <CardColumn>
                  <CardText>Tempo Total de Descanćo: 3h14m02s</CardText>
                </CardColumn>
              </CardHeader>
              <CardHeader>
                <CardColumn>
                  <CardText>Total de Paradas: 1</CardText>
                </CardColumn>
              </CardHeader>
            </Card>
            <Card style={styles.shadow}>
              <CardHeader>
                <CardColumn>
                  <CardText>Check-In de Parada</CardText>
                </CardColumn>
                <CardColumn>
                  <CardText>20/06/2020 às 12:22:01</CardText>
                </CardColumn>
              </CardHeader>
              <CardHeader>
                <CardColumn>
                  <CardText>Ponto: Posto Graal KM xxx</CardText>
                </CardColumn>
              </CardHeader>
              <CardHeader>
                <CardColumn>
                  <CardText>Tempo de Permanência: 3h14m02s</CardText>
                </CardColumn>
              </CardHeader>
            </Card>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
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

export default TripDetail;
