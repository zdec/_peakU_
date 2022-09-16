/**********************************************************
*********************APPNAVIGATOR JS***********************
***********************************************************
* @function: Archivo de navegacion de la Aplicación Prueba PeakU
* @appnavigatorjs : Rutas Expo & React Native
* @author: Daniel Eduardo Ciro
* @date: 16/09/2022
**********************************************************
**********************************************************/

//Import React
import React, { useContext, useEffect } from "react";

//Import Navigators
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Import Theme
import { Text, themeColor, useTheme } from "react-native-rapi-ui";

//Import Ion Icons
import { Ionicons  } from "@expo/vector-icons";

//Import Screens
import Posts from "../screens/Posts";
import NewPosts from "../components/posts/Form";
import Users from "../screens/Users";
import NewUsers from "../components/users/Form";


//Create Stack Navigator
const MainStack = createStackNavigator();
//Initial Main Function
const Main = () => {
  
  return (
    <MainStack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Defined View's */}
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="PostsScreen" component={Posts} />
      <MainStack.Screen name="NewPostsScreen" component={NewPosts} />
      <MainStack.Screen name="UsersScreen" component={Users} />
      <MainStack.Screen name="NewUsersScreen" component={NewUsers} />
    </MainStack.Navigator>
  );
};

//Create Tab Navigator
const Tabs = createBottomTabNavigator();
//MainTabs Function
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        adaptive: true,
        safeAreaInset: {
          bottom: "always"
        },
        style: {
          borderTopWidth: 1,
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
          height: 55,
          alignContent: "center",
          alignItems: "center"
        },
      }}
    >
      
      {/* Post View */}
      <Tabs.Screen
        name="Posts"
        component={Posts}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
                fontWeight="bold"
                style={{
                    marginBottom: 5,
                    color: focused
                    ? isDarkmode
                        ? themeColor.white100
                        : themeColor.primary
                    : "rgb(143, 155, 179)",
                    fontSize: 10,
                }}
                >
                Posts
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
                name="clipboard-outline"
                style={{ marginBottom: -7 }}
                size={24}
                color={
                    focused
                    ? isDarkmode
                        ? themeColor.white100
                        : themeColor.primary
                    : "rgb(143, 155, 179)"
                }
            />
          ),
        }}
      />

     {/* User View */}
     <Tabs.Screen
        name="Users"
        component={Users}
        options={{
            tabBarLabel: ({ focused }) => (
              <Text
                  fontWeight="bold"
                  style={{
                      marginBottom: 5,
                      color: focused
                      ? isDarkmode
                          ? themeColor.white100
                          : themeColor.primary
                      : "rgb(143, 155, 179)",
                      fontSize: 10,
                  }}
                  >
                  Users
              </Text>
            ),
            tabBarIcon: ({ focused }) => (
              <Ionicons
                  name="people-outline"
                  style={{ marginBottom: -7 }}
                  size={24}
                  color={
                      focused
                      ? isDarkmode
                          ? themeColor.white100
                          : themeColor.primary
                      : "rgb(143, 155, 179)"
                  }
              />
            ),
          }}
      />
      
    </Tabs.Navigator>
  );
};

export default () => {

	return (
        <NavigationContainer>
            <Main />
        </NavigationContainer>
	);
};