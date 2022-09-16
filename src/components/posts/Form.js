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

//Export Posts View Structure
export default function ({ navigation, route }) {

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
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	//Activate Message Alert
    const confirmCreate = () => {
		//Validate Inputs Form
		if(title !== '' && body !== '')
			setShowAlertSession(true)
		else
			showToast('Complete Form Please!')
	}

	//Create Post Item
    const createPost = async () => {
        //Activate Loader
        setActionProgress(true)
        let url = 'https://jsonplaceholder.typicode.com/posts'
        
        await fetch(url, {
            method: 'POST',
			body: JSON.stringify({
				title: title,
				body: body,
				userId: 1,
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
			setTitle('')
			setBody('')
        })
    }

	//Load Post Data
	const getPostData = async (idPost) => {
		let url = 'https://jsonplaceholder.typicode.com/posts/'+idPost
        
        await fetch(url)
        .then(response => response.json())
        .then(json => {
			//Reset Form
			setTitle(json.title)
			setBody(json.body)
        })
	}

	//Load Post by Update
	useEffect(()=> {
		let idPost = route.params.post.id
		if(idPost !== undefined)
			getPostData(idPost)
	},[route.params.post.id])

	return (
	  <Layout>
		{/* Posts View */}
		<View style={styles.container}>
			{/* Top Navigator Form Post */}
			<TopNav
				leftContent="New Post"
				leftTextStyle={{width: 200}}
			/>
			{/* Form Post */}
			<ScrollView>
				<Section>
					<SectionContent style={styles.form}>
						<Section style={styles.head}>
							<Text style={styles.labelTitle}>New Post Form</Text>
						</Section>
						<Section style={styles.input}>
							<Text style={styles.label}>Title</Text>
							<TextInput
								placeholder="Enter post title"
								multiline={true}
								minHeight={150}
								value={title}
								onChangeText={(val) => setTitle(val)}
							/>
						</Section>
						<Section style={styles.input}>
							<Text style={styles.label}>Body</Text>
							<TextInput
								placeholder="Enter post body"
								multiline={true}
								minHeight={350}
								value={body}
								onChangeText={(val) => setBody(val)}
							/>
						</Section>
						<Section style={styles.input}>
							<Button
								size="lg"
								text="Save"
								onPress={confirmCreate} 
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
								<Text style={styles.messageAlert}>{"Create post?"}</Text>
							</View>
							<View style={styles.actionAlert}>
								<TouchableOpacity onPress={() => {hideAlert()}}>
									<View style={[styles.buttonAlert,{backgroundColor: '#D0D0D0'}]}>
										<Text style={styles.buttonTextAlert}>Cancel</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => {createPost()}}>
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
		alignItems: "flex-start",
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
		maxHeight: windowHeight90
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
		marginBottom: 30
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
