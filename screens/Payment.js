import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,TextInput,LogBox,Alert } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo,AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Payment({route,navigation}) {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          //aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

      const handlePress =  async () => {
        try{
          if(image!==null){
              setLoading(true);
          let filename = image.split('/').pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          let formData = new FormData();
          let uid = await AsyncStorage.getItem("uid");
          formData.append('photo', { uri: image, name: filename, type,  });
          formData.append('uid',uid)
          formData.append('idb',route.params.id)
          formData.append('id_bk',route.params.id_bk)
          fetch('https://app.rthouse.ml/payment.php', {
            method: 'POST',
            body: formData,  
            headers: {
              'Accept': 'application/json',
              'content-type': 'multipart/form-data',
            },
          }).then((response) => response.json())
                    .then((responseJson) => {
                        if(responseJson==='แจ้งชำระเงินสำเร็จ'){
                            setLoading(false);
                            Alert.alert('แจ้งเตือน!',responseJson);
                            navigation.replace('Profile')
                        }else{
                            setLoading(false);
                            Alert.alert('แจ้งเตือน!',responseJson);
                        }
                      
                    }).catch((error) => {
                      console.log(error);
                    });
                  }else{
                    Alert.alert('แจ้งเตือน!','กรุณาอัพโหลดรูปสลิปโอนเงิน');
                  }
        } catch(e){
            console.log(e);
        }
    }

    useEffect(() => {
    
      }, []);
      
    return (
        <View style={styles.container}>
            <Appbar.Header style={{backgroundColor:'#749d63'}}>
  <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
  <Appbar.Content title="แจ้งชำระเงิน" color="white" />
</Appbar.Header>
            <View style={{paddingTop:20}}>
            <ProgressDialog
    title="รอซักครู่"
    activityIndicatorColor="blue"
    activityIndicatorSize="large"
    message="กำลังโหลด..."
    visible={loading}
/>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{fontSize:25,fontFamily:'Kanits',paddingTop:10,textAlign: 'center',textDecorationLine: 'underline'}}>แจ้งชำระเงิน</Text>
            <View style={{paddingTop:20,justifyContent: 'center',paddingLeft:50}}>
                <Text style={{fontSize:18,fontFamily:'Kanits'}}>ห้องพัก : {route.params.name}</Text>
                <Text style={{fontSize:18,fontFamily:'Kanits'}}>ค่ามัดจำ : {route.params.deposit}฿</Text>
                <Text style={{fontSize:18,fontFamily:'Kanits'}}>ค่าห้อง : {route.params.price}฿</Text>
                <Text style={{fontSize:18,fontFamily:'Kanits',textDecorationLine: 'underline'}}>รวม : {Number(route.params.price)+Number(route.params.deposit)}฿</Text>
            </View>
            <View style={{padding:10,margin:30,backgroundColor:'#dbe5dd',borderRadius:5}}>
                <Text style={{fontSize:18,fontFamily:'Kanits',textAlign: 'center',color:'#818784'}}>ช่องทางการชำระเงิน</Text>
                <Text style={{paddingLeft:10,fontFamily:'Kanits',fontSize:18,color:'#505f4c'}}>ธนาคาร : กรุงไทย</Text>
                <Text style={{paddingLeft:10,fontFamily:'Kanits',fontSize:18,color:'#505f4c'}}>เลขบัญชี : 6552611214</Text>
                <Text style={{paddingLeft:10,fontFamily:'Kanits',fontSize:18,color:'#505f4c'}}>ชื่อบัญชี : มารี เร่งมา</Text>
                <View style={{ borderBottomColor: '#9c9e9c',borderBottomWidth: 3,marginHorizontal:20,paddingBottom:10}} />
                <Text style={{paddingLeft:10,fontFamily:'Kanits',fontSize:18,color:'#505f4c',paddingTop:10}}>พร้อมเพย์ : 0865526652</Text>
                <Text style={{paddingLeft:10,fontFamily:'Kanits',fontSize:18,color:'#505f4c'}}>ชื่อบัญชี : มารี เร่งมา</Text>
            </View>
            <View style={{paddingHorizontal:100}}>
           <View style={{backgroundColor:'#749d63',}}>
                <Image source={ image ? { uri: image } : require('./img/slip.png')} style={{ width: 150,height:150  }} />
           </View>
           <TouchableOpacity style={{backgroundColor:'#fff',paddingTop:7,paddingBottom:7}} onPress={() =>pickImage()}>
               <Text style={{textAlign: 'center',fontFamily:'Kanits',paddingTop:5,fontSize:20}}>อัปโหลดสลิป</Text>
           </TouchableOpacity>
           </View>
           <View style={{paddingTop:20,justifyContent: 'center',alignItems: 'center'}}>
               <TouchableOpacity style={{backgroundColor:'#749d63',borderRadius:10,padding:10}} onPress={() => handlePress()}>
                   <Text style={{fontSize:18,fontFamily:'Kanits',color:'white',paddingHorizontal: 20}}>แจ้งชำระเงิน</Text>
               </TouchableOpacity>
           </View>
           <View style={{padding:10}}>

           </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f7f6fc',
    },
})
