import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SingUp from "./pages/SingUp";
import DashBoard from "./pages/DashBoard";
import Trip from "./pages/Trip";
import Servico from "./pages/Servico";
import Detail from "./pages/Detail";
import NewTrip from "./pages/NewTrip";
import TripDetail from "./pages/TripDetail";
import TripPoints from "./pages/TripPoints";
import Vehicle from "./pages/Vehicle";
import VehicleNew from "./pages/VehicleNew";
import Perfil from "./pages/Perfil";
import TripCurrent from "./pages/TripCurrent";
import TripFinishStop from "./pages/TripFinishStop";
import TripStartStop from "./pages/TripStartStop";
import Stretching from "./pages/Stretching";
import ChatPx from "./pages/ChatPx";
import ChatPxComunidade from "./pages/ChatPxComunidade";
import ChatPxComunidadeRank from "./pages/ChatPxComunidadeRank";

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
        <AppStack.Screen name="Detail" component={Detail} />
        <AppStack.Screen name="NewTrip" component={NewTrip} />
        <AppStack.Screen name="TripDetail" component={TripDetail} />
        <AppStack.Screen name="TripPoints" component={TripPoints} />
        <AppStack.Screen name="Vehicle" component={Vehicle} />
        <AppStack.Screen name="VehicleNew" component={VehicleNew} />
        <AppStack.Screen name="Perfil" component={Perfil} />
        <AppStack.Screen name="TripCurrent" component={TripCurrent} />
        <AppStack.Screen name="TripFinishStop" component={TripFinishStop} />
        <AppStack.Screen name="TripStartStop" component={TripStartStop} />
        <AppStack.Screen name="Stretching" component={Stretching} />
        <AppStack.Screen name="ChatPx" component={ChatPx} />
        <AppStack.Screen name="ChatPxComunidade" component={ChatPxComunidade} />
        <AppStack.Screen name="ChatPxComunidadeRank" component={ChatPxComunidadeRank} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
