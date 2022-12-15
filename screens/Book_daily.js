import React,{ useState, useEffect }from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,TextInput,LogBox,Alert,Button } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo,AntDesign,MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';
import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Book_daily({route,navigation}) {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[idCard, setIdCard] = useState('');
    const[tel, setTel] = useState('');
    const[dateIn, setDateIn] = useState('');
    const[id,setIds] = useState('');
    const ids = Number(id)+1;
    const [user , setUser] = useState('');
    const [date, setDate] = useState(new Date());
    const [dates, setDates] = useState(new Date());
    const [adate, setAdate] = useState('');
    const [zdate, setZdate] = useState('');
    const [atime, setATime] = useState('');
    const [txt, setTXT] = useState('');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [modes, setModes] = useState('date');
    const [shows, setShows] = useState(false);
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [datein, setDatein] = useState('');
    const [dateout, setDateOut] = useState('');
    const diffTime = Math.abs(new Date(dateout) - new Date(datein));
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
console.log(datein + " milliseconds");
console.log(diffDays + " days");
  const prices = route.params.price*diffDays;
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
        let d1 = (tempDate.getMonth()+1)+'/'+tempDate.getDate()+'/'+tempDate.getFullYear();
        setDatein(d1);
        if(h>=11){
            if(h==11&&m>=30){
                setPrice(550)
            } else if (h>=12){
                setPrice(550)
            }
        }else if(h>=9){
            setPrice(650)
        }else if(h>=5){
            setPrice(750)
        }
console.log('price '+price);
        setAdate(fdate);//วันที่เข้าพัก
        //setATime('เวลาเข้าพัก '+abc+':'+asd);
      };
      console.log('date1: '+date-dates)
    const onChanges = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShows(Platform.OS === 'ios');
        setDates(currentDate);
    
        let tempDate = new Date(currentDate) ;
        let fdate = tempDate.getDate() +'/'+(tempDate.getMonth()+1)+'/'+tempDate.getFullYear();
        let h = tempDate.getHours()+'';
        let m = tempDate.getMinutes()+'';
        let asd = m.length ==1 ? '0'+m : m;
        let abc = h.length ==1 ? '0'+h :h;
        let d1 = (tempDate.getMonth()+1)+'/'+tempDate.getDate()+'/'+tempDate.getFullYear();
        setDateOut(d1);
        let tempDates = new Date(adate)-new Date(zdate);
        console.log('p'+tempDates);
        let tempDate1 = new Date(zdate);

console.log('price '+price);
        setZdate(fdate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };

      const showModes = (currentMode) => {
        setShows(true);
        setModes(currentMode);
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

    const handlePress = async() => {
        try {
          if (!idCard) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขบัตรประชาชน!');
            } else  if (idCard.length!==13) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขบัตรประชาชนให้ครบ 13หลัก!');
            } else  if (results === false) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง!');
            } else  if (!datein) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกวันที่เข้าพัก!');
            } else  if (!dateout) {
                Alert.alert('แจ้งเตือน!','กรุณากรอกวันที่ออก!');
            }  else{
                let uid = await AsyncStorage.getItem("uid");
                fetch('https://app.rthouse.ml/booking_daily.php', {
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
            datein: datein,
            dateout: dateout,
            price: prices,
            day: diffDays,
            uid: uid,
       
        })
       
      }).then((response) => response.json()) 
            .then((responseJson) => {
      
              if(responseJson === "บันทึกการเช่าสำเร็จ")
              {
                Alert.alert('แจ้งเตือน!',responseJson);
                navigation.replace('Payment_daily',{name: route.params.name, price: route.params.price, deposit: route.params.deposit, id: route.params.id, id_bk: ids});
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
                <Text style={{fontSize:18,fontFamily:'Kanits'}}>ค่าเช่าเริ่มต้น : {route.params.price}฿/คืน</Text>
               
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
            {shows && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dates}
          mode={modes}
          is24Hour={true}
          display="default"
          onChange={onChanges}
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
                <TouchableOpacity onPress={()=> showModes('date')}>
            <View style={styles.TextInput}>
            <MaterialIcons name="date-range" size={24} color="white" /><Text style={{fontSize:20,color:'white'}}> |</Text>
                    {zdate ?
                    <Text style={{flex:1,paddingHorizontal:12,color:'#fff',fontSize:16,fontFamily:'Kanits'}}>{zdate}</Text>
                    :
                    <Text style={{flex:1,paddingHorizontal:12,color:'#abcaa0',fontSize:16,fontFamily:'Kanits'}}>วันที่ออก</Text>
                    }
            </View>
                </TouchableOpacity>

               

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
