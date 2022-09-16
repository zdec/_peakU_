/**********************************************************
**************************APP JS***************************
***********************************************************
* @function: Archivo de inicio de la Aplicación Prueba PeakU
* @appjs : Inicio Aplicación Expo & React Native
* @author: Daniel Eduardo Ciro
* @date: 16/09/2022
**********************************************************
**********************************************************/
//Import React
import React from "react";

//Import AppNavigator
import AppNavigator from "./src/navigation/AppNavigator";

//Import Theme Ui
import { ThemeProvider } from "react-native-rapi-ui";

//Initial App
export default function App(props) {
  return (
    <ThemeProvider>
        <AppNavigator />
    </ThemeProvider>
  );
}