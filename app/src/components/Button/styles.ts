import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #CF2A27;
  border-radius: 1px;
  margin-top: 8px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: "Roboto_400Regular";
  color: #fff;
  font-size: 18px;
`;
