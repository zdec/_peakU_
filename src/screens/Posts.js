/**********************************************************
*************************POSTS JS**************************
***********************************************************
* @function: Archivo de Posts Aplicación PeakU
* @postsjs : Posts View Expo & React Native
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
	TopNav,
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


//Export Posts View Structure
export default function ({ navigation }) {

	const { isDarkmode } = useTheme();
	

	return (
	  <Layout>
		{/* Top Navigator Posts */}
		<TopNav
			rightContent={
				<Ionicons name="add-outline" size={20} color={isDarkmode ? themeColor.white200 : "#000000"} />
			}
			rightAction={() => navigation.navigate("NewPostsScreen")}
			leftContent="New Posts"
        	leftTextStyle={{width: 200}}
		/>
		{/* Posts View */}
		<View style={styles.container}>
			<Text>Hola desde Posts</Text>
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
