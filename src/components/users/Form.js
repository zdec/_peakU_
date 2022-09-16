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
import React, { useState, useEffect } from 'react';
//Import React Native
import { View, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, ToastAndroid, ScrollView } from "react-native";
//Import Components Ui
import {
	Layout,
	TopNav,
	themeColor,
	Text,
	Button,
	TextInput,
	Section,
	SectionContent,
	useTheme
} from "react-native-rapi-ui";
//Import AwesomeAlert
import AwesomeAlert from 'react-native-awesome-alerts';

//Export Users View Structure
export default function ({ navigation }) {

	const { isDarkmode } = useTheme();

	//Message Android Toast
	const showToast = (message) => {
		ToastAndroid.show(message, ToastAndroid.SHORT);
	};

	//Action Delete Progress
    const [actionProgress, setActionProgress] = useState(false);
    const [showAlertSession, setShowAlertSession] = useState(false);

    const hideAlert = () => {
		setShowAlertSession(false)
	};

	//State Form
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [website, setWebsite] = useState('');

	//Activate Message Alert
    const confirmCreate = () => {
		//Validate Inputs Form
		if(username !== '' && name !== '' && email !== '' && phone !== '')
			setShowAlertSession(true)
		else
			showToast('Complete Form Please!')
	}

	//Create User Item
    const createUser = async () => {
        //Activate Loader
        setActionProgress(true)
        let url = 'https://jsonplaceholder.typicode.com/users'
        
        await fetch(url, {
            method: 'POST',
			body: JSON.stringify({
				username: username,
				name: name,
				email: email,
				phone: phone,
				website: website
			}),
			headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
            //Set Loader
			setActionProgress(false)
            setShowAlertSession(false)
			//Reset Form
			setUsername('')
			setName('')
			setEmail('')
			setPhone('')
			setWebsite('')
        })
    }
	

	return (
	  <Layout>
		{/* Users View */}
		<View style={styles.container}>
			{/* Top Navigator Form User */}
			<TopNav
				leftContent="New User"
				leftTextStyle={{width: 200}}
			/>
			{/* Form User */}
			<ScrollView>
				<Section>
					<SectionContent style={styles.form}>
						<Section style={styles.head}>
							<Text style={styles.labelTitle}>New User Form</Text>
						</Section>
						<Section style={styles.input}>
							<Text style={styles.label}>Username</Text>
							<TextInput
								placeholder="Enter username"
								value={username}
								onChangeText={(val) => setUsername(val)}
							/>
						</Section>
						<Section style={styles.input}>
							<Text style={styles.label}>Name</Text>
							<TextInput
								placeholder="Enter name"
								value={name}
								onChangeText={(val) => setName(val)}
							/>
						</Section>
						<Section style={styles.input}>
							<Text style={styles.label}>Email</Text>
							<TextInput
								placeholder="Enter email"
								value={email}
								onChangeText={(val) => setEmail(val)}
							/>
						</Section>
						<Section style={styles.input}>
							<Text style={styles.label}>Phone</Text>
							<TextInput
								placeholder="Enter phone"
								value={phone}
								onChangeText={(val) => setPhone(val)}
							/>
						</Section>
						<Section style={styles.input}>
							<Text style={styles.label}>Website</Text>
							<TextInput
								placeholder="Enter website"
								value={website}
								onChangeText={(val) => setWebsite(val)}
							/>
						</Section>
						<Section style={styles.input}>
							<Button
								size="lg"
								text="Save"
								onPress={confirmCreate}
								style={{marginTop: 20}}
							/>
						</Section>
					</SectionContent>
				</Section>
			</ScrollView>
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
								<Text style={styles.messageAlert}>{"Create user?"}</Text>
							</View>
							<View style={styles.actionAlert}>
								<TouchableOpacity onPress={() => {hideAlert()}}>
									<View style={[styles.buttonAlert,{backgroundColor: '#D0D0D0'}]}>
										<Text style={styles.buttonTextAlert}>Cancel</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {createUser()}}>
									<View style={[styles.buttonAlert,{backgroundColor: themeColor.primary}]}>
										<Text style={styles.buttonTextAlert}>Save</Text>
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
const windowHeight90 = ((Dimensions.get('window').height)*0.895);
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-start",
		marginHorizontal: 0,
	},
	contentContainerAlert: {
		backgroundColor: 'white',
	},
	contentAlert: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10
	},
	head: {
		alignItems: 'center'
	},
	form: {
		minWidth: windowWidth100,
		minHeight: windowHeight90
	},
	input: {
		marginTop: 10,
		marginBottom: 20
	},
	label: {
		marginLeft: 10,
		marginBottom: 10
	},
	labelTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 50
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
