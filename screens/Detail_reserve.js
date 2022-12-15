import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList,ActivityIndicator,Image } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';

export default function Detail_reserve({route,navigation}) {

    const [house, setHouse] = useState('');

    const monthNamesThai = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
"กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];

const d = new Date('2021-09-30');
const year = d.getFullYear()+543;

const date = monthNamesThai[d.getMonth()]+" "+year;

const Due = new Date('2021-09-30');
const years = Due.getFullYear()+543;
const DueDate = d.getDate()+" "+ monthNamesThai[d.getMonth()]+" "+years;

    const load  = async() =>{
        let uid = await AsyncStorage.getItem("uid");
        fetch('https://app.rthouse.ml/listpay.php?uid='+uid+'&idb='+route.params.id)
            .then((response) => response.json())
            .then((json) => setHouse(json))
            .catch((error) => console.error(error))
     }
    useEffect(() => {
        //load()
    }, [])
    return (
        <View style={styles.container}>
            <Appbar.Header style={{backgroundColor:'#749d63'}}>
  <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
  <Appbar.Content title="รายละเอียดชำระเงินมัดจำ" color="white" />

</Appbar.Header>
<View style={{paddingTop:20,paddingBottom:20}}>
    <Text style={{textAlign: 'center', fontSize:20,fontFamily:'Kanits'}}>ประวัติการชำระเงิน</Text>
</View>
<ScrollView showsVerticalScrollIndicator={false}>
 <View>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}> {route.params.name}</Text>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}> จำนวนเงินมัดจำ {route.params.deposit}฿</Text>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}> วันที่ชำระเงิน {route.params.paydate}</Text>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}> สถานะ {route.params.status}</Text>
        <View style={{paddingTop:20,justifyContent: 'center',alignItems: 'center'}}>
        {route.params.status =='แจ้งชำระเงินแล้ว'?
               <TouchableOpacity style={{backgroundColor:'#a47',borderRadius:10,padding:10}} 
               onPress={()=>navigation.replace('Cancel_book',{name: route.params.name, deposit: route.params.deposit, pid: route.params.pid, idb:route.params.idb,idh:route.params.idh })} >
                   <Text style={{fontSize:18,fontFamily:'Kanits',color:'white',paddingHorizontal: 20}}>ยกเลิกการจอง</Text>
               </TouchableOpacity>
               :null}

               {route.params.status =='ชำระเงินสมบูรณ์'?
               <TouchableOpacity style={{backgroundColor:'#a47',borderRadius:10,padding:10}} 
               onPress={()=>navigation.replace('Cancel_book',{name: route.params.name, deposit: route.params.deposit, pid: route.params.pid, idb:route.params.idb,idh:route.params.idh })} >
                   <Text style={{fontSize:18,fontFamily:'Kanits',color:'white',paddingHorizontal: 20}}>ยกเลิกการจอง</Text>
               </TouchableOpacity>
               :null}
        </View>
        {route.params.status =='ยกเลิกการชำระเงิน'? 
        <View>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,paddingTop:10}}>ชื่อบัญชี: {route.params.nameb}</Text>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}>เลขบัญชี: {route.params.numbers}</Text>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}>ธนาคาร: {route.params.bank}</Text>
        </View>:route.params.status =='คืนเงินแล้ว'?
        <View>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,paddingTop:10}}>ชื่อบัญชี: {route.params.nameb}</Text>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}>เลขบัญชี: {route.params.numbers}</Text>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}>ธนาคาร: {route.params.bank}</Text>
        </View>
        :null}
        <View style={{paddingTop:10,alignItems:'center'}}>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:18,}}> รูปสลิป</Text>
        <Image source={{uri:'https://app.rthouse.ml/'+route.params.img}} style={{width:'90%',height:450}} />
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
