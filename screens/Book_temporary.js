import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,TextInput,LogBox,Alert,Button } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo,AntDesign,MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';

export default function Book_temporary({route,navigation}) {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[idCard, setIdCard] = useState('');
    const[tel, setTel] = useState('');
    const[dateIn, setDateIn] = useState('');
    const[id,setIds] = useState('');
    const ids = Number(id)+1;
    const [user , setUser] = useState('');
    const [date, setDate] = useState(new Date());
    const [adate, setAdate] = useState('');
    const [atime, setATime] = useState('');
    const [txt, setTXT] = useState('');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [out,setOut] = useState('');
    const [outs, setOuts] = useState('');
    const [m, setM] = useState('');

    const prices = (id)=>{
        setTime(id);
        if(id==3){
            setOuts(Number(out+3));
            setPrice(route.params.price);
        }else if(id==6){
            setOuts(Number(out+6));
            setPrice(route.params.price*2);
        }
    }
  
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    
        let tempDate = new Date(currentDate) ;
        let fdate = tempDate.getDate() +'/'+(tempDate.getMonth()+1)+'/'+tempDate.getFullYear();
        let h = tempDate.getHours()+'';
        let m = tempDate.getMinutes()+'';
        let asd = m.length ==1 ? '0'+m : m;
        let abc = h.length ==1 ? '0'+h :h;
        setOut(Number(abc));
        setM(asd);
        setAdate(fdate);
        setATime(abc+':'+asd);
      };

    console.log('out: '+Number(out)+4);
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };

console.log(date)
    const users = async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");
