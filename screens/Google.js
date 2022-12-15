import React,{ useState} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput, ScrollView,Alert } from 'react-native'
import { useFonts } from 'expo-font';
import { FontAwesome5,FontAwesome } from '@expo/vector-icons';
import RNModal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Google({route,navigation}) {
    const [isAccept, setAccept] = useState(false);
    const [loaded] = useFonts({
        'Kanit': require('./font/Kanit-Light.ttf'),
        'Kanits': require('./font/Kanit-Light.ttf'),
      });
      
      if (!loaded) {
        return null;
      }
console.log('id: '+route.params.id)
      const handlePress = async () => {
        try {
            
            fetch('https://app.rthouse.tk/google.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
          id: route.params.id,
          email: route.params.email,
          name: route.params.name,
          img: route.params.img
       
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
      console.log(responseJson)
              if(responseJson.result === 'สมัครสมาชิกสำเร็จ')
              {
                  AsyncStorage.setItem("uid",responseJson.uid);
                  navigation.replace('Dashboard');
       
              }
              else{
                Alert.alert('แจ้งเตือน!',responseJson.result);
              }if(responseJson.result === 'สมัครสมาชิกสำเร็จ')
              {
                Alert.alert('แจ้งเตือน!',responseJson.result);
                AsyncStorage.setItem("uid",responseJson.user.id);
                    navigation.replace('Dashboard');
              }
              else{
                setLoading(false);
                Alert.alert('แจ้งเตือน!',responseJson.result);
              }
            }).catch((error) => {
              console.log(error);
            });

        } catch (err) {
            console.log(err);
        }
    }
      
    return (
        <View style={styles.container}>
            <RNModal
                isVisible={true}
                animationIn='zoomIn'
                animationOut='zoomOut'
            >
                <View style={styles.modal}>
                    <Text style={{textAlign: 'center', fontSize:18}}>เงื่อนไขและข้อตกลง RT House</Text>
                <ScrollView>
                    
                        <Text style={{}}>ข้อกำหนดและเงื่อนไขการใช้เว็บไซต์หรือการใช้แอปพลิเคชัน หรือข้อตกลงการใช้เว็บไซต์หรือการใช้แอปพลิเคชัน เป็นสัญญาประเภทหนึ่งที่เจ้าของเว็บไซต์หรือแอปพลิเคชันกำหนดขึ้นเพื่อกำหนดและควบคุมเงื่อนไขลักษณะการใช้เว็บไซต์หรือแอปพลิเคชันของตนจากผู้เยี่ยมชม ผู้ใช้ หรือสมาชิกของเว็บไซต์หรือแอปพลิเคชัน เพื่อจุดประสงค์ต่างๆ เช่น
                        </Text>
                        <Text style={{}}>เพื่อให้เกิดประสิทธิภาพสูงสุดในการใช้งาน เช่น การแจ้งให้ผู้เยี่ยมชม ผู้ใช้ หรือสมาชิกของเว็บไซต์หรือแอปพลิเคชัน ทราบถึงจุดเด่น คุณลักษณะจำเพาะของเว็บไซต์หรือแอปพลิเคชัน หรือความต้องการขั้นต่ำของระบบ (Minimum System Requirements) ในการใช้เว็บไซต์หรือแอปพลิเคชันนั้นๆ
                        </Text>
                        <Text style={{}}>เพื่อป้องกันความเสียหายที่อาจเกิดขึ้นกับเว็บไซต์หรือแอปพลิเคชันจากการใช้งานไม่ถูกต้องหรือไม่ถูกวิธี เช่น การห้ามโพสข้อความรูปภาพในเว็บไซต์ที่มีขนาดใหญ่ของสมาชิกจนทำให้เว็บไซต์หรือแอปพลิเคชันทำงานช้ากว่าปกติและทำให้ระบบมีการใช้ทรัพยากรสูง (Server Load)
                        </Text>
                    </ScrollView>
                    <View style={{display:'flex',flexDirection:'row',justifyContent: 'center'}}>
                    <View style={{paddingBottom:10,paddingTop:10}}>
                        <TouchableOpacity style={{backgroundColor:'#749d63',borderRadius:10}} onPress={() => navigation.navigate("Login")}>
                            <Text style={{fontSize:20,color:'white',padding:5,fontFamily:'Kanit'}}>ไม่ยอมรับ</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{paddingLeft:90,paddingBottom:10,paddingTop:10}}>
                        <TouchableOpacity style={{backgroundColor:'#749d63',borderRadius:10}} onPress={() => handlePress()}>
                            <Text style={{fontSize:20,color:'white',padding:5,fontFamily:'Kanit'}}>ยอมรับ</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </RNModal>
            <Image source={require('./img/top.png')} resizeMode='stretch' style={{width: '100%', height: '20%'}}/>
            
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
    modal: {
        backgroundColor: '#fff',
        borderRadius:8,
        paddingHorizontal:10,
        paddingVertical:50,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5

    },
})
