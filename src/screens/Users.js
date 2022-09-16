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
import { View, Dimensions, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
//Import Components Ui
import {
	Layout,
	TopNav,
	themeColor,
	Text,
	Section,
	SectionContent,
	useTheme
} from "react-native-rapi-ui";
//Import Ion Icons
import { Ionicons  } from "@expo/vector-icons";
//Import for Popup Menu
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
//Import AwesomeAlert
import AwesomeAlert from 'react-native-awesome-alerts';


//Export Users View Structure
export default function ({ navigation }) {

	const { isDarkmode } = useTheme();

	//Loader Activity
	const [loading, setLoading] = useState(true);

	//State by All Users
    const [allUsers, setallUsers] = useState([]);
	
	//Action Delete Progress
    const [actionProgress, setActionProgress] = useState(false);
    const [showAlertSession, setShowAlertSession] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);

    const hideAlert = () => {
		setShowAlertSession(false)
	};

    //Visible Menus
    let mainMenu = [];

	const hideMenu = (item) => {
		mainMenu[item].hide();
	};

	const showMenu = (item) => {
		mainMenu[item].show();
	};

	//Update User Item
    const updateUser = (item) => {
		hideMenu(item.id)
        navigation.navigate("NewUsersScreen")
    }

    //Activate Message Alert
    const confirmDelete = (item) => {
        setItemSelected(item.id)
		setShowAlertSession(true)
	}

    //Deletre User Item
    const deleteUser = async () => {
        //Activate Loader
        setActionProgress(true)
        let idUser = itemSelected
        let url = 'https://jsonplaceholder.typicode.com/users/'+idUser
        
        await fetch(url, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(json => {
            //Set Loader
			setActionProgress(false)
            setShowAlertSession(false)
        })
    }

    //Render Items User
    const RenderItemUser = ({item}) => (
		<Section>
			<SectionContent style={styles.users} >
				<TouchableOpacity style={styles.userrow} >
					<View style={styles.textrow}>
						<Text style={styles.name} numberOfLines={1}>@{item.username.toLowerCase()}</Text>
						<Text style={styles.userdata} numberOfLines={1}>{item.name}</Text>
						<Text style={styles.userdata} numberOfLines={1}>{item.email}</Text>
						<Text style={styles.userdataphone} numberOfLines={1}>{item.phone}</Text>
					</View>
				</TouchableOpacity>
				<View style={{width: 50, alignItems: "center", marginLeft:3}}>
					<Menu
                        ref={(menu) => { mainMenu[item.id] = menu }}
						anchor={<Ionicons name="ellipsis-horizontal-outline" onPress={()=>{showMenu(item.id)}} size={25} color={isDarkmode ? themeColor.success : themeColor.dark} />}
						onRequestClose={()=>{hideMenu(item.id)}}
						style={{backgroundColor: isDarkmode ? themeColor.dark : themeColor.white}}
					>
						
						<MenuItem onPress={() => {updateUser(item)}}>
							<Text style={{color: isDarkmode ? themeColor.white : themeColor.dark}}> Update </Text>
						</MenuItem>
						<MenuDivider />
						<MenuItem onPress={() => {confirmDelete(item)}}>
							<Text style={{color: isDarkmode ? themeColor.white : themeColor.dark}}> Delete </Text>
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
        .then(json => {
			//Load Data
			setallUsers(json)
			//Set Loader
			setLoading(false)
		})
    }
	
    //Load Data Users
    useEffect(()=> {
		getAllUsers()
	},[])
	
	//Return View Users
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
		{/* Users View */}
		<View style={styles.container}>
			{loading ? (
				<ActivityIndicator color="#3366FF" size={40} style={{flex:1, justifyContent:'center'}}/>
			) : (
				<>
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
				</>
			)}
		</View>

		<AwesomeAlert
			show={showAlertSession}
			showProgress={false}
			closeOnTouchOutside={false}
			closeOnHardwareBackPress={false}
			customView={
				<View>
					{actionProgress ? (
						<View>
							<View>
								<ActivityIndicator color="#3366FF" size={40}/>
							</View>
							<View>
								<Text style={{color: 'grey'}}>Loading...</Text>
							</View>
						</View>
					):(
						<View style={styles.contentContainerAlert}>
							<View style={styles.contentAlert}>
								<Text style={styles.titleAlert}>{"Confirm"}</Text>
								<Text style={styles.messageAlert}>{"Delete user?"}</Text>
							</View>
							<View style={styles.actionAlert}>
								<TouchableOpacity onPress={() => {hideAlert()}}>
									<View style={[styles.buttonAlert,{backgroundColor: '#D0D0D0'}]}>
										<Text style={styles.buttonTextAlert}>Cancel</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {deleteUser()}}>
									<View style={[styles.buttonAlert,{backgroundColor: '#DD6B55'}]}>
										<Text style={styles.buttonTextAlert}>Accept</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</View>
			}
			onDismiss={() => {

			}}
		/>
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
        fontWeight: 'bold',
		marginBottom: 5
	},
	userdata: {color: themeColor.gray300, maxWidth: windowWidth80},
	userdataphone: {color: themeColor.gray300, maxWidth: windowWidth80, textDecorationLine: 'underline'},
	contentContainerAlert: {
		backgroundColor: 'white',
	},
	contentAlert: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	actionAlert: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginTop: 5
	},
	titleAlert: {
		paddingVertical: 5,
		paddingHorizontal: 15,
		color: '#626262',
		fontSize: 18
	},
	messageAlert: {
		paddingTop: 5,
		color: '#7b7b7b',
		fontSize: 14
	},
	buttonAlert: {
		paddingHorizontal: 10,
		paddingVertical: 7,
		margin: 5,
		borderRadius: 5
	},
	buttonTextAlert: {
		color: '#fff',
		fontSize: 13
	},
		
});