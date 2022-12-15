import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList,ActivityIndicator,Image } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';

export default function Detail_Payment_tem({route,navigation}) {

    const [house, setHouse] = useState('');

    const monthNamesThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
"กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];

const d = new Date();
const year = d.getFullYear()+543;

const date = monthNamesThai[d.getMonth()]+" "+year;

const Due = new Date();
const years = Due.getFullYear()+543;
const DueDate = d.getDate()+" "+ monthNamesThai[d.getMonth()]+" "+years;

const load  = async() =>{
    let uid = await AsyncStorage.getItem("uid");
    fetch('https://app.rthouse.ml/listpay_tem.php?uid='+uid+'&idb='+route.params.idb)
        .then((response) => response.json())
        .then((json) => setHouse(json))
        .catch((error) => console.error(error))
 }
useEffect(() => {
    load()
}, [])
    return (
        <View style={styles.container}>
            <Appbar.Header style={{backgroundColor:'#749d63'}}>
  <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
  <Appbar.Content title="รายละเอียดชำระเงิน" color="white" />

</Appbar.Header>
<View style={{paddingTop:20,paddingBottom:20}}>
    <Text style={{textAlign: 'center', fontSize:20,fontFamily:'Kanits'}}>ประวัติการชำระเงิน</Text>
</View>
<ScrollView showsVerticalScrollIndicator={false}>
 <View>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}> ห้องพัก : {route.params.name}</Text>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}> จำนวนเงิน : {house.price}฿</Text>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}> วันที่ชำระเงิน : {house.date}</Text>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}> สถานะ : {house.status}</Text>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}> ประเภทห้องพัก : {house.house}</Text>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}> {house.datein}</Text>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}> {house.timein}</Text>
        <View style={{paddingTop:20,justifyContent: 'center',alignItems: 'center'}}>
        </View>
        
        <View style={{paddingTop:10,alignItems:'center'}}>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}> รูปสลิป</Text>
        <Image source={{uri:'https://app.rthouse.ml/'+house.img}} style={{width:'90%',height:450}} />
        </View>
 </View>
</ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})