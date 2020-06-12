import styled, { css } from "styled-components/native";
import FeatherIcon from "react-native-vector-icons/Feather";

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isFilled: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #f5f5f5;
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #616469;
  flex-direction: row;
  align-items: center;
  ${(props) =>
    props.isErrored &&
    !props.isFilled &&
    css`
      border-color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: "Roboto_400Regular";
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
