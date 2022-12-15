import React,{ useState} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput, ScrollView,Alert } from 'react-native'
import { useFonts } from 'expo-font';
import { FontAwesome5,FontAwesome } from '@expo/vector-icons'; 

export default function Reset({navigation}) {
    const [email,setEmail] = useState('');
    const [tel,setTel] = useState('');
    const [loaded] = useFonts({
        'Kanit': require('./font/Kanit-Light.ttf'),
        'Kanits': require('./font/Kanit-Light.ttf'),
      });
      
      if (!loaded) {
        return null;
      }

      const handlePress = async () => {
        try {
            if (!email) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกอีเมล!');
              } else if (!tel) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์!');
              } else if (tel.length!==10) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10ตัว!');
              } else{
            fetch('https://app.rthouse.ml/reset.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
          email: email,
       
          tel,tel
       
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
      
              if(responseJson === 'ส่งรหัสยืนยันในอีเมลสำเร็จ')
              {
                  //AsyncStorage.setItem("Email",email);
                  navigation.navigate('Otp',{email:email});
              }
              else{
                Alert.alert('แจ้งเตือน!',responseJson);
              }
      // Showing response message coming from server after inserting records.
       //       Alert.alert(responseJson);
             // navigation.navigate('Profile');
            }).catch((error) => {
              console.log(error);
            });

        }} catch (err) {
            console.log(err);
        }
    }
      
    return (
        <View style={styles.container}>
            <Image source={require('./img/top.png')} resizeMode='stretch' style={{width: '100%', height: '20%'}}/>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{fontFamily:'Kanit',textAlign:'center',fontSize:40}}>
                ลืมรหัสผ่าน
            </Text>
            <View style={{paddingHorizontal:30,paddingTop:20}}>
            
            <View style={styles.TextInput}>
                <FontAwesome name="send" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
                placeholder='อีเมล'
                placeholderTextColor='#abcaa0'
                style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
                //autoCorrect={true}
                //autoCapitalize={false}
                autoCompleteType='email'
                keyboardType='email-address'
                textContentType='emailAddress'
                value={email}
                onChangeText={(email) => setEmail(email)}
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
                value={tel}
                onChangeText={(txt) => setTel(txt)}
                />
            </View>
            <View style={{paddingTop:10}}></View>
            
            
            <View style={{paddingTop:10}}>
                <TouchableOpacity style={{backgroundColor: '#FFFFFF',borderRadius:10}} onPress={()=>handlePress()}>
                    <Text style={styles.textRegis}>ลืมรหัสผ่าน</Text>
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
    }
})
