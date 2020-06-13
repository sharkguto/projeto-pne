import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  background: #fbd762;
  padding: 0 30px ${Platform.OS === "android" ? 40 : 40}px;
`;

export const Title = styled.Text`
  font-size: 21px;
  color: #000;
  font-family: "Roboto_400Regular";
  margin: 14px 0 14px;
`;

export const TripList = styled.Text`
  flex:1;
  justify-content: center;
  align-items:center;
  flex-direction:row;
`;
