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
  RankText,
  InfoText
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

const Perfil = () => {

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
              <Title>Meu Perfil</Title>
              <Text></Text>
            </View>
          <Container>
            <Image style={styles.profile} source={require('../../assets/perfil.jpg')}/>
            <RankText>PX Ranking: Posição #10</RankText>
            <InfoText>Ótimo trabalho! Continue melhorando!</InfoText>
            <Form ref={formRef} onSubmit={handleSignUp}>
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
                Editar meus dados
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
  profile: {
    borderRadius: 120,
    width:120,
    height:120,
    marginBottom:30
  }
});


export default Perfil;
