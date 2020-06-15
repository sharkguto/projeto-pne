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

const SingUp = () => {

  const phoneInputRef = useRef<TextInput>(null);
  const cpfInputRef = useRef<TextInput>(null);
  const nascimentoInputRef = useRef<TextInput>(null);
  const apelidoInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
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
    navigation.navigate("DashBoard");
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
                <Icon name="arrow-left" size={48} color="#000" />
              </TouchableOpacity>
              <Title>Nova Conta</Title>
              <Text></Text>
            </View>
          <Container>
            {/* <Image source={logoImg} /> */}

            

            <Form ref={formRef} onSubmit={goNavigatePoints}>
              <Input
                autoCapitalize="words"
                keyboardType="default"
                name="name"
                icon="user"
                placeholder="Seu Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  phoneInputRef.current?.focus();
                }}
              />
              <Input
                ref={phoneInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="phone-pad"
                name="phone"
                icon="phone"
                placeholder="Seu Celular"
                returnKeyType="next"
                onSubmitEditing={() => {
                  cpfInputRef.current?.focus();
                }}
              />
              <Input
                ref={cpfInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                name="cpf"
                icon="file-text"
                placeholder="Seu CPF"
                returnKeyType="next"
                onSubmitEditing={() => {
                  nascimentoInputRef.current?.focus();
                }}
              />
              <Input
                ref={nascimentoInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                name="nascimento"
                icon="calendar"
                placeholder="Sua Data de Nascimento"
                returnKeyType="next"
                onSubmitEditing={() => {
                  apelidoInputRef.current?.focus();
                }}
              />
              <Input
                ref={apelidoInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                name="apelido"
                icon="user"
                placeholder="Seu Apelido"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Sua senha"
                returnKeyType="send"
                ref={passwordInputRef}
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Cadastrar
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
    backgroundColor: "#fbd762"
  },
});


export default SingUp;
