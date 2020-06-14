import React from "react";
import { Image, StyleSheet } from "react-native";
import { RectButtonProperties } from "react-native-gesture-handler";

import { Container, ButtonText } from "./styles";

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}
  style={styles.shadow}
  >
    <ButtonText>{children}</ButtonText>
  </Container>
);

const styles = StyleSheet.create({
  logo: {
    width: 278,
    height: 68
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24
  }
});


export default Button;
