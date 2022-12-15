import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,FlatList,Alert,TextInput,ActivityIndicator } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { ProgressDialog } from 'react-native-simple-dialogs';

export default function EditProfile({route,navigation}) {

    const [house,setHouse] = useState('');
    const [user, setUser] = useState('');
    const [image, setImage] = useState('');
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

    const load = async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");

            if(uid!== null) {
                fetch('https://app.rthouse.ml/profile.php?uid='+uid)
                .then((response) => response.json())
                .then((json) => setUser(json))
                .catch((error) => console.error(error))
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handlePress = async () => {
        try{
            let uid = await AsyncStorage.getItem("uid");
          if(image){
              setLoading(true);
          let filename = image.split('/').pop();
          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          let formData = new FormData();
          formData.append('photo', { uri: image, name: filename, type,  });
          formData.append('email',user.email)
          formData.append('tel',user.tel)
          formData.append('name',user.name)
          formData.append('img','img')
          formData.append('id',uid)
  
          fetch('https://app.rthouse.ml/updateprofile.php', {
            method: 'POST',
            body: formData,  
            headers: {
              'Accept': 'application/json',
              'content-type': 'multipart/form-data',
            },
          }).then((response) => response.json())
                    .then((responseJson) => {
                      setLoading(false);
                        Alert.alert('แจ้งเตือน!',responseJson);
                        navigation.goBack();
                    }).catch((error) => {
                      console.log(error);
                    });
                  }else{
  
                    if (!user.name) {
                      Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อด้วย!');
                    }else if (!user.tel) {
                      Alert.alert('แจ้งเตือน!','กรุณากรอกเอร์โทรศัพท์!');
                    }else{
                      setLoading(!loading);
                      console.log(uid)
                  fetch('https://app.rthouse.ml/updateprofile.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
             
                tel: user.tel,
                name: user.name,
                id: uid
             
              })
             
            }).then((response) => response.json()) 
                  .then((responseJson) => {
            
                    if(responseJson === 'อัพเดทโปรไฟล์สำเร็จ')
                    {
                      setLoading(false);
                      Alert.alert('แจ้งเตือน!',responseJson);
                      navigation.goBack();
                    }
                    else{
                      setLoading(false);
                      Alert.alert('แจ้งเตือน!',responseJson);
                    }
                  }).catch((error) => {
                    console.log(error);
                  });
              }
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
  <Appbar.Content title="แก้ไขโปรไฟล์" color="white" />
</Appbar.Header>
            <ProgressDialog
    title="รอซักครู่"
    activityIndicatorColor="blue"
    activityIndicatorSize="large"
    message="กำลังโหลด..."
    visible={loading}
/>
            <ScrollView showsVerticalScrollIndicator={false}>
            {user?
            <View style={{paddingHorizontal:30,paddingTop:30}}>
            <View style={{alignItems: 'center',paddingBottom:10}}>
            <Image source={{uri:image?image:user.img}} style={{width:150, height:150, borderRadius:100}}/>
            </View>
            <View style={{paddingTop:10,paddingHorizontal:60}}>
    
                <TouchableOpacity style={{ backgroundColor: '#749d63',borderRadius:10}} onPress={() =>pickImage()}>
                    <Text style={{color:'#fff',fontSize:18,padding:7,textAlign: 'center',fontFamily:'Kanits'}}>อัปโหลดรูปโปรไฟล์</Text>
                </TouchableOpacity>
            </View>
            <Text style={{fontFamily:'Kanits',fontSize:18}}>อีเมล : {user.email}</Text>
            <View style={{paddingTop:10}}></View>
            <View style={styles.TextInput}>
                <FontAwesome5 name="user-alt" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
                placeholder='ชื่อ-สกุล'
                placeholderTextColor='#abcaa0'
                style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
                //autoCorrect={true}
                //autoCapitalize={false}
                textContentType='name'
                value={user.name}
                onChangeText={(txt) => setUser({...user, name: txt})}
                />
            </View>
            
            <View style={{paddingTop:10}}></View>
            <View style={styles.TextInput}>
                <FontAwesome name="phone" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
                placeholder='เบอร์โทรศัพท์'
                placeholderTextColor='#abcaa0'
                style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
                //autoCorrect={true}
                //autoCapitalize={false}
                autoCompleteType='tel'
                keyboardType='phone-pad'
                textContentType='telephoneNumber'
                maxLength={10}
                value={user.tel}
                onChangeText={(txt) => setUser({...user, tel: txt})}
                />
            </View>
            
            <View style={{paddingTop:30}}>
    
                <TouchableOpacity style={{ backgroundColor: '#FFFFFF',borderRadius:10}} onPress={() => handlePress()}>
                    <Text style={styles.textRegis}>แก้ไขโปรไฟล์</Text>
                </TouchableOpacity>
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
        backgroundColor:'#f8f7fd'
    },
    textRegis: {
        textAlign: 'center',
        color:'#749d63',
        fontSize:20,
        paddingTop:7,
        paddingBottom:7,
        fontFamily:'Kanit'
    },
    textLogin: {
        textAlign: 'center',
        color:'#FFFFFF',
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
    },
})
