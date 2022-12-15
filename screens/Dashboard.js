import React,{useState, useEffect }from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Dimensions,ScrollView,Image, Alert } from 'react-native'
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import { Appbar } from 'react-native-paper';
import { useFonts } from 'expo-font';
import ActionSheet from '@grovertb/react-native-actionsheet'

export default function Dashboard({navigation}) {
    const images = [
      'https://rthouse.ml/app/a.jpg',
      'https://rthouse.ml/app/slide/2.png',
      'https://rthouse.ml/app/slide/3.png',
      
      ]
    const [active,setActive] = useState(0);
    const [select,setSelected] = useState('');
    const [select1,setSelected1] = useState('');
  const change = (nativeEvent)=> {
        // console.log("nativeEvent:", nativeEvent)
        if(nativeEvent) {
          const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
          if (slide !== active) {
              setActive(slide)
          }
        }
    }
    const actionSheetRef = React.useRef();
    const actionSheetRef1 = React.useRef();

    const _handleShowActionSheet = () => {
      actionSheetRef.current.show()
    }

    const _handleShowActionSheet1 = () => {
      actionSheetRef1.current.show()
    }

    const handlePress = index => {
      setSelected(index);
      if(index==0){
        navigation.navigate('House')
      }else if(index==1) {
        navigation.navigate('Apartment')
      }else{
        null
      }
    }

    const handlePress1 = index => {
      setSelected(index);
      if(index==0){
        navigation.navigate('Temporary')
      }else if(index==1) {
        navigation.navigate('Daily')
      }else{
        null
      }
    }


    const [loaded] = useFonts({ 
      'Kanit': require('./font/Kanit-Medium.ttf'),
      'Kanits': require('./font/Kanit-Light.ttf'),
    });
    if (!loaded) {
      return null;
    }

    return (
        <View style={styles.container}>
        <Appbar.Header style={{backgroundColor:'#749d63'}}>
      {/* <Appbar.BackAction onPress={() => navigation.goBack()} /> */}
      <Appbar.Content title="RT House" color="white" />
      <Appbar.Action icon="bell" color="white" onPress={() => navigation.navigate('Notification')} />
      <Appbar.Action icon="account-circle" color="white" onPress={() => navigation.navigate('Profile')} />
    </Appbar.Header>

<View style={{}}>
<View style={{paddingTop:50}}>

</View>
    <View style={styles.wrap}>
          <ScrollView
            onScroll={({ nativeEvent })=>change(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
          >
            {
              images.map((e, index) =>
                <Image
                  key={e}
                  resizeMode="stretch"
                  style={styles.wrap}
                  source={{ uri: e }}
                />
              )
            }
          </ScrollView>
          <View style={styles.wrapDot}>
            {
              images.map((e, index) =>
                <Text
                  key={e}
                  style={active === index ? styles.dotActive : styles.dot}>●</Text>)
            }
          </View>
        </View>
        <View style={{paddingTop:30}}>

</View>
<View style={{display: 'flex', flexDirection: 'row',justifyContent: 'center'}}>
            <View style={{padding:7,width:120}}>
            <TouchableOpacity style={{borderRadius:20,padding:15,backgroundColor: '#adadad'}} onPress={() =>_handleShowActionSheet()}>
            <Entypo name="home" size={59} color="#000" style={{textAlign: 'center'}} />
                <Text style={{fontSize:16,fontFamily:'Kanits',textAlign: 'center'}}>รายเดือน</Text>
            </TouchableOpacity>
            <ActionSheet
        ref={actionSheetRef}
        options={['บ้านเช่า', 'อพาร์ทเม้นท์' , 'ยกเลิก']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index) =>  handlePress(index) }
      />
            </View>
            <View style={{padding:7,width:120}}>
            <TouchableOpacity style={{borderRadius:20,padding:15,backgroundColor: '#adadad'}} onPress={() => _handleShowActionSheet1()}>
            <FontAwesome5 name="home" size={35} color="#000" style={{textAlign: 'center'}} />
                <Text style={{fontSize:16,fontFamily:'Kanits',textAlign: 'center'}}>ชั่วคราว/ค้างคืน</Text>
            </TouchableOpacity>
            <ActionSheet
        ref={actionSheetRef1}
        options={['ชั่วคราว', 'ค้างคืน' , 'ยกเลิก']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={(index) =>  handlePress1(index) }
      />
            </View>
            <View style={{padding:7,width:120}}>
            <TouchableOpacity style={{borderRadius:20,padding:15,backgroundColor: '#adadad'}} onPress={() => navigation.navigate('ListBill')}>
            <FontAwesome5 name="money-check-alt" size={35} color="#000" style={{textAlign: 'center'}} />
                <Text style={{fontSize:16,fontFamily:'Kanits',textAlign: 'center'}}>รายการบิลค่าเช่า</Text>
            </TouchableOpacity>
            </View>
        </View>
        <View style={{paddingTop:10}}>

</View>
        <View style={{display: 'flex', flexDirection: 'row',justifyContent: 'center'}}>
            <View style={{padding:7,width:120}}>
            <TouchableOpacity style={{borderRadius:20,padding:15,backgroundColor: '#adadad'}} onPress={() => navigation.navigate('Report')}>
            <Entypo name="megaphone" size={35} color="#000" style={{textAlign: 'center'}} />
                <Text style={{fontSize:16,fontFamily:'Kanits',textAlign: 'center'}}>การแจ้งปัญหา</Text>
            </TouchableOpacity>
            </View>
            <View style={{padding:7,width:120}}>
            <TouchableOpacity style={{borderRadius:20,padding:15,backgroundColor: '#adadad'}} onPress={() => navigation.navigate('ListPayment')}>
            <FontAwesome5 name="user-alt" size={35} color="#000" style={{textAlign: 'center'}} />
                <Text style={{fontSize:16,fontFamily:'Kanits',textAlign: 'center'}}>ประวัติชำระเงิน</Text>
            </TouchableOpacity>
            </View>
            <View style={{padding:7,width:120}}>
            <TouchableOpacity style={{borderRadius:20,padding:15,backgroundColor: '#adadad'}} onPress={() => navigation.navigate('ListBook')}>
            <FontAwesome5 name="home" size={35} color="#000" style={{textAlign: 'center'}} />
                <Text style={{fontSize:16,fontFamily:'Kanits',textAlign: 'center'}}>ข้อมูลการเช่า</Text>
            </TouchableOpacity>
            </View>
        </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f8f7fd'
    },
    wrap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.25, // 25% window
        borderRadius:35,
      },
      wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
      },
      dot: {
        margin: 3,
        color: '#888'
      },
      dotActive: {
        margin: 3,
        color: 'black'
      }
})
