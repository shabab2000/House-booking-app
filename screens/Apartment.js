import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,FlatList } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';
import { Placeholder,PlaceholderMedia,PlaceholderLine,Fade } from 'rn-placeholder'

export default function Apartment({navigation}) {

    const [house,setHouse] = useState('');

    const wait = (timeout) => {
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    }

 const load  =() =>{

    fetch('https://app.rthouse.ml/apartment.php')
        .then((response) => response.json())
        .then((json) => setHouse(json))
        .catch((error) => console.error(error))
 }
        useEffect(() => {
            wait(1000).then(() => load())
        }, [])
    return (
        <View style={styles.container}>
            <Appbar.Header style={{backgroundColor:'#749d63'}}>
  <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
  <Appbar.Content title="อพาร์ทเม้นท์" color="white" />
</Appbar.Header>
            <View style={{paddingTop:20}}>

            </View>
            {house?
            <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList 
              data={house}
              keyExtractor={item => item.id}
              renderItem={({item}) =>
        <ListItem  bottomDivider topDivider onPress={() => navigation.navigate('Detail_apartment',{id: item.id, name: item.name, price: item.price,deposit: item.deposit, address: item.address, bathroom: item.bathroom, bedroom: item.bedroom,status: item.status, rule: item.rule, facility: item.facility, details: item.details, tel: item.tel, id_owner: item.id_owner, id_img: item.id_img,})}>
                <Image source={{ uri: 'https://app.rthouse.ml/img_houses/'+ item.img }} style={{width:80, height:80 }}/>
            <ListItem.Content>
            <ListItem.Title><Text style={{fontSize:18,fontFamily:'Kanits',paddingLeft:10}}>{item.name}</Text></ListItem.Title>
            <ListItem.Title><Text style={{fontSize:14,fontFamily:'Kanits',paddingLeft:10}}>ให้เช่า {item.price}/เดือน</Text></ListItem.Title>
            <ListItem.Title><Text style={{fontSize:14,fontFamily:'Kanits',paddingLeft:10}}>{item.address}</Text></ListItem.Title>
            <ListItem.Title><Text style={{fontSize:14,fontFamily:'Kanits',paddingLeft:10}}>มี {item.bedroom}ห้องนอน / {item.bathroom}ห้องน้ำ</Text></ListItem.Title>
            <ListItem.Title style={{alignSelf:'flex-end'}}>
            {item.status =='ว่าง'?
            <View style={{backgroundColor:'#749d63',padding:3,paddingLeft:10,paddingRight:10,}}>
                    <Text style={{fontSize:14,fontFamily:'Kanits',color:'white'}}>{item.status}</Text>
            </View>
            :
            <View style={{backgroundColor:'#FF3300',padding:3,paddingLeft:10,paddingRight:10,}}>
                    <Text style={{fontSize:14,fontFamily:'Kanits',color:'white'}}>{item.status}</Text>
            </View>
            }
            </ListItem.Title>
            </ListItem.Content>
        </ListItem>
              }/>
        
        <View style={{backgroundColor:'#fff'}}>
            
        </View>
            </ScrollView>
            :
              <Placeholder Animation={Fade}>
              <View style={{padding:7}}>
                <View style={{ flexDirection: 'row', backgroundColor:'#fff',padding:10}}>
                    <View>
                        <PlaceholderMedia style={{paddingLeft:10}} size={100}/>
                    </View>
                    <View style={{flex:1, marginLeft:10, justifyContent:'center'}}>
                        <PlaceholderLine width={90} height={16}/>
                        <PlaceholderLine width={50} height={11}/>
                        <PlaceholderLine width={70} height={11}/>
                        <PlaceholderLine width={60} height={11}/>
                        <View style={{alignItems:'flex-end',paddingRight:5,}}>
                        <PlaceholderLine width={15} height={16}/>
                        </View>
                    </View>
                </View>
                </View>
                {/* <PlaceholderLine width={100} height={3}/> */}
                <View style={{padding:7}}>
                  <View style={{ flexDirection: 'row', backgroundColor:'#fff',padding:10}}>
                    <View>
                        <PlaceholderMedia style={{paddingLeft:10}} size={100}/>
                    </View>
                    <View style={{flex:1, marginLeft:10, justifyContent:'center'}}>
                        <PlaceholderLine width={90} height={16}/>
                        <PlaceholderLine width={50} height={11}/>
                        <PlaceholderLine width={70} height={11}/>
                        <PlaceholderLine width={60} height={11}/>
                        <View style={{alignItems:'flex-end',paddingRight:5,}}>
                        <PlaceholderLine width={15} height={16}/>
                        </View>
                    </View>
                  </View>
                </View>
                <View style={{padding:7}}>
                  <View style={{ flexDirection: 'row', backgroundColor:'#fff',padding:10}}>
                    <View>
                        <PlaceholderMedia style={{paddingLeft:10}} size={100}/>
                    </View>
                    <View style={{flex:1, marginLeft:10, justifyContent:'center'}}>
                        <PlaceholderLine width={90} height={16}/>
                        <PlaceholderLine width={50} height={11}/>
                        <PlaceholderLine width={70} height={11}/>
                        <PlaceholderLine width={60} height={11}/>
                        <View style={{alignItems:'flex-end',paddingRight:5,}}>
                        <PlaceholderLine width={15} height={16}/>
                        </View>
                    </View>
                  </View>
                </View>
                <View style={{padding:7}}>
                  <View style={{ flexDirection: 'row', backgroundColor:'#fff',padding:10}}>
                    <View>
                        <PlaceholderMedia style={{paddingLeft:10}} size={100}/>
                    </View>
                    <View style={{flex:1, marginLeft:10, justifyContent:'center'}}>
                        <PlaceholderLine width={90} height={16}/>
                        <PlaceholderLine width={50} height={11}/>
                        <PlaceholderLine width={70} height={11}/>
                        <PlaceholderLine width={60} height={11}/>
                        <View style={{alignItems:'flex-end',paddingRight:5,}}>
                        <PlaceholderLine width={15} height={16}/>
                        </View>
                    </View>
                  </View>
                </View>
                <View style={{padding:7}}>
                  <View style={{ flexDirection: 'row', backgroundColor:'#fff',padding:10}}>
                    <View>
                        <PlaceholderMedia style={{paddingLeft:10}} size={100}/>
                    </View>
                    <View style={{flex:1, marginLeft:10, justifyContent:'center'}}>
                        <PlaceholderLine width={90} height={16}/>
                        <PlaceholderLine width={50} height={11}/>
                        <PlaceholderLine width={70} height={11}/>
                        <PlaceholderLine width={60} height={11}/>
                        <View style={{alignItems:'flex-end',paddingRight:5,}}>
                        <PlaceholderLine width={15} height={16}/>
                        </View>
                    </View>
                  </View>
                </View>
                
            </Placeholder>
            
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f8f7fd'
    },
})
