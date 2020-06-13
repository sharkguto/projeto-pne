import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import DashBoard from "./pages/DashBoard";
import Trip from "./pages/Trip";
import Servico from "./pages/Servico";

// roteamento da aplicação
const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: "#f0f0f5",
          },
        }}
      >
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="SingUp" component={SingUp} />
        <AppStack.Screen name="DashBoard" component={DashBoard} />
        <AppStack.Screen name="Trip" component={Trip} />
        <AppStack.Screen name="Servico" component={Servico} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