console.log('uid: '+uid);
            if(uid!== null) {
                //setEmail(email)
                fetch('https://app.rthouse.ml/profile.php?uid='+uid)
        .then((response) => response.json())
        .then((json) => setUser(json))
        .catch((error) => console.error(error))
            }
        } catch (err) {
            console.log(err);
        }
    };
    const load = async () => {
        try {
            let uid = await AsyncStorage.getItem("uid");
            if(uid!== null) {
                fetch('https://app.rthouse.ml/bookings_tem.php')
        .then((response) => response.json())
        .then((json) => setIds(json))
        .catch((error) => console.error(error))
            }
        } catch (err) {
            console.log(err);
        }
    };

    function Script_checkID(idCard){
        if(! IsNumeric(idCard)) return false;
        if(idCard.substring(0,1)== 0) return false;
        if(idCard.length != 13) return false;
        for(i=0, sum=0; i < 12; i++)
            sum += parseFloat(idCard.charAt(i))*(13-i);
        if((11-sum%11)%10!=parseFloat(idCard.charAt(12))) return false;
        return true;
    }
    function IsNumeric(input){
        var RE = /^-?(0|INF|(0[1-7][0-7]*)|(0x[0-9a-fA-F]+)|((0|[1-9][0-9]*|(?=[\.,]))([\.,][0-9]+)?([eE]-?\d+)?))$/;
        return (RE.test(input));
    }

    const results = Script_checkID(idCard);
    const sums = route.params.price*time;
    const handlePress = async() => {
        try {
          if (!idCard) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขบัตรประชาชน!');
            } else  if (idCard.length!==13) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขบัตรประชาชนให้ครบ 13หลัก!');
            }else  if (results === false) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง!');
            } else  if (!adate) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกวันที่เข้าพัก!');
            } else  if (!atime) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเวลาเข้าพัก!');
            }  else  if (!time) {
                Alert.alert('แจ้งเตือน!','กรุณาเลือกจำนวนชั่วโมง!');
            }else{
                let uid = await AsyncStorage.getItem("uid");
                fetch('https://app.rthouse.ml/booking_tem.php', {
                    method: 'POST',
                    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
       
            ids: ids,
            name: user.name,
            email: user.email,
            idcard: idCard,
            tel: user.tel,
            id: route.params.id,
            datein: adate,
            timein: atime,
            time:time,
            uid: uid,
            price: price
       
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
      
              if(responseJson === "บันทึกการเช่าสำเร็จ")
              {
                Alert.alert('แจ้งเตือน!',responseJson);
                navigation.replace('Payment_tem',{name: route.params.name, price: route.params.price, deposit: route.params.deposit, id: route.params.id, id_bk: ids,out:outs+':'+m});
              }else{
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

    useEffect(() => {
       load()
       users()
    }, [])

    return (
        <View style={styles.container}>
            <Appbar.Header style={{backgroundColor:'#749d63'}}>
  <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
  <Appbar.Content title="สรุปการเช่า" color="white" />
</Appbar.Header>
            <View style={{paddingTop:20}}>

            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

            <Text style={{fontSize:25,fontFamily:'Kanits',textAlign: 'center',paddingTop:10,textDecorationLine: 'underline'}}>สรุปการเช่า</Text>
            <View style={{paddingTop:20,justifyContent: 'center',alignItems: 'center'}}>
                <Text style={{fontSize:18,fontFamily:'Kanits'}}>{route.params.name}</Text>
                <Text style={{fontSize:18,fontFamily:'Kanits'}}>ค่าห้อง : {route.params.price}฿/3ชั่วโมง</Text>
            </View>
            
            {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
            <View style={{padding:7,margin:20,backgroundColor:'#749d63',alignSelf:'flex-start',borderRadius:7}}>
                <Text style={{fontSize:18,fontFamily:'Kanits',color:'white'}}>กรอกข้อมูล</Text>
            </View>
        <View style={{paddingHorizontal:20,paddingTop:20}}>
            <Text style={{fontFamily:'Kanits',fontSize:16}}>ชื่อ : {user.name}</Text>
            <Text style={{fontFamily:'Kanits',fontSize:16}}>อีเมล : {user.email}</Text>
            <Text style={{fontFamily:'Kanits',fontSize:16,paddingBottom:5}}>เบอร์โทร : {user.tel}</Text>
            <View style={styles.TextInput}>
                <AntDesign name="idcard" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
                    <TextInput
                placeholder='เลขบัตรประชาชน'
                placeholderTextColor='#abcaa0'
                style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}
                //autoCorrect={true}
                //autoCapitalize={false}
                autoCompleteType='off'
                keyboardType='number-pad'
                maxLength={13}
                //value={email}
                onChangeText={(txt) => setIdCard(txt)}
                />
            </View>
           
            <View style={{paddingTop:10}}/>
                <TouchableOpacity onPress={()=> showMode('date')}>
            <View style={styles.TextInput}>
            <MaterialIcons name="date-range" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
                    {adate ?
                    <Text style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}>{adate}</Text>
                    :
                    <Text style={{flex:1,paddingHorizontal:12,color:'#abcaa0',fontSize:16,fontFamily:'Kanits'}}>เลือกวันที่เข้าพัก</Text>
                    }
            </View>
                </TouchableOpacity>

                <View style={{paddingTop:10}}/>
                <TouchableOpacity onPress={()=> showMode('time')}>
            <View style={styles.TextInput}>
            <Ionicons name="md-time" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
            {atime ?
                    <Text style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}>{atime}</Text>
                    :
                    <Text style={{flex:1,paddingHorizontal:12,color:'#abcaa0',fontSize:16,fontFamily:'Kanits'}}>เลือกเวลาเข้าพัก</Text>
                    }
            </View>
                </TouchableOpacity>

            <View style={{paddingTop:10}}></View>
            <View style={styles.TextInput}>
                <MaterialIcons name="timer" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
                <Picker
        selectedValue={time}
        mode= "dropdown"
        style={{ height: '100%', width: '100%' }}
        onValueChange={(itemValue, itemIndex) => prices(itemValue)}
      >
        <Picker.Item label="เลือกจำนวนชั่วโมง" value="" color="#fff" />
        <Picker.Item label="3 ชั่วโมง" value="3" />
        <Picker.Item label="6 ชั่วโมง" value="6" />
      </Picker>
            </View>
            <View style={{paddingTop:10}}></View>
            <TouchableOpacity style={{backgroundColor: '#FFFFFF',borderRadius:10}} onPress={()=> handlePress()}>
                    <Text style={styles.textRegis}>ยืนยันการเช่า</Text>
            </TouchableOpacity>
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
    textRegis: {
        textAlign: 'center',
        color:'#749d63',
        fontSize:20,
        paddingTop:7,
        paddingBottom:7,
        fontFamily:'Kanit'
    },
})
