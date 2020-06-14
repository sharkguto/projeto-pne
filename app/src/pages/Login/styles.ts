import styled from "styled-components/native";
import { Platform } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 10px ${Platform.OS === "android" ? 100 : 40}px;
  margin-top: 90px;
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
  background: #fff;
  border-top-width: 1px;
  border-color: #fff;
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

export const LogoBackground = styled.View`
  background: #fff;
  margin-top:30px;
  justify-content: center;
  align-items:center;
  flex-direction:row;
  padding: 10px;
`;

