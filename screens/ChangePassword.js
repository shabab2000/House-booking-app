import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList,ActivityIndicator,TextInput,Alert } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo,AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function ChangePassword({route,navigation}) {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePress = async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");
            if (!password) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่านใหม่!');
              } else if (password.length<6) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่านใหม่ 6ตัวขึ้นไป!');
              } else if (!confirmPassword) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกยืนยันรหัสผ่านใหม่!');
              } else if (password !== confirmPassword) {
                Alert.alert('แจ้งเตือน!','กรุณายืนยันรหัสผ่านให้ตรงกัน!');
              } else{
                setLoading(!loading);
                fetch('https://app.rthouse.ml/change_password.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              id: uid,
              password: password
           
            })
           
          }).then((response) => response.json()) 
                .then((responseJson) => {
          
                  if(responseJson === 'เปลี่ยนรหัสผ่านสำเร็จ')
                  {
                      //AsyncStorage.setItem("Email",email);
                      Alert.alert('แจ้งเตือน!',responseJson);
                      navigation.goBack();
           
                  }
                  else{
                    setLoading(!loading);
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
            <Appbar.Header style={{backgroundColor:'#749d63'}}>
  <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
  <Appbar.Content title="เปลี่ยนรหัสผ่าน" color="white" />
</Appbar.Header>
<ScrollView showsVerticalScrollIndicator={false}>
<ProgressDialog
    title="รอซักครู่"
    activityIndicatorColor="blue"
    activityIndicatorSize="large"
    message="กำลังโหลด..."
    visible={loading}
/>
<View style={{paddingTop:50,paddingBottom:20,paddingHorizontal:20}}>
    <Text style={{fontSize:25,fontFamily:'Kanits',textAlign: 'center'}}>เปลี่ยนรหัสผ่านใหม่</Text>

    
            <View style={{paddingTop:20}}></View>
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

                //value={email}
            onChangeText={(txt) => setPassword(txt)}
                />
            </View>
            <View style={{paddingTop:10}}></View>
            <View style={styles.TextInput}>
            <FontAwesome5 name="lock" size={24} color="white" />
                <Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
                placeholder='ยืนยันรหัสผ่าน'
            placeholderTextColor='#abcaa0'
            style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
            //autoCorrect={true}
            secureTextEntry={true}
            textContentType='password'
            autoCompleteType='password'
                //value={email}
            onChangeText={(txt) => setConfirmPassword(txt)}
                />
            </View>
            <View style={{paddingTop:10}}></View>
            <View style={{paddingTop:20}}>
    
    <TouchableOpacity style={{ backgroundColor: '#FFFFFF',borderRadius:10}} onPress={() => handlePress()}>
        <Text style={styles.textRegis}>เปลี่ยนรหัสผ่าน</Text>
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
})
