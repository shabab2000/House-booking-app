import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';

export default function Detail_book({route,navigation}) {

    const [house, setHouse] = useState('');
    const[id,setIds] = useState('');
    const[payment,setPayment] = useState('');
    const ids = Number(id)+1;

    const loads = async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");
            if(uid!== null) {
                fetch('https://app.rthouse.ml/bookings.php')
        .then((response) => response.json())
        .then((json) => setIds(json))
        .catch((error) => console.error(error))
            }
        } catch (err) {
            console.log(err);
        }
    };

    const load  = async() =>{
        let uid = await AsyncStorage.getItem("uid");
        fetch('https://app.rthouse.ml/detail_book.php?uid='+uid+'&id='+route.params.id)
            .then((response) => response.json())
            .then((json) => setHouse(json))
            .catch((error) => console.error(error))
     }

     const payments = async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");
            if(uid!== null) {
                fetch('https://app.rthouse.ml/payments.php?uid='+uid+'&id='+route.params.id)
        .then((response) => response.json())
        .then((json) => setPayment(json))
        .catch((error) => console.error(error))
            }
        } catch (err) {
            console.log(err);
        }
    };
console.log(payment)
    useEffect(() => {
        load()
        loads()
        payments()
    }, [])
    return (
        <View style={styles.container}>
            <Appbar.Header style={{backgroundColor:'#749d63'}}>
  <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
  <Appbar.Content title="รายละเอียดการเช่า" color="white" />

</Appbar.Header>
<ScrollView showsVerticalScrollIndicator={false}>
{ house?
<View style={{paddingTop:20,paddingBottom:20}}>
        <Text style={{fontSize:25,fontFamily:'Kanits',textAlign: 'center'}}>ข้อมูลผู้เช่า</Text>
    <View style={{paddingHorizontal:20,paddingTop:15}}>

    <View style={{display: 'flex',flexDirection: 'row',}}>
        <View style={{borderLeftWidth:1,borderTopWidth:1,borderBottomWidth:1,width:'25%',padding:3,borderColor:'#a4a4a4'}}>
        <Text style={{fontSize:18,fontFamily:'Kanits',textAlign: 'center'}}>ชื่อ-สกุล</Text>
        </View>
        <View style={{borderWidth:1,width:'75%',padding:3,borderColor:'#a4a4a4'}}>
        <Text style={{fontSize:18,fontFamily:'Kanits'}}>{house.name}</Text>
        </View>
    </View>
    <View style={{display: 'flex',flexDirection: 'row',}}>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,width:'25%',padding:3,borderColor:'#a4a4a4'}}>
        <Text style={{fontSize:18,fontFamily:'Kanits',textAlign: 'center'}}>อีเมล</Text>
        </View>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,borderRightWidth:1,width:'75%',padding:3,borderColor:'#a4a4a4'}}>
        <Text style={{fontSize:18,fontFamily:'Kanits'}}>{house.email}</Text>
        </View>
    </View>
    <View style={{display: 'flex',flexDirection: 'row',}}>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,width:'35%',padding:3,borderColor:'#a4a4a4'}}>
        <Text style={{fontSize:18,fontFamily:'Kanits',textAlign: 'center'}}>เบอร์โทรศัพท์</Text>
        </View>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,borderRightWidth:1,width:'65%',padding:3,borderColor:'#a4a4a4'}}>
        <Text style={{fontSize:18,fontFamily:'Kanits'}}>{house.tel}</Text>
        </View>
    </View>
    <View style={{display: 'flex',flexDirection: 'row',}}>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,width:'50%',padding:3,borderColor:'#a4a4a4'}}>
        <Text style={{fontSize:18,fontFamily:'Kanits',textAlign: 'center'}}>เลขบัตรประชาชน</Text>
        </View>
        <View style={{borderLeftWidth:1,borderBottomWidth:1,borderRightWidth:1,width:'50%',padding:3,borderColor:'#a4a4a4'}}>
        <Text style={{fontSize:18,fontFamily:'Kanits'}}>{house.idcard}</Text>
        </View>
    </View>
    </View>
        <Text style={{textAlign:'center',fontFamily:'Kanits',fontSize:16,paddingTop:5}}>สถานะการชำระเงิน: {payment.status ? payment.status : 'ยังไม่ชำระเงิน'} </Text>
        {payment.status ?
        <Text></Text>
        :<View style={{paddingTop:20,justifyContent: 'center',alignItems: 'center'}}>
               <TouchableOpacity style={{backgroundColor:'#749d63',borderRadius:10,padding:10}} 
               onPress={()=>navigation.replace('Payment',{name: route.params.name, price: house.price, deposit: house.deposit, id: house.id, id_bk: ids})} >
                   <Text style={{fontSize:18,fontFamily:'Kanits',color:'white',paddingHorizontal: 20}}>ชำระเงิน</Text>
               </TouchableOpacity>
           </View>
        }
    <Text style={{fontSize:25,fontFamily:'Kanits',textAlign: 'center',paddingTop:20}}>ข้อมูล{house.category=='house'? 'บ้านเช่า' : 'อพาร์ทเม้นท์'}</Text>
    <View style={{paddingHorizontal:20,paddingTop:15}}>

        <Text style={{fontSize:18,fontFamily:'Kanits'}}>{route.params.name}</Text>
        <Text style={{fontSize:18,fontFamily:'Kanits'}}>ค่าเช่า {house.price}฿/เดือน</Text>
        <Text style={{fontSize:18,fontFamily:'Kanits'}}>ค่ามัดจำ {house.deposit}฿</Text>
        <Text style={{fontSize:18,fontFamily:'Kanits'}}>ที่อยู่ {house.address}</Text>
        <Text style={{fontSize:18,fontFamily:'Kanits',paddingTop:10}}>กฎของห้อง</Text>
        <Text style={{fontSize:18,fontFamily:'Kanits',paddingLeft:10}}>{house.rule}</Text>
        <Text style={{fontSize:18,fontFamily:'Kanits',paddingTop:10}}>ความอำนวยสะดวก</Text>
        <Text style={{fontSize:18,fontFamily:'Kanits',paddingLeft:10}}>{house.facility}</Text>
    
    </View>
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
