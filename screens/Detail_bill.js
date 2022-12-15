import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';

export default function Detail_bill({route,navigation}) {
    const [house, setHouse] = useState('');

    const monthNamesThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
"กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];

const d = new Date(house.date);
const year = d.getFullYear()+543;

const date = monthNamesThai[d.getMonth()]+" "+year;

const Due = new Date(house.duedate);
const years = Due.getFullYear()+543;
const DueDate = Due.getDate()+" "+ monthNamesThai[Due.getMonth()]+" "+years;

    const load  = async() =>{
        let uid = await AsyncStorage.getItem("uid");
        fetch('https://app.rthouse.ml/listbill.php?uid='+uid+'&idb='+route.params.idb)
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
  <Appbar.Content title="รายการบิลเดือนนี้" color="white" />
</Appbar.Header>
<View style={{paddingTop:20,paddingBottom:10}}>
    <Text style={{textAlign: 'center', fontSize:20,fontFamily:'Kanits'}}>รายการบิลเดือนนี้</Text>
</View>
<ScrollView showsVerticalScrollIndicator={false}>
{ house ?
    <View style={{padding:15}}>
        {house.name ? 
        <View style={{backgroundColor: '#fff',borderRadius:10}}>
            <Text style={{textAlign: 'center', fontSize:25,fontFamily:'Kanits'}}>บิลค่าเช่า</Text>
            <Text style={{textAlign: 'center', fontSize:18,fontFamily:'Kanits'}}>ประจำเดือน {date}</Text>
        <View style={{paddingHorizontal:30,paddingVertical:10}}>
        <View style={{borderTopWidth:1}}/>
        </View>
    <View style={{paddingHorizontal: 20}}>
        <Text style={{fontFamily:'Kanits',fontSize:18}}>ชื่อ : {house.name}</Text>
        <Text style={{fontFamily:'Kanits',fontSize:18}}>เบอร์โทรศัพท์ : {house.tel}</Text>
        <Text style={{fontFamily:'Kanits',fontSize:18}}>เลขบัตรประชาชน : {house.idcard}</Text>
        <Text style={{fontFamily:'Kanits',fontSize:18}}>อีเมล : {house.email}</Text>
    </View>
    <View style={{paddingHorizontal:20,paddingTop:15}}>
        <View style={{borderWidth:1,justifyContent: 'center'}}>
            <Text style={{fontFamily:'Kanits',fontSize:18,padding:7,textAlign: 'center'}}>
                {route.params.name}
            </Text>
        </View>
        <View style={{display:'flex',flexDirection: 'row',}}>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,width:'50%',justifyContent: 'center'}}>
            <Text style={{fontFamily:'Kanits',fontSize:18,padding:7,textAlign: 'center',}}>
                ค่าเช่าห้องพัก
            </Text>
        </View>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,borderRightWidth:1,width:'50%'}}>
            <Text style={{fontFamily:'Kanits',fontSize:18,padding:7,textAlign: 'center',}}>
                {house.price}฿
            </Text>
        </View>
        </View>
        <View style={{display:'flex',flexDirection: 'row',}}>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,width:'50%',justifyContent: 'center'}}>
            <Text style={{fontFamily:'Kanits',fontSize:18,padding:7,textAlign: 'center',}}>
               ค่าการใช้ไฟฟ้า
            </Text>
        </View>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,borderRightWidth:1,width:'50%'}}>
        <View style={{display:'flex',flexDirection: 'row',}}>
        <View style={{borderBottomWidth:1,width:'50%',justifyContent: 'center'}}>
            <Text style={{fontFamily:'Kanits',fontSize:15,padding:7,textAlign: 'center',}}>
                หน่วย
            </Text>
        </View>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,width:'50%',justifyContent: 'center'}}>
            <Text style={{fontFamily:'Kanits',fontSize:15,padding:7,textAlign: 'center',color:'#000'}}>
                {house.unit_electricity}
            </Text>
        </View>
        </View>
        <View style={{display:'flex',flexDirection: 'row',}}>
        <View style={{width:'50%'}}>
            <Text style={{fontFamily:'Kanits',fontSize:15,padding:7,textAlign: 'center',}}>
                ค่าไฟฟ้า
            </Text>
        </View>
        <View style={{borderLeftWidth:1,width:'50%'}}>
            <Text style={{fontFamily:'Kanits',fontSize:15,padding:7,textAlign: 'center',}}>
                {house.electricity}฿
            </Text>
        </View>
        </View>
        </View>
        </View>
        <View style={{display:'flex',flexDirection: 'row',}}>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,width:'50%',justifyContent: 'center'}}>
            <Text style={{fontFamily:'Kanits',fontSize:18,padding:7,textAlign: 'center',}}>
               ค่าน้ำประปา
            </Text>
        </View>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,borderRightWidth:1,width:'50%'}}>
        <View style={{display:'flex',flexDirection: 'row',}}>
        <View style={{borderBottomWidth:1,width:'50%',justifyContent: 'center'}}>
            <Text style={{fontFamily:'Kanits',fontSize:15,padding:7,textAlign: 'center',}}>
                หน่วย
            </Text>
        </View>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,width:'50%',justifyContent: 'center'}}>
            <Text style={{fontFamily:'Kanits',fontSize:15,padding:7,textAlign: 'center',}}>
                {house.unit_water}
            </Text>
        </View>
        </View>
        <View style={{display:'flex',flexDirection: 'row',}}>
        <View style={{width:'50%'}}>
            <Text style={{fontFamily:'Kanits',fontSize:15,padding:7,textAlign: 'center',}}>
                ค่าน้ำ
            </Text>
        </View>
        <View style={{borderLeftWidth:1,width:'50%'}}>
            <Text style={{fontFamily:'Kanits',fontSize:15,padding:7,textAlign: 'center',}}>
                {house.water}฿
            </Text>
        </View>
        </View>
        </View>
        </View>
        <View style={{display:'flex',flexDirection: 'row',}}>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,width:'50%'}}>
            <Text style={{fontFamily:'Kanits',fontSize:18,padding:7,textAlign: 'center',}}>
                รวมทั้งหมด
            </Text>
        </View>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,borderRightWidth:1,width:'50%'}}>
            <Text style={{fontFamily:'Kanits',fontSize:18,padding:7,textAlign: 'center',}}>
                {house.total}฿
            </Text>
        </View>
        </View>
        <View style={{paddingTop:5}}>
            <Text style={{fontSize:18,fontFamily:'Kanits'}}>วันที่กำหนดชำระ {DueDate}</Text>
        </View>
        <View style={{paddingTop:5,paddingBottom:10}}>
        {house.status =='ยังไม่ชำระ' ? 
            <TouchableOpacity style={{backgroundColor:'#749d63',borderRadius:15}} onPress={() => navigation.navigate('PayBill',{idb:route.params.idb, id: house.id, name: route.params.name, total: house.total, idh: house.id})}>
                <Text style={{color:'#fff',fontSize:18,fontFamily:'Kanits',textAlign: 'center',paddingVertical:3}}>ชำระเงินตอนนี้</Text>
            </TouchableOpacity>
            : <Text style={{color: '#749d63',fontSize:23,fontFamily:'Kanits',textAlign: 'center'}}>บิลนี้ได้รับการชำระเงินแล้ว</Text> }
        </View>
    </View>
        </View>
        : <View>
            <Text style={{textAlign: 'center',fontFamily:'Kanits'}}>ยังไม่มีรายการบิลเดือนนี้</Text>
        </View>}
        </View>
        :<ActivityIndicator size='large' color='primary' />}
</ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
