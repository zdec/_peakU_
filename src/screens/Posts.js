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


//Export Posts View Structure
export default function ({ navigation }) {

	const { isDarkmode } = useTheme();

    //State by All Posts
    const [allPosts, setallPosts] = useState([]);

    //Visible Menus
    let mainMenu = [];

	const hideMenu = (item) => {
		mainMenu[item].hide();
	};

	const showMenu = (item) => {
		mainMenu[item].show();
	};

    //Render Items Post
    const RenderItemPost = ({item}) => (
		<Section>
			<SectionContent style={styles.posts} >
				<TouchableOpacity style={styles.postrow} >
					<View style={styles.textrow}>
						<Text style={styles.name} numberOfLines={1}>{item.title}</Text>
						<Text style={{color: themeColor.gray300, maxWidth: (Dimensions.get('window').width*0.8)}} numberOfLines={5}>{item.body}</Text>
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

    //Function Get All Posts
    const getAllPosts = async () => {
        let url = 'https://jsonplaceholder.typicode.com/posts'
        await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => setallPosts(json))
    }
	
    //Load Data Posts
    useEffect(()=> {
		getAllPosts()
	},[])

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
			{allPosts.length > 0 ? (
                <FlatList
                    data={allPosts}
                    renderItem={({ item }) => <RenderItemPost item={item} />}
                    keyExtractor={item => item.id}
                />
            ):(
                <View style={styles.contentNotData}>
                    <Ionicons
                        name="clipboard-outline"
                        size={48}
                        color={isDarkmode ? themeColor.white200 : "grey"}
                    />
                    <Text style={{color:isDarkmode ? themeColor.white200 : "grey"}}>
                        Don't have Posts. 
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
	posts: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: 'center',
		alignContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		backgroundColor: themeColor.white100,
        width: windowWidth100,
	},
	postrow: {
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
