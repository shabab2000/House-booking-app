import React,{ useState,useEffect } from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,TextInput,LogBox,Alert } from 'react-native'
import { FontAwesome5,FontAwesome,Ionicons,Entypo,AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';

export default function Cancel_book({route,navigation}) {
    const[name, setName] = useState('');
    const[numbers, setNumbers] = useState('');
    const[bank, setBank] = useState('');
    const[tel, setTel] = useState('');

    const handlePress = async() => {
        try {
            if (!name) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อบัญชี!');
            } else  if (!numbers) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขบัญชี!');
            } else  if (!bank) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกธนาคารที่ต้องการโอน!');
            } else{
                let uid = await AsyncStorage.getItem("uid");
                fetch('https://app.rthouse.ml/cancel_book.php', {
                    method: 'POST',
                    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
            pid: route.params.pid,
            name: name,
            number: numbers,
            bank: bank,
            idb: route.params.idb,
            uid: uid,
            idh: route.params.idh
       
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
      
              if(responseJson === "ยกเลิกการจองสำเร็จ")
              {
                Alert.alert('แจ้งเตือน!',responseJson);
                navigation.navigate('Profile');
              }else{
                Alert.alert('แจ้งเตือน!',responseJson);
              }
              
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
  <Appbar.Content title="ยกเลิกการจอง" color="white" />
</Appbar.Header>
            <View style={{paddingTop:20}}>

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={{fontSize:25,fontFamily:'Kanits',textAlign: 'center',paddingTop:20,textDecorationLine: 'underline'}}>ยกเลิกการจอง</Text>
            <View style={{paddingTop:20,justifyContent: 'center',alignItems: 'center'}}>
                <Text style={{fontSize:18,fontFamily:'Kanits'}}>{route.params.name}</Text>
                <Text style={{fontSize:18,fontFamily:'Kanits'}}>ค่ามัดจำ : {route.params.deposit}฿</Text>
            </View>

            <View style={{padding:7,margin:20,backgroundColor:'#749d63',alignSelf:'flex-start',borderRadius:7}}>
                <Text style={{fontSize:18,fontFamily:'Kanits',color:'white'}}>กรอกข้อมูลการคืนเงิน</Text>
            </View>
        <View style={{paddingHorizontal:30,paddingTop:20}}>
            
            <View style={styles.TextInput}>
                <FontAwesome5 name="user-alt" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
                placeholder='ชื่อบัญชี'
                placeholderTextColor='#abcaa0'
                style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
                //autoCorrect={true}
                //autoCapitalize={false}
                textContentType='name'
                //value={email}
                onChangeText={(txt) => setName(txt)}
                />
            </View>
            <View style={{paddingTop:10}}></View>
            <View style={styles.TextInput}>
                <AntDesign name="idcard" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
                placeholder='เลขบัญชี'
                placeholderTextColor='#abcaa0'
                style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
                //autoCorrect={true}
                //autoCapitalize={false}
                autoCompleteType='off'
                keyboardType='number-pad'
                //value={email}
                onChangeText={(txt) => setNumbers(txt)}
                />
            </View>
            <View style={{paddingTop:10}}></View>
            <View style={styles.TextInput}>
                <FontAwesome name="send" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
                placeholder='ธนาคาร'
                placeholderTextColor='#abcaa0'
                style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
                //autoCorrect={true}
                //autoCapitalize={false}
                value={bank}
                onChangeText={(bank) => setBank(bank)}
                />
            </View>
            
            <View style={{paddingTop:10}}></View>
            <TouchableOpacity style={{backgroundColor: '#FFFFFF',borderRadius:10}} onPress={()=> handlePress()}>
                    <Text style={styles.textRegis}>ยืนยันยกเลิก</Text>
            </TouchableOpacity>
            

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
    TextInput: {
        width: '100%',
        height:45,
        //borderRadius:8,
        backgroundColor: '#749d63', 
        paddingHorizontal:10,
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        borderRadius:3
    },
    textRegis: {
        textAlign: 'center',
        color:'#749d63',
        fontSize:20,
        paddingTop:7,
        paddingBottom:7,
        fontFamily:'Kanit'
    },
})
