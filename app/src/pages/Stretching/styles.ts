import styled from "styled-components/native";
import { Platform } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;
  background: #fbd762;
  height: 100%;
  padding: 0 30px ${Platform.OS === "android" ? 40 : 40}px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #000;
  font-family: "Roboto_400Regular";
  margin: 24px 0 24px;
`;

export const InfoText = styled.Text`
  font-size: 18px;
  color: #000;
  font-family: "Roboto_400Regular";
  margin: 12px 0 12px;
  text-align: center;
`;


export const TimeText = styled.Text`
  font-size: 32px;
  color: #000;
  font-family: "Roboto_400Regular";
  margin: 12px 0 12px;
  text-align: center;
  font-weight: bold;
`;

export const Card = styled.View`
 color: #000;
 font-family: "Roboto_400Regular";
 font-size: 14px;
 width: 100%;
 height: 160px;
 padding: 16px 16px;
 background: #fff;
 border-radius: 0px;
 margin-bottom: 8px;
 margin-top: 8px;
 border-width: 2px;
 border-color: #616469;
 display: flex;
	justify-content: center;
	align-items: center;
`;

export const CardTitle = styled.Text`
  font-size: 18px;
  color: #000;
  font-family: "Roboto_400Regular";
  margin: 0px 0 5px;
`;

export const CardTime = styled.Text`
  font-size: 32px;
  color: #000;
  font-family: "Roboto_400Regular";
  margin: 0px 0 5px;
`;

export const CardText = styled.Text`
  font-size: 12px;
  color: #000;
  font-family: "Roboto_400Regular";
  margin: 1px 0 1px;
`;

export const CardHeader = styled.View`
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
  justify-content: center;
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

export const Rota = styled.View`
  margin: 1px 0 10px; 
  display: flex;
  justify-content: center;
	align-items: center;
	align-content: center;
`;

export const BotaoContainer = styled.View`
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-items: center;
  align-content: center;
  padding-top: 20px;
`;

