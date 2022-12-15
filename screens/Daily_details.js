import React,{ useState, useEffect}from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,Dimensions,Alert,Linking } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';

export default function Daily_details({route,navigation}) {

    const [active,setActive] = useState(0);
    const [images,setImg] = useState('');
    const [owner,setOwner] = useState('');

 const load  =()=> {

    fetch('https://app.rthouse.ml/slide_overnight.php?id='+route.params.id_img)
        .then((response) => response.json())
        .then((json) => setImg(json))
        .catch((error) => console.error(error))
 }
  
const owners  =()=> {

  fetch('https://app.rthouse.ml/owner.php?id='+route.params.id_owner)
      .then((response) => response.json())
      .then((json) => setOwner(json))
      .catch((error) => console.error(error))
}

  const change = (nativeEvent)=> {
        // console.log("nativeEvent:", nativeEvent) 
        if(nativeEvent) {
          const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
          if (slide !== active) {
              setActive(slide)
          }
        }
    }

    useEffect(() => {
      load()
      owners()
      }, [])

    return (
        <View style={styles.container}>
        <Appbar.Header style={{backgroundColor:'#749d63'}}>
<Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
<Appbar.Content title="รายละเอียดห้องเช่า" color="white" />
</Appbar.Header>
        
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingTop:20}}>

        </View>
        <View style={styles.wrap}>
          <ScrollView
            onScroll={({ nativeEvent })=>change(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
          >
            {
              images !=='' ?  images.map((e, index) =>
                <Image
                  key={index}
                  resizeMode="stretch"
                  style={styles.wrap}
                  source={{ uri: 'https://app.rthouse.ml/img_house/'+ e.img }}
                />
              ):null
            }
          </ScrollView>
          <View style={styles.wrapDot}>
            {
              images !=='' ? images.map((e, index) =>
                <Text
                  key={index}
                  style={active === index ? styles.dotActive : styles.dot}>●</Text>
                  ):null
            }
          </View>
        </View>
        <View style={{padding:7}}>
            <Text style={{fontSize:18,fontFamily:'Kanits',paddingLeft:10,paddingTop:10}}>{route.params.name}</Text>
            <Text style={{fontSize:18,fontFamily:'Kanits',paddingLeft:10,paddingTop:3}}>ที่ตั้ง: {route.params.address}</Text>
            <Text style={{fontSize:18,fontFamily:'Kanits',textAlign: 'center'}}>ค่าเช่าเริ่มต้น {route.params.price} บาท/คืน</Text>
            <View style={{paddingTop:20}}>
                {/* <View style={{justifyContent: 'center', alignItems:'center'}}>
                    <View style={{borderWidth:2,borderRadius:5,borderColor:'#749d63',}}>
                    <View style={{display: 'flex', flexDirection: 'row',alignItems: 'center'}}>
                        <Text style={{fontSize:18,fontFamily:'Kanits',paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5,}}>{owner.name}</Text>
                        <View style={{padding:7}}>
                        <TouchableOpacity style={{backgroundColor:'#749d63',justifyContent: 'center',borderRadius:5}} onPress={() => navigation.navigate('Owner',{id:owner.id})}>
                            <Text style={{fontSize:14,fontFamily:'Kanits',color:'white',padding:4}}>ดูหน้าหลัก</Text>
                        </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </View> */}
                
                <View style={{paddingLeft:20,paddingTop:15}}>
                    <Text style={{fontSize:16,fontFamily:'Kanits'}}>รายละเอียด</Text>
                    <Text style={{fontSize:16,fontFamily:'Kanits',paddingLeft:15}}>{route.params.details}</Text>
                </View>
                
            </View>

        </View>
        </ScrollView>
        <View style={{display: 'flex',flexDirection: 'row',justifyContent: 'center'}}>
        
                    <TouchableOpacity style={{backgroundColor:'#749d63',}} onPress={() => route.params.status == 'ไม่ว่าง'? Alert.alert('ขออภัยค่ะ!','ห้องพักนี้ไม่ว่างให้เปิดเช่าในขณะนี้'): navigation.navigate('Book_daily',{id: route.params.id, price: route.params.price, deposit: route.params.deposit, name: route.params.name,})}>
                        <Text style={{fontSize:20,fontFamily:'Kanits',paddingLeft:40,paddingRight:40,paddingTop:20,paddingBottom:20}}>เช่า</Text>
                    </TouchableOpacity>
                    
                    <View style={{padding:1,backgroundColor:'#fff'}}></View>
                    <TouchableOpacity style={{backgroundColor:'#749d63',}} onPress={()=> Linking.openURL("tel:"+route.params.tel)}>
                    <Text style={{fontSize:20,fontFamily:'Kanits',paddingLeft:40,paddingRight:40,paddingTop:20,paddingBottom:20}}>โทร {route.params.tel}</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f8f7fd'
    },
    wrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.25, // 25% window
        //borderRadius:35,
      },
      wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
      },
      dot: {
        margin: 3,
        color: '#888'
      },
      dotActive: {
        margin: 3,
        color: 'black'
      }
})
