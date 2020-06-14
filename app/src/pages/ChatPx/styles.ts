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

export const BodyText = styled.Text`
  font-size: 18px;
  color: #000;
  font-family: "Roboto_400Regular";
  margin: 14px 0 14px;
  text-align: center;
`;

export const Card = styled.View`
 color: #000;
 font-family: "Roboto_400Regular";
 font-size: 14px;
 width: 100%;
 height: 100px;
 padding: 16px 16px;
 background: #f5f5f5;
 border-radius: 0px;
 margin-bottom: 25px;
 border-width: 2px;
 border-color: #616469;
`;

export const CardTitle = styled.Text`
  font-size: 20px;
  color: #000;
  font-family: "Roboto_400Regular";
  margin: 0px 0 7px;
`;

export const CardText = styled.Text`
  font-size: 14px;
  color: #000;
  font-family: "Roboto_400Regular";
  margin: 1px 0 1px;
`;

export const CardTextDetalhes = styled.Text`
  font-size: 12px;
  color: red;
  font-family: "Roboto_400Regular";
  margin: 1px 0 1px;
`;

export const CardHeader = styled.View`
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
  justify-content: space-between;
	align-items: flex-start;
	align-content: flex-start;
`;

export const ModalButtons = styled.View`
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
  justify-content: space-between;
	align-items: flex-start;
	align-content: flex-start;
`;

export const CardColumn = styled.View`
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-start;
  align-content: flex-start; 
  margin: 3px 0 3px; 
`;
