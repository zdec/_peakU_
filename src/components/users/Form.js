/**********************************************************
*************************USERS JS**************************
***********************************************************
* @function: Archivo de Users Aplicación PeakU
* @U]usersjs : Users View Expo & React Native
* @author: Daniel Eduardo Ciro
* @date: 16/09/2022
**********************************************************
**********************************************************/
//Import React
import React, { useState, useEffect, useContext } from 'react';
//Import React Native
import { View, Dimensions, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, ToastAndroid } from "react-native";
//Import Components Ui
import {
	Layout,
	themeColor,
	Text,
	TextInput,
	Section,
	SectionContent,
	useTheme,
	Avatar
} from "react-native-rapi-ui";
//Import Ion Icons
import { Ionicons  } from "@expo/vector-icons";


//Export Users View Structure
export default function ({ navigation }) {

	const { isDarkmode } = useTheme();
	

	return (
	  <Layout>
		{/* Users View */}
		<View style={styles.container}>
			<Text>New Users</Text>
		</View>
	  </Layout>
	);
}

const windowWidth100 = (Dimensions.get('window').width);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		marginHorizontal: 0,
	},
		
});
