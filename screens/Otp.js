import React,{useState,useEffect} from 'react'
import { StyleSheet, 
         Text,
         View,
         StatusBar,
         Alert,
         TouchableWithoutFeedback,
         Keyboard,
         Image,
         TextInput,
         TouchableOpacity,
         ScrollView,
         Button,
         ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeycodeInput } from './Pin-code';

export default function Otp({route,navigation}) {

    const [email,setEmail] = useState(route.params.email);
    const [value, setValue] = useState('');
    const [numeric, setNumeric] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');

    const handlePress = async () => {
      try {
        if(!value){
          Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสยืนยัน OTP')
        }else{
            fetch('https://app.rthouse.ml/check_otp.php', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
             
                email: email,
                otp:value,
                ref:otp.ref

              })
            }).then((response) => response.json()) 
                  .then((responseJson) => {
            
                    if(responseJson === 'success')
                    {
                      navigation.replace('ResetPass',{email:email});
                    }
                    else{
                      Alert.alert('แจ้งเตือน!',responseJson);
                    }
                  }).catch((error) => {
                    console.log(error);
                  });
                }
      } catch (err) {
          console.log(err);
      }
  }

    const load = async () => {
        try {
                fetch('https://app.rthouse.ml/otp.php?email='+email)
      .then((response) => response.json())
      .then((json) => setOtp(json))
      .catch((error) => console.error(error))
            
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        load();
        const unsubscribe = navigation.addListener('focus', () => {
        {load()}
        });
        return unsubscribe;
        }, [navigation]);
    
    return (
      
      <View style={styles.container}>
           <Image source={require('./img/top.png')} resizeMode='stretch' style={{width: '100%', height: '20%'}}/>
        <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{fontFamily:'Kanit',textAlign:'center',fontSize:40,paddingTop:30}}>
                ยืนยันรหัส OTP
            </Text>
   {/* <ProgressDialog
    title="รอซักครู่"
    activityIndicatorColor="blue"
    activityIndicatorSize="large"
    message="กำลังโหลด..."
    visible={loading}
/> */}
        {/* <StatusBar
        animated={true}
        backgroundColor="#00938c"/> */}
        
        <View style={{alignItems: 'center'}}>
        <Text style={{alignItems: 'center',color: '#000',fontSize:16,paddingTop:10,fontFamily:'Kanit'}}>รหัสยืนยันตัวตนจะถูกส่งไปทางอีเมล</Text>
        <Text style={{alignItems: 'center',color: '#749d63',fontSize:18,paddingTop:10,fontWeight: 'bold'}}>{email}</Text>
        <Text style={{alignItems: 'center',color: '#000',fontSize:14,paddingBottom:30,paddingTop:10,fontFamily:'Kanit'}}>รหัสอ้างอิง : { otp ? otp.ref : 5}</Text>
        <KeycodeInput
        numeric={numeric}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        //onComplete={() => handlePress()}
        />
        
        </View>
        <View style={{paddingTop:20,paddingHorizontal:20}}>
                <TouchableOpacity style={{backgroundColor: '#FFFFFF',borderRadius:10}} onPress={()=> handlePress()}>
                    <Text style={styles.textRegis}>ยืนยันรหัส OTP</Text>
                </TouchableOpacity>
            </View>
      {/* <View style={styles.signUpTextView}>
        <Text style={styles.signUpText}>ยังไม่ได้รับรหัสยืนยัน?</Text>
        <TouchableOpacity onPress={() => resend()}>
          <Text style={[styles.signUpText, { color: '#ffbb3b' }]}>
            {' ส่งอีเมลอีกครั้ง'}
          </Text>
        </TouchableOpacity>
      </View> */}
      
            </ScrollView>
            </View>
            
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#f8f7fd'
    },
      welcomeText: {
        fontSize: 30,
        fontWeight: '900',
        color: '#000',
        alignSelf: 'center',
        paddingTop:50
      },
      loginText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
      },
      input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 6,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#f0f',
      },
      fpText: {
        alignSelf: 'flex-end',
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
      },
      loginButton: {
        backgroundColor: '#833471',
        paddingVertical: 12,
        borderRadius: 6,
        marginTop: 20,
      },
      loginButtonText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fafafa',
        alignSelf: 'center',
      },
      loginWithBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
      },
      iconButton: {
        backgroundColor: '#D3D3D3',
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 20,
      },
      signUpTextView: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      signUpText: {
        color: '#f0f0f0',
        fontSize: 16,
        fontWeight: '500',
      },
      inputView: {
        width: '100%',
        height:45,
        borderRadius:8,
        backgroundColor: '#f1f3f6', 
        paddingHorizontal:10,
        display: 'flex',
        flexDirection:'row',
        alignItems: 'center',
      },
      image: {
        paddingTop:35,
        height: '100%',
      },
      logo: {

      },
      textRegis: {
        textAlign: 'center',
        color:'#749d63',
        fontSize:20,
        paddingTop:7,
        paddingBottom:7,
        fontFamily:'Kanit'
    },
})
