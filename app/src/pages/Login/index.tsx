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
  ImageBackground,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
  LogoBackground,
} from "./styles";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as Yup from 'yup';

interface SignInFormData {
	email: string;
	password: string;
}

const Home = () => {
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

 // const { signIn } = useAuth();
  // const handleSignIn = useCallback(
	// 	async (data: SignInFormData) => {
	// 		try {
	// 			formRef.current?.setErrors({});

	// 			const schema = Yup.object().shape({
	// 				email: Yup.string()
	// 					.required('Email is required')
	// 					.email('Type a valid email'),
	// 				password: Yup.string().required('Password is required'),
	// 			});

	// 			await schema.validate(data, {
	// 				abortEarly: false,
  //       });
        
  //      				// await signIn({
	// 			// 	email: data.email,
	// 			// 	password: data.password,
	// 			// });
	// 		} catch (err) {
	// 			if (err instanceof Yup.ValidationError) {
	// 				const errors = getValidationErrors(err);
	// 				formRef.current?.setErrors(errors);
	// 			}

	// 			Alert.alert(
	// 				'Authentication Error',
	// 				'An error ocurred when trying to signin. Check your credentials',
	// 			);
	// 		}
	// 	},
	// 	[],
	// );

  function goNavigateHome() {
    navigation.navigate("DashBoard");
  }

  return (
    <>         
      <KeyboardAvoidingView style={{ flex: 1 }} enabled> 
       <ImageBackground 
        source={require('../../assets/ccr.png')} 
        style={styles.container}
        imageStyle={{ width:415 , height: 896 }}
      >
       <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >  
          <Container>    
            <Logo/>
            <View
            style={styles.marginLogo}
            ></View>    
            <Form ref={formRef} onSubmit={goNavigateHome}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="phone-pad"
                name="phone"
                icon="phone"
                placeholder="Seu Celular"
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
                Entrar
              </Button>
            </Form>
            <ForgotPassword
              onPress={() => {
                console.log("cool");
              }}
            >
            </ForgotPassword>
          </Container>
        </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>

      <Button onPress={() => navigation.navigate("SingUp")}>
        <Icon name="log-in" size={20} color="#fff" />
        <CreateAccountButtonText> Criar Conta</CreateAccountButtonText>
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  marginLogo: {
    marginBottom:30
  }
});

export default Home;
