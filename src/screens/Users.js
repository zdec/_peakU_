/**********************************************************
*************************USERS JS**************************
***********************************************************
* @function: Archivo de Users Aplicación PeakU
* @usersjs : Users View Expo & React Native
* @author: Daniel Eduardo Ciro
* @date: 16/09/2022
**********************************************************
**********************************************************/
//Import React
import React, { useState, useEffect } from 'react';
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
//Import for Popup Menu
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';


//Export Users View Structure
export default function ({ navigation }) {

	const { isDarkmode } = useTheme();

	//State by All Users
    const [allUsers, setallUsers] = useState([]);

    //Visible Menus
    let mainMenu = [];

	const hideMenu = (item) => {
		mainMenu[item].hide();
	};

	const showMenu = (item) => {
		mainMenu[item].show();
	};

    //Render Items User
    const RenderItemUser = ({item}) => (
		<Section>
			<SectionContent style={styles.users} >
				<TouchableOpacity style={styles.userrow} >
					<View style={styles.textrow}>
						<Text style={styles.name} numberOfLines={1}>@{item.username.toLowerCase()}</Text>
						<Text style={{color: themeColor.gray300, maxWidth: (Dimensions.get('window').width*0.8)}} numberOfLines={5}>{item.name}</Text>
					</View>
				</TouchableOpacity>
				<View style={{width: 50, alignItems: "center", marginLeft:3}}>
					<Menu
                        ref={(menu) => { mainMenu[item.id] = menu }}
						anchor={<Ionicons name="ellipsis-horizontal-outline" onPress={()=>{showMenu(item.id)}} size={25} color={isDarkmode ? themeColor.success : themeColor.primary400} />}
						onRequestClose={()=>{hideMenu(item.id)}}
						style={{backgroundColor: isDarkmode ? themeColor.dark : themeColor.white}}
					>
						
						<MenuItem onPress={() => {updatePost(item)}}>
							<Text style={{color: isDarkmode ? themeColor.white : themeColor.dark}}> Actualizar </Text>
						</MenuItem>
						<MenuDivider />
						<MenuItem onPress={() => {deletePost(item)}}>
							<Text style={{color: isDarkmode ? themeColor.white : themeColor.dark}}> Eliminar </Text>
						</MenuItem>
					</Menu>	
				</View>
			</SectionContent>
		</Section>
	)

    //Function Get All Users
    const getAllUsers = async () => {
        let url = 'https://jsonplaceholder.typicode.com/users'
        await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => setallUsers(json))
    }
	
    //Load Data Users
    useEffect(()=> {
		getAllUsers()
	},[])
	

	return (
		<Layout>
		{/* Top Navigator Users */}
		<TopNav
			rightContent={
				<Ionicons name="add-outline" size={20} color={isDarkmode ? themeColor.white200 : "#000000"} />
			}
			rightAction={() => navigation.navigate("NewUsersScreen")}
			leftContent="New Users"
        	leftTextStyle={{width: 200}}
		/>
		{/* Posts View */}
		<View style={styles.container}>
			{allUsers.length > 0 ? (
                <FlatList
                    data={allUsers}
                    renderItem={({ item }) => <RenderItemUser item={item} />}
                    keyExtractor={item => item.id}
                />
            ):(
                <View style={styles.contentNotData}>
                    <Ionicons
                        name="people-outline"
                        size={48}
                        color={isDarkmode ? themeColor.white200 : "grey"}
                    />
                    <Text style={{color:isDarkmode ? themeColor.white200 : "grey"}}>
                        Don't have Users. 
                    </Text>
                </View>
            )}
		</View>
	  </Layout>
	);
}

const windowWidth100 = (Dimensions.get('window').width);
const windowWidth80 = ((Dimensions.get('window').width)*0.8);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		marginHorizontal: 0,
	},
	contentNotData: {
		flex:1,
		flexDirection:'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	users: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: 'center',
		alignContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: themeColor.white100,
        width: windowWidth100,
	},
	userrow: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	textrow: {
		flex: 1,
		flexDirection: "column",
		paddingLeft: 10
	},
	name: {
		maxWidth: windowWidth80,
		overflow: "hidden",
        fontSize: 20,
        fontWeight: 'bold'
	},
		
});