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
  Title
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

const NewTrip = () => {

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

  function goNavigateCurrentTrip () {
    navigation.navigate("TripCurrent");
  }
  function handleNavigateBack () {
    navigation.goBack();
  }

  return (
    <>
      <Logo></Logo>
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <ScrollView
        style={styles.viewSize}
        >
          <View style={styles.header}>
              <TouchableOpacity onPress={handleNavigateBack}>
                <Icon name="arrow-left" size={48} color="#000" />
              </TouchableOpacity>
              <Title>Nova Viagem</Title>
              <Text></Text>
            </View>
          <Container>
        
            <Form ref={formRef} onSubmit={goNavigateCurrentTrip}>
              <Input
                autoCapitalize="words"
                keyboardType="default"
                name="origem"
                icon="map-pin"
                placeholder="Origem"
                returnKeyType="next"
                onSubmitEditing={() => {
                  destinoInputRef.current?.focus();
                }}
              />
              <Input
                ref={destinoInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                name="destino"
                icon="map-pin"
                placeholder="Destino"
                returnKeyType="next"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Iniciar Viagem
              </Button>
            </Form>
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
    backgroundColor: "#fbd762",
    
  },
  viewSize:{
    height:'100%',
    backgroundColor: "#fbd762",
  }
});


export default NewTrip;
