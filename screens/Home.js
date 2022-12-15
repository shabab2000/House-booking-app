import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';

export default function Home({navigation}) { //สร้าง function ชื่อ Home
    const [loaded] = useFonts({ 
        'Kanit': require('./font/Kanit-Medium.ttf'),
      });
      
      if (!loaded) {
        return null;
      }
      
    return (
        <View style={styles.container}>
            <Image source={require('./img/home.png')} style={{position: 'absolute',width: '100%',height: '100%'}}/>
            <View style={{alignItems: 'center',paddingTop:90}}>
                <Image source={require('./img/logo.png')} style={{width: 210, height: 250}}/>
            </View>
            <View style={{paddingHorizontal:30,paddingTop:30}}>
            <View>
                <TouchableOpacity style={{backgroundColor: '#FFFFFF',borderRadius:10}} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.textRegis}>สมัครสมาชิก</Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop:20,paddingBottom:50}}>
                <TouchableOpacity style={{backgroundColor: '#749d63',borderRadius:10}} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.textLogin}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
            </View>

            </View>
            {/* <Image source={require('./img/bottom.png')} style={{width: '100%', height: '20%'}}/> */}
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
    }
})
