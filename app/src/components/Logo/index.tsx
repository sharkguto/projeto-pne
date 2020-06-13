import React from "react";
import {
  Image,
  StyleSheet} from "react-native";
import { RectButtonProperties } from "react-native-gesture-handler";

import { LogoBackground } from "./styles";

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Logo: React.FC = () => (
 <LogoBackground>
    <Image 
       source={require('../../assets/logo.png')}
       style={styles.logo}></Image>
 </LogoBackground>
);

const styles = StyleSheet.create({
  logo: {
    width: 278,
    height:68
  }
});

export default Logo;
