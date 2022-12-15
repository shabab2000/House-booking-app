import React,{useState} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity,TextInput, ScrollView,CheckBox,Alert } from 'react-native'
import { useFonts } from 'expo-font';
import { FontAwesome5,FontAwesome } from '@expo/vector-icons'; 
import RNModal from 'react-native-modal';

export default function Register({navigation}) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecured, setPasswordSecured] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [repasswordSecured, setRePasswordSecured] = useState(true);
    const [tel, setTel] = useState('');
    const [loading, setLoading] = useState(false);
    const [show,setShow] = useState(false);
    const [isAccept, setAccept] = useState(false);

    function isEmailValid(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase())
      }
    
    const [loaded] = useFonts({
        'Kanit': require('./font/Kanit-Light.ttf'),
        'Kanits': require('./font/Kanit-Light.ttf'),
      });
      
      if (!loaded) {
        return null;
      }
      
      const not_accept = () => {
          setShow(false);
          setAccept(false);
      };
      const accept = () => {
        setShow(false);
        setAccept(true);
      }

      const handlePress = async () => {
        try {
             if (!email) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกอีเมล!');
            } else if (!isEmailValid(email)) {
                Alert.alert('แจ้งเตือน!','รูปแบบอีเมลไม่ถูกต้อง!');
            } else if (!password) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่าน!');
            } else if (password.length<6) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกรหัสผ่าน 6ตัวขึ้นไป!');
            } else if (!confirmPassword) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกยืนยันรหัสผ่าน!');
            } else if (password !== confirmPassword) {
                Alert.alert('แจ้งเตือน!','กรุณายืนยันรหัสผ่านให้ตรงกัน!');
            } else if (!name) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกชื่อ-สกุล!');
            }  else if (!tel) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์!');
            } else if (tel.length!==10) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10ตัว!');
            } else if (!isAccept) {
                Alert.alert('แจ้งเตือน!','กรุณากดยอมรับเงื่อนไขและข้อตกลง!');
              } else{
                fetch('https://app.rthouse.ml/register.php', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                   
                      email: email,
                      password: password,
                      tel: tel,
                      name: name,
                   
                    })
                   
                  }).then((response) => response.json()) 
                        .then((responseJson) => {
                  
                          if(responseJson === 'สมัครสมาชิกสำเร็จ')
                          {
                            Alert.alert('แจ้งเตือน!',responseJson);
                            navigation.replace('Login');
                              //AsyncStorage.setItem("Email",email);
                              
                   
                          }
                          else{
                            setLoading(false);
                            Alert.alert('แจ้งเตือน!',responseJson);
                          }
                  // Showing response message coming from server after inserting records.
                   //       Alert.alert(responseJson);
                         // navigation.navigate('Profile');
                        }).catch((error) => {
                          console.log(error);
                        });
              }
            } catch (err) {
              console.log(err);
          }
        }

    return (
        <View style={styles.container}>
        <RNModal
                isVisible={show}
                animationIn='zoomIn'
                animationOut='zoomOut'
            >
                <View style={styles.modal}>
                    <Text style={{textAlign: 'center', fontSize:18,paddingBottom:5}}>เงื่อนไขและข้อตกลง RT House</Text>
                <ScrollView>
                    
                        <Text style={{fontFamily:'Kanits'}}> ● เพื่อให้เกิดประสิทธิภาพสูงสุดในการใช้งาน เช่น การแจ้งให้ผู้เยี่ยมชม ผู้ใช้ หรือสมาชิกของเว็บไซต์หรือแอปพลิเคชัน ทราบถึงจุดเด่น คุณลักษณะจำเพาะของเว็บไซต์หรือแอปพลิเคชัน หรือความต้องการขั้นต่ำของระบบ (Minimum System Requirements) ในการใช้เว็บไซต์หรือแอปพลิเคชันนั้นๆ
                        </Text>
                        <Text style={{fontFamily:'Kanits'}}> ● เพื่อป้องกันความเสียหายที่อาจเกิดขึ้นกับเว็บไซต์หรือแอปพลิเคชันจากการใช้งานไม่ถูกต้องหรือไม่ถูกวิธี เช่น การห้ามโพสข้อความรูปภาพในเว็บไซต์ที่มีขนาดใหญ่ของสมาชิกจนทำให้เว็บไซต์หรือแอปพลิเคชันทำงานช้ากว่าปกติและทำให้ระบบมีการใช้ทรัพยากรสูง (Server Load)
                        </Text>
                        <Text style={{fontFamily:'Kanits'}}> ● เพื่อป้องกันความเสี่ยงจากความรับผิดทางกฎหมายของผู้เป็นเจ้าของเว็บไซต์หรือแอปพลิเคชัน หากมีการใช้เว็บไซต์หรือแอปพลิเคชันดังกล่าวที่ผิดกฎหมายหรือละเมิดสิทธิของผู้อื่น โดยผู้เยี่ยมชม ผู้ใช้ หรือสมาชิกของเว็บไซต์หรือแอปพลิเคชันนั้นๆ ซึ่งเป็นที่สำคัญที่สุด เช่น การสงวนสิทธิตามกฎหมายของผลงาน ข้อมูล และการออกแบบที่เจ้าของเว็บไซต์หรือแอปพลิเคชันเผยแพร่บนเว็บไซต์หรือแอปพลิเคชัน การห้ามโพสข้อความในเว็บไซต์หรือแอปพลิเคชันที่เป็นการละเมิดลิขสิทธิ์ของผู้อื่น (Copyright Infringement) การห้ามใช้เว็บไซต์หรือแอปพลิเคชันเป็นช่องทางหรือเครื่องมือในการทำผิดกฎหมาย และ
                        </Text>
                        <Text style={{fontFamily:'Kanits'}}> ● เพื่อจุดประสงค์จำเพาะต่างๆ ของเจ้าของแต่ละเว็บไซต์หรือแอปพลิเคชันซึ่งมีลักษณะและข้อควรระวังในการใช้ต่างกัน เช่น ในกรณีที่เว็บไซต์หรือแอปพลิเคชันนั้นมีการเสนอขายสินค้าหรือบริการ อาจมีการกำหนดข้อจำกัดความรับผิดเกี่ยวกับสินค้าและบริการที่อยู่ในเว็บไซต์หรือแอปพลิเคชัน (Limitation of Product/Service Liability) เงื่อนไขการรับประกัน (Warranty) การชำระค่าสินค้าและบริการ (Payment) นโยบายการคืนเงินและเปลี่ยนสินค้า (Refund and Return Policy) การโอนความเสี่ยงในสินค้า (Passing of Risk) หรือในกรณีที่เว็บไซต์หรือแอปพลิเคชัน มีการเก็บข้อมูลส่วนตัวของผู้เยี่ยมชม ผู้ใช้ หรือสมาชิก เจ้าของเว็บไซต์หรือแอปพลิเคชันจึงควรปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล (Data Privacy) ของประเทศไทย (รวมถึง ประเทศอื่นอีกด้วยหากผู้ใช้งานเป็นคนของชาติอื่นและกฎหมายคุ้มครองข้อมูลส่วนบุคคลของประเทศนั้นๆ มีการบังคับใช้กฎหมายนอกดินแดน เช่น สหภาพยุโรป) ซึ่งโดยหลักเกณฑ์ทั่วไป คือต้องแจ้งให้ ผู้ใช้ หรือสมาชิกของเว็บไซต์หรือแอปพลิเคชัน ทราบว่าข้อมูลส่วนตัวของตนใดบ้างที่จะถูกจัดเก็บ และจะถูกนำไปใช้ทำอะไรบ้าง มีการเปิดเผยหรือไม่ และ ผู้ใช้ หรือสมาชิกของเว็บไซต์ยินยอมให้ใช้หรือเปิดเผยข้อมูลนั้นหรือไม่
                        </Text>
                    </ScrollView>
                    <View style={{display:'flex',flexDirection:'row',justifyContent: 'center'}}>
                    <View style={{paddingBottom:10,paddingTop:10}}>
                        <TouchableOpacity style={{backgroundColor:'#749d63',borderRadius:10}} onPress={() => not_accept()}>
                            <Text style={{fontSize:20,color:'white',padding:5,fontFamily:'Kanit'}}>ไม่ยอมรับ</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{paddingLeft:90,paddingBottom:10,paddingTop:10}}>
                        <TouchableOpacity style={{backgroundColor:'#749d63',borderRadius:10}} onPress={() => accept()}>
                            <Text style={{fontSize:20,color:'white',padding:5,fontFamily:'Kanit'}}>ยอมรับ</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </RNModal>
            <Image source={require('./img/top.png')} resizeMode='stretch' style={{width: '100%', height: '20%'}}/>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{fontFamily:'Kanit',textAlign:'center',fontSize:40}}>
                สมัครสมาชิก
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
                //value={email}
                onChangeText={(txt) => setEmail(txt)}
                />
            </View>
            <View style={{paddingTop:10}}></View>
            <View style={styles.TextInput}>
            <FontAwesome5 name="lock" size={24} color="white" />
            <Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
            placeholder='รหัสผ่าน'
            placeholderTextColor='#abcaa0'
            style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
            //autoCorrect={true}
            secureTextEntry={true}
            textContentType='password'
            autoCompleteType='password'

                //value={email}
            onChangeText={(txt) => setPassword(txt)}
                />
            </View>
            <View style={{paddingTop:10}}></View>
            <View style={styles.TextInput}>
            <FontAwesome5 name="lock" size={24} color="white" />
                <Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
                placeholder='ยืนยันรหัสผ่าน'
            placeholderTextColor='#abcaa0'
            style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
            //autoCorrect={true}
            secureTextEntry={true}
            textContentType='password'
            autoCompleteType='password'
                //value={email}
            onChangeText={(txt) => setConfirmPassword(txt)}
                />
            </View>
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
                //value={email}
                onChangeText={(txt) => setName(txt)}
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
                //value={email}
                onChangeText={(txt) => setTel(txt)}
                />
            </View>
            <View style={{paddingTop:10}}></View>
            <View style={styles.checkboxContainer}>
        <CheckBox
          value={isAccept}
          onValueChange={()=>setShow(true)}
          style={styles.checkbox}
        />
        <Text style={{fontSize:16,fontFamily:'Kanits'}} onPress={() =>setShow(true)}>ฉันยอมรับ <Text style={{fontFamily:'Kanit',color:'#749d63'}}>เงื่อนไขและข้อตกลง</Text> จากทาง  RT House</Text>
      </View>
            <View>
    
                <TouchableOpacity style={{ backgroundColor: '#FFFFFF',borderRadius:10}}  onPress={handlePress}>
                    <Text style={styles.textRegis}>สมัครสมาชิก</Text>
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
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        paddingHorizontal:20
      },
})
