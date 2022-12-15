import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,ScrollView,Image,TouchableOpacity,RefreshControl,FlatList,Alert,ActivityIndicator } from 'react-native'
import { Appbar,Badge } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import {ListItem,Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Notification({route,navigation}) {

    const [list,setList] = useState('');

    const monthNamesThai = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.",
"ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];

const da = new Date('2021-10-01 17:00:00');

const d = new Date('2021/10/01 17:13:10');
const year = d.getFullYear()+543;

const date = d.getDate()+" "+monthNamesThai[d.getMonth()]+" "+year+" "+d.getHours()+":"+d.getMinutes();
console.log(date);
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const load = async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");
               fetch('https://app.rthouse.ml/notification.php?uid='+uid)
               .then((response) => response.json())
        .then((json) => setList(json))
        .catch((error) => console.log(error))
        } catch (err) {
          console.log(err);
        }
    };

    const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    load();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
      load()
      const unsubscribe = navigation.addListener('focus', () => {
        {load()}
      });
      return unsubscribe;
      }, [navigation]);
    return (
        <View style={styles.containers}>
        <Appbar.Header style={{backgroundColor:'#749d63'}}>
  <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
  <Appbar.Content title="การแจ้งเตือน" color="white" />
</Appbar.Header>
{list?
<ScrollView showsVerticalScrollIndicator={false} 
refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} />}>
            {list.length?
            <FlatList 
              data={list}
              keyExtractor={item => item.id}
              renderItem={({item}) => 
            <ListItem containerStyle={{backgroundColor:item.readn =='NO'?"#e8f1ff":"#fff"}}  bottomDivider topDivider onPress={() => navigation.navigate('Detail_notification',{id:item.id,title:item.title,details:item.details,date:item.date})}>
        <Icon name="dot-single" size={25} color={ item.readn =='NO'? "blue" : "#ddd"} /> 
        <ListItem.Content >
          <ListItem.Title>{new Date(item.date).getDate()+" "+monthNamesThai[new Date(item.date).getMonth()]+" "+new Date(item.date).getFullYear()+" "+new Date(item.date).getHours()+":"+new Date(item.date).getMinutes()+" น."}</ListItem.Title>
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
              }/>
              : <Text style={{fontFamily:'Kanits',fontSize:18,textAlign: 'center',paddingTop:10}}>ไม่มีการแจ้งเตือน</Text>}
</ScrollView>
:<ActivityIndicator size='large' color='primary' />}
        </View>
    )
}

const styles = StyleSheet.create({
  containers: {
    flex: 1,
  }
})
