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

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignUpFormData {
  name: string;
  phone: string;
  cpf: string;
  nascimento: string;
  apelido: string;
  password: string;
}

const TripPoints = () => {

  const destinoInputRef = useRef<TextInput>(null);

  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          password: Yup.string().min(6, 'Password must have at least 6 digits'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        //	await api.post('users', data);

        Alert.alert('Account successfully created!', 'Now you can login');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          'Registration Error',
          'An error ocurred when trying to sign up',
        );
      }
    },
    [navigation],
  );

  function goNavigatePoints () {
    navigation.navigate("Points");
  }
  function handleNavigateBack () {
    navigation.goBack();
  }

  return (
    <>
      <Logo></Logo>
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <ScrollView
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={handleNavigateBack}>
              <Icon name="arrow-left" size={25} color="#000" />
            </TouchableOpacity>
            <Title>Pontos da Viagem</Title>
            <Text></Text>
          </View>
          <Container>
            <Card>
              <CardHeader>
                <CardColumn>
                  <CardText>Viagem Finalizada</CardText>
                </CardColumn>
                <CardColumn>
                  <CardText>Data: 20/06/2020 20:01:49</CardText>
                </CardColumn>
              </CardHeader>
              <CardHeader>
                <CardColumn>
                  <CardText>Pontos PX: 5</CardText>
                </CardColumn>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardColumn>
                  <CardText>Viagem Finalizada</CardText>
                </CardColumn>
                <CardColumn>
                  <CardText>Data: 20/06/2020 20:01:49</CardText>
                </CardColumn>
              </CardHeader>
              <CardHeader>
                <CardColumn>
                  <CardText>Pontos PX: 5</CardText>
                </CardColumn>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardColumn>
                  <CardText>Viagem Finalizada</CardText>
                </CardColumn>
                <CardColumn>
                  <CardText>Data: 20/06/2020 20:01:49</CardText>
                </CardColumn>
              </CardHeader>
              <CardHeader>
                <CardColumn>
                  <CardText>Pontos PX: 5</CardText>
                </CardColumn>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardColumn>
                  <CardText>Viagem Finalizada</CardText>
                </CardColumn>
                <CardColumn>
                  <CardText>Data: 20/06/2020 20:01:49</CardText>
                </CardColumn>
              </CardHeader>
              <CardHeader>
                <CardColumn>
                  <CardText>Pontos PX: 5</CardText>
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
});


export default TripPoints;
