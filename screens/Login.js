import React,{useState} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput, ScrollView,Alert } from 'react-native'
import { useFonts } from 'expo-font';
import { FontAwesome5,FontAwesome } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loaded] = useFonts({
        'Kanit': require('./font/Kanit-Light.ttf'),
        'Kanits': require('./font/Kanit-Light.ttf'),
      });
      
      if (!loaded) {
        return null;
      }

      const handlePress = () => {
        try {
            if (!email) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกอีเมล!');
            }
             else  if (!password) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่านใหม่!');
            } else if (password.length<6) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่านใหม่ 6ตัวขึ้นไป!');
            } else{
              fetch('https://app.rthouse.ml/login.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
          email: email,
       
          password: password
       
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
      
              if(responseJson.result === "success")
              {
                AsyncStorage.getItem('uid').then(value =>{
                  if (value == null){
                    AsyncStorage.setItem('uid',responseJson.user.id);
                    navigation.replace('Dashboard');
              }else{
                    navigation.replace('Dashboard');
              }
                //AsyncStorage.setItem("Email", email);
                });
              }
              else{
                Alert.alert('แจ้งเตือน!',responseJson.result);
              }
      // Showing response message coming from server after inserting records.
       //       Alert.alert(responseJson);
             // navigation.navigate('Profile');
            }).catch((error) => {
              console.log(error);
            });
              }
            } catch (err) {
              console.log(err);
          }
        }

      const GoogleLogin = async () => {
        console.log("LoginScreen.js 6 | loggin in");
        try {
          const { type, user } = await Google.logInAsync({
            //iosClientId: `<YOUR_IOS_CLIENT_ID>`,
            androidClientId: `456596461318-ieeg0vo0ava92k3cb8vkrjopv7fcdr78.apps.googleusercontent.com`,
          });
    
          if (type === "success") {
  
            try {
              fetch('https://app.rthouse.ml/login_google.php?id='+user.id)
              .then((response) => response.json()) 
              .then((responseJson) => {
                console.log(user)
                if(responseJson.result === true)
                {
                  AsyncStorage.setItem("uid",responseJson.uid);
                  navigation.navigate('Dashboard')
                }
                else{
                  console.log(responseJson.result)
                  navigation.navigate('Google',{id:user.id, email:user.email, name:user.name, img:user.photoUrl});
                }
              }).catch((error) => {
                console.log(error);
              });
  
            } catch (err) {
  
            }
  
          }
        } catch (error) {
          console.log("LoginScreen.js 19 | error with login", error);
        }
      }
      
      const FacebookLogin = async () => {
        try {
          await Facebook.initializeAsync({
            appId: '200170602097192',
          });
          const {
            type,
            token,
            expirationDate,
            permissions,
            declinedPermissions,
          } = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile'],
          });
          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              console.log('id:',data.id)
              console.log('name:',data.name)
              console.log('img:',data.picture.data.url)

            fetch('https://app.rthouse.mlcf/login_facebook.php?id='+data.id)
            .then((response) => response.json()) 
              .then((responseJson) => {
        
                if(responseJson.result === true)
                {
                  AsyncStorage.setItem("uid",responseJson.uid);
                  navigation.navigate('Dashboard')
                }
                else{
                  console.log(responseJson.result)
                  navigation.navigate('Facebook',{id:data.id, email:data.email, name:data.name, img:data.picture.data.url});
                }
              }).catch((error) => {
                console.log(error);
              });
            });
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
    }
      
    return (
        <View style={styles.container}>
            <Image source={require('./img/top.png')} resizeMode='stretch' style={{width: '100%', height: '20%'}}/>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{fontFamily:'Kanit',textAlign:'center',fontSize:40,paddingTop:50}}>
                เข้าสู่ระบบ
            </Text>
            <View style={{paddingHorizontal:30,paddingTop:20}}>
            
            <View style={styles.TextInput}>
                <FontAwesome name="send" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
                placeholder='อีเมล'
                placeholderTextColor='#abcaa0'
                style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
                //autoCorrect={true}
                //autoCapitalize={false}
                autoCompleteType='email'
                keyboardType='email-address'
                textContentType='emailAddress'
                value={email}
                onChangeText={(email) => setEmail(email)}
                />
            </View>
            
            <View style={{paddingTop:10}}></View>
            <View style={styles.TextInput}>
            <FontAwesome5 name="lock" size={24} color="white" />
            <Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
            placeholder='รหัสผ่าน'
            placeholderTextColor='#abcaa0'
            style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
            //autoCorrect={true}
            secureTextEntry={true}
            textContentType='password'
            autoCompleteType='password'
            value={password}
            onChangeText={(txt) => setPassword(txt)}
                />
            </View>
            <View style={{paddingTop:10}}></View>
            
            <View style={{alignSelf:'flex-end'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Reset')} >
        <Text style={{fontSize:16,color:'#749d63',fontFamily:'Kanit'}}>ลืมรหัสผ่าน?</Text>
      </TouchableOpacity>
      </View>
            <View style={{paddingTop:10}}>
                <TouchableOpacity style={{backgroundColor: '#FFFFFF',borderRadius:10}} onPress={()=> handlePress()}>
                    <Text style={styles.textRegis}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
            </View>

            {/* <View style={{paddingTop: 20, paddingBottom: 20}}>
                <Text style={{fontSize: 18,fontFamily:'Kanit',textAlign:'center'}}>หรือเข้าสู่ระบบด้วย</Text>
            </View>
            <TouchableOpacity style={styles.googleButton} onPress={() => GoogleLogin()}>
            <Image source={require('./img/google.svg')} style={{width: 20, height:20}} />
              <Text style={styles.googleButtonText}>เข้าสู่ระบบด้วย Google</Text>
            </TouchableOpacity>
      <View style={{paddingBottom:50,paddingTop:15}}>
      <TouchableOpacity style={styles.facebookButton} onPress={() => FacebookLogin()}>
            <FontAwesome5 
              name='facebook'
              size={20}
              color='#fff' 
              paddingHorizontal={3}
            />
              <Text style={styles.facebookButtonText}>เข้าสู่ระบบด้วย Facebook</Text>
            </TouchableOpacity>
            
        {/* <TouchableOpacity style={styles.iconButton}>
          <Icon name='google' type='font-awesome' size={30}  />
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.iconButton} onPress={logInFacebook}>
        
          <Icon
            name='facebook-square'
            type='font-awesome'
            size={30}
            //color='blue'
          />
          
        </TouchableOpacity> 
      </View> */}
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f8f7fd'

    },
    textRegis: {
        textAlign: 'center',
        color:'#749d63',
        fontSize:20,
        paddingTop:7,
        paddingBottom:7,
        fontFamily:'Kanit'
    },
    textLogin: {
        textAlign: 'center',
        color:'#FFFFFF',
        fontSize:20,
        paddingTop:7,
        paddingBottom:7,
        fontFamily:'Kanit'
    },
    TextInput: {
        width: '100%',
        height:45,
        //borderRadius:8,
        backgroundColor: '#749d63', 
        paddingHorizontal:10,
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
    },
    facebookButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3C66C4',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
      googleButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
      facebookButtonText: {
        marginHorizontal: 12,
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
      },
      googleButtonText: {
        marginHorizontal: 12,
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
      },
})
