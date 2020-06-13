import styled from "styled-components/native";
import { Platform } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #fbd762;
  justify-content: center;
  padding: 0 30px ${Platform.OS === "android" ? 40 : 40}px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #000;
  font-family: "Roboto_400Regular";
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #000;
  font-size: 16px;
  font-family: "Roboto_400Regular";
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #9e260e;
  border-top-width: 1px;
  border-color: #9e260e;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: "Roboto_400Regular";
  margin-left: 16px;
`;
