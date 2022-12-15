import React,{useState, useEffect }from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput, ScrollView,Alert } from 'react-native'
import { useFonts } from 'expo-font';
import { FontAwesome5,FontAwesome } from '@expo/vector-icons'; 

export default function ResetPass({route,navigation}) {
    const [email, setEmail] = useState(route.params.email);
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [loaded] = useFonts({
        'Kanit': require('./font/Kanit-Light.ttf'),
        'Kanits': require('./font/Kanit-Light.ttf'),
      });
      
      if (!loaded) {
        return null;
      }

      const handlePress = () => {
        try {
                if (!password) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่านใหม่!');
            } else if (password.length<6) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่านใหม่ 6ตัวขึ้นไป!');
            } else if (!rePassword) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกยืนยันรหัสผ่านใหม่!');
            } else if (password !== rePassword) {
                Alert.alert('แจ้งเตือน!','กรุณายืนยันรหัสผ่านใหม่ให้ตรงกัน!');
            } else{
                fetch('https://app.rthouse.ml/change_password.php', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                   
                      email: email,
                      password: password,
                   
                    })
                   
                  }).then((response) => response.json()) 
                        .then((responseJson) => {
                  
                          if(responseJson === 'เปลี่ยนรหัสผ่านสำเร็จ')
                          {
                            Alert.alert('แจ้งเตือน!',responseJson);
                            navigation.replace('Login');
                              //AsyncStorage.setItem("Email",email);
                              
                   
                          }
                          else{
                            Alert.alert('แจ้งเตือน!',responseJson);
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
      
    return (
        <View style={styles.container}>
            <Image source={require('./img/top.png')} resizeMode='stretch' style={{width: '100%', height: '20%'}}/>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{fontFamily:'Kanit',textAlign:'center',fontSize:40}}>
                รีเซ็ตรหัสผ่าน
            </Text>
            <View style={{paddingHorizontal:30,paddingTop:20}}>
            
            <View style={{paddingTop:10}}></View>
            <View style={styles.TextInput}>
            <FontAwesome5 name="lock" size={24} color="white" />
            <Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
            placeholder='รหัสผ่านใหม่'
            placeholderTextColor='#abcaa0'
            style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
            //autoCorrect={true}
            secureTextEntry={true}
            textContentType='password'
            autoCompleteType='password'
            value={password}
            onChangeText={(txt) => setPassword(txt)}
                //
                />
            </View>
            
            <View style={{paddingTop:10}}></View>
            <View style={styles.TextInput}>
            <FontAwesome5 name="lock" size={24} color="white" />
            <Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
            placeholder='ยืนยันรหัสผ่านใหม่'
            placeholderTextColor='#abcaa0'
            style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
            //autoCorrect={true}
            secureTextEntry={true}
            textContentType='password'
            autoCompleteType='password'
            value={rePassword}
            onChangeText={(txt) => setRePassword(txt)}
                />
            </View>
            <View style={{paddingTop:10}}></View>
            
            
            <View style={{paddingTop:10}}>
                <TouchableOpacity style={{backgroundColor: '#FFFFFF',borderRadius:10}} onPress={()=> handlePress()}>
                    <Text style={styles.textRegis}>รีเซ็ตรหัสผ่าน</Text>
                </TouchableOpacity>
            </View>
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
    }
})
