import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,TextInput,LogBox,Alert,FlatList } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo,AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import RNModal from 'react-native-modal';
import { Picker } from '@react-native-community/picker';
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function Report({route,navigation}) {
        const[name, setTitle] = useState('');
        const[details, setDetails] = useState('');
        const [image, setImage] = useState(null);
        const [House,setHouse] = useState('');
        const [houses, setHouses] = useState('');
        const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          //aspect: [4, 3],
          quality: 1,
          multiple: true,
          allowsMultipleSelection: true,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

      const load  = async() =>{
        let uid = await AsyncStorage.getItem("uid");
        fetch('https://app.rthouse.ml/listbooks.php?uid='+uid)
            .then((response) => response.json())
            .then((json) => setHouse(json))
            .catch((error) => console.error(error))
     }

     const handlePress =  async () => {
      try{
        if(!houses){
          Alert.alert('แจ้งเตือน!','กรุณาเลือกห้องพัก');
        }else if(!name){
          Alert.alert('แจ้งเตือน!','กรุณากรอกเรื่อง');
        }
        else if(!image){
          Alert.alert('แจ้งเตือน!','กรุณาอัพโหลดรูปสลิปโอนเงิน');
        }else{
                  setLoading(true);
        let filename = image.split('/').pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        let formData = new FormData();
        let uid = await AsyncStorage.getItem("uid");
        formData.append('photo', { uri: image, name: filename, type,  });
        formData.append('uid',uid)
        formData.append('idh',houses)
        formData.append('title',name)
        formData.append('details',details)
        fetch('https://app.rthouse.ml/report.php', {
          method: 'POST',
          body: formData,  
          headers: {
            'Accept': 'application/json',
            'content-type': 'multipart/form-data',
          },
        }).then((response) => response.json())
                  .then((responseJson) => {
                      if(responseJson==='แจ้งปัญหาสำเร็จ'){
                          setLoading(false);
                          Alert.alert('แจ้งเตือน!',responseJson);
                          navigation.goBack();
                      }else{
                          setLoading(false);
                          Alert.alert('แจ้งเตือน!',responseJson);
                      }
                    
                  }).catch((error) => {
                    console.log(error);
                  });
                }
      } catch(e){
          console.log(e);
      }
  }

            useEffect(() => {
            load()
            }, [])

    return (
        <View style={styles.container}>
            <Appbar.Header style={{backgroundColor:'#749d63'}}>
  <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
  <Appbar.Content title="การแจ้งปัญหา" color="white" />
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
            <Text style={{fontSize:25,fontFamily:'Kanits',paddingTop:10,textAlign: 'center'}}>การแจ้งปัญหา</Text>
            
            <View style={{paddingHorizontal:30,paddingTop:20}}>
            <View style={{paddingTop:10}}></View>

            <View style={styles.TextInput}>
            <Picker
        selectedValue={houses}
        mode= "dropdown"
        style={{ height: '100%', width: '100%' }}
        placeholderTextColor='#fff'
        onValueChange={(itemValue, itemIndex) => setHouses(itemValue)}
      >
        <Picker.Item label="เลือกห้องพัก" value="" color="#000" />
        {House? House.map(item => (
        <Picker.Item key={item} label={item.name} value={item.idh} />
        )):null}
      </Picker>
            </View>
            <View style={{paddingTop:10}}></View>
            <View style={styles.TextInput}>
            <AntDesign name="edit" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
                placeholder='เรื่อง'
                placeholderTextColor='#abcaa0'
                style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
                //autoCorrect={true}
                //autoCapitalize={false}
                textContentType='name'
                //value={email}
                onChangeText={(txt) => setTitle(txt)}
                />
            </View>
            <View style={{paddingTop:10}}></View>
            
            <View style={styles.textAreaContainer} >
            <AntDesign name="edit" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
    <TextInput
      style={styles.textArea}
      underlineColorAndroid="transparent"
      placeholder="รายละเอียด"
      placeholderTextColor="#abcaa0"
      onChangeText={(txt) => setDetails(txt)}
      numberOfLines={10}
      multiline={true}
    />
  </View>
  <View style={{paddingTop:10}}></View>
            </View>
  <View style={{paddingHorizontal:100}}>
           <View style={{backgroundColor:'#749d63',}}>
                <Image source={ image ? { uri: image } : require('./img/slip.png')} style={{ width: 150,height:150  }} />
           </View>
           <TouchableOpacity style={{backgroundColor:'#fff',paddingTop:7,paddingBottom:7}} onPress={() =>pickImage()}>
               <Text style={{textAlign: 'center',fontFamily:'Kanits',paddingTop:5,fontSize:20}}>อัปโหลดรูปภาพ</Text>
           </TouchableOpacity>
           <View style={{paddingTop:20,justifyContent: 'center',alignItems: 'center'}}>
               <TouchableOpacity style={{backgroundColor:'#749d63',borderRadius:10,padding:10}} onPress={() => handlePress()}>
                   <Text style={{fontSize:18,fontFamily:'Kanits',color:'white',paddingHorizontal: 20}}>แจ้งปัญหา</Text>
               </TouchableOpacity>
           </View>
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
    textRegis: {
        textAlign: 'center',
        color:'#749d63',
        fontSize:20,
        paddingTop:7,
        paddingBottom:7,
        fontFamily:'Kanit'
    },
    TextInput: {
        width: '100%',
        height:45,
        //borderRadius:8,
        backgroundColor: '#749d63', 
        paddingHorizontal:10,
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
        borderRadius:3
    },
    textAreaContainer: {
        backgroundColor: '#749d63',
        display: 'flex',
        flexDirection:'row',
        padding: 5,
        paddingHorizontal:10,
      },
      textArea: {
        height: 150,
        justifyContent: "flex-start",
        textAlignVertical: 'top',
        color:'#fff',
        fontSize:16,
        fontFamily:'Kanits',
        paddingHorizontal:12
      }
})
