import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList,ActivityIndicator } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';

export default function ListPayment_daily({route,navigation}) {

    const [house, setHouse] = useState('');

    const load  = async() =>{
        let uid = await AsyncStorage.getItem("uid");
        fetch('https://app.rthouse.ml/list_books_daily.php?uid='+uid)
            .then((response) => response.json())
            .then((json) => setHouse(json))
            .catch((error) => console.error(error))
     }

    useEffect(() => {
        load()
    }, [])
    return (
        <View style={styles.container}>
           
{ house?
<ScrollView showsVerticalScrollIndicator={false}>
<View style={{paddingTop:20,paddingBottom:20}}>
    <Text style={{textAlign: 'center', fontSize:20,fontFamily:'Kanits'}}>ห้องพักทั้งหมดของคุณ</Text>
</View>
{ house.length ? 
<FlatList 
              data={house}
              keyExtractor={item => item.id}
              renderItem={({key,item}) =>
<ListItem key={key}  bottomDivider topDivider onPress={() => navigation.navigate('Detail_Payment_tem',{id:item.id, idh:item.idh, name:item.name, idb:item.idb})}>
      <FontAwesome5 name="home" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{fontFamily:'Kanits'}}>{item.name}</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
              }/>
              : <Text style={{fontFamily:'Kanits',fontSize:18,textAlign: 'center',color:'#000',paddingTop:7}}>ไม่มีประวัติการชำระเงิน</Text>}
</ScrollView>
:<ActivityIndicator size='large' color='primary' />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
