import styled from "styled-components/native";
import { Platform } from "react-native";

export const Container = styled.View`
  flex: 1;
  background: #fbd762;
  padding: 0 30px ${Platform.OS === "android" ? 40 : 40}px;
`;

export const Card = styled.View`
 color: #000;
 font-family: "Roboto_400Regular";
 font-size: 14px;
 width: 100%;
 height: 80px;
 padding: 0 16px;
 background: #f5f5f5;
 border-radius: 0px;
 margin-bottom: 8px;
 border-width: 2px;
 border-color: #616469;
`;

export const CardHeader = styled.View`
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
  justify-content: space-between;
	align-items: flex-start;
	align-content: flex-start;
`;

export const CardHeadeTop = styled.View`
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
  justify-content: space-between;
	align-items: flex-start;
  align-content: flex-start;
  margin: 14px 0 7px; 
`;

export const StarsTop = styled.View`
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-start;
  align-content: flex-start; 
`;


export const Stars = styled.View`
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-start;
  align-content: flex-start; 
  margin: 14px 0 7px; 
`;

export const CardTitle = styled.Text`
  font-size: 16px;
  color: #000;
  font-family: "Roboto_400Regular";
  margin: 14px 0 7px;
`;

export const CardText = styled.Text`
  font-size: 12px;
  color: #000;
  font-family: "Roboto_400Regular";
  margin: 7px 0 7px;
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
