import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList,ActivityIndicator,Image } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';

export default function Detail_Report({route,navigation}) {

    const [report, setReport] = useState('');

    const load  = async() =>{
        let uid = await AsyncStorage.getItem("uid");
        fetch('https://app.rthouse.ml/detail_report.php?uid='+uid+'&id='+route.params.id)
            .then((response) => response.json())
            .then((json) => setReport(json))
            .catch((error) => console.error(error))
     }

    useEffect(() => {
        load()
    }, [])
    return (
        <View style={styles.container}>
            <Appbar.Header style={{backgroundColor:'#749d63'}}>
  <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
  <Appbar.Content title="รายละเอียดการแจ้งปัญหา" color="white" />

</Appbar.Header>
<ScrollView showsVerticalScrollIndicator={false}>
{report?
        <View style={{paddingHorizontal:20}}>
            <Text style={{fontSize:25,textAlign: 'center',fontFamily:'Kanits',paddingTop:10, paddingBottom: 5}}>รายละเอียดการแจ้งปัญหา</Text>
            
            <View style={{paddingTop:30, paddingBottom: 10}}>

            <Text style={{fontFamily:'Kanits',fontSize:18}}>เรื่อง : {report.title}</Text>
            <Text style={{fontFamily:'Kanits',fontSize:18,paddingTop:10}}>{report.category =='house'? 'บ้านเช่า':'อพาร์ทเม้นท์'} : {report.name}</Text>
            <Text style={{fontFamily:'Kanits',fontSize:18,paddingTop:10}}>รายละเอียด : </Text>
            <Text style={{fontFamily:'Kanits',fontSize:18,paddingTop:10,paddingLeft:10}}>{report.details}</Text>
            <Text style={{fontFamily:'Kanits',fontSize:18,paddingTop:10}}>สถานะ : <Text style={{color:'blue'}}>{report.status}</Text></Text>
            <Text style={{fontFamily:'Kanits',fontSize:18,paddingTop:10}}>วันที่กำหนดเสร็จ : <Text style={{color:'#000'}}>{report.duedate}</Text></Text>
            <Text style={{fontFamily:'Kanits',fontSize:18,paddingTop:20}}>รูปภาพ</Text>
            <Image style={{width:'100%',height:500, paddingTop:10}} source={{uri:'https://app.rthouse.ml/'+report.img}}/>
            
            </View>
        </View>
        : <ActivityIndicator size='large' color='primary' />}
</ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
