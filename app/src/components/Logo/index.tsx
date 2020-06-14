import React from "react";
import { Image, StyleSheet } from "react-native";
import { RectButtonProperties } from "react-native-gesture-handler";

import { LogoBackground } from "./styles";

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Logo: React.FC = () => (
  <LogoBackground style={styles.logoBackground}>
    <Image
      source={require("../../assets/logo.png")}
      style={styles.logo}
    ></Image>
  </LogoBackground>
);

const styles = StyleSheet.create({
  logo: {
    width: 278,
    height: 68
  },
  logoBackground: {
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

export default Logo;
