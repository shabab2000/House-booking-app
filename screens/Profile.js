import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  Switch,
  RefreshControl,
  Button,
  SafeAreaView,
  Share,
  Linking,
  ActivityIndicator
} from 'react-native';
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';
import { Placeholder,PlaceholderMedia,PlaceholderLine,Fade } from 'rn-placeholder'

export default function Profile({route,navigation}) {
  
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    load()
    wait(2000).then(() => setRefreshing(false));
  }, []);

    const [Email , setEmail] = useState('');
    const [user , setUser] = useState('');

    const load = async () => {
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

    const logout = async () => {
        try {
          await AsyncStorage.clear()
          setUser('')
          setEmail('')
          Alert.alert('สำเร็จ','ออกจากระบบแล้ว')
          navigation.replace('Login')
        } catch (e) {
          Alert.alert('Failed to clear the async storage.')
        }
      };

      const onShare = async () => {
        try {
          const result = await Share.share({
            message: 'https://play.google.com/store/apps/details?id=com.rthouse.app',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

      const openStore = () => {
        //This is the main trick
        
          Linking.openURL(
            `market://details?id=com.rthouse.app`,
          ).catch(
              (err) => Alert.alert('Please check for Google Play Store')
          );
        
      };

    useEffect(() => {
      wait(3000).then(() => load())
const unsubscribe = navigation.addListener('focus', () => {
  {load()}
});
return unsubscribe;
}, [navigation]);

  return (
    <View style={styles.container}>
    <Appbar.Header style={{backgroundColor:'#749d63'}}>
  <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
  <Appbar.Content title="โปรไฟล์" color="white" />
</Appbar.Header>
    
    { user?
      
    <View style={{ paddingBottom:50}}>
    
    <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
    
        <View style={{display:'flex',flexDirection:'row',paddingHorizontal:20}}>
          <View style={styles.userImage}>
            <Image source={ user ? {uri:user.img}: require('./img/profile.png')} style={{width: 100, height:100,borderRadius:50 }}/>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
         <Text style={{textAlign: 'center',fontSize:20,fontFamily:'Kanits',paddingHorizontal: 10}}>{user.name}</Text>
         <Text style={{textAlign: 'center',fontSize:16,fontFamily:'Kanits',paddingHorizontal: 1}}>{user.email}</Text>
          </View>
        </View>
        <Text style={{padding:10,fontFamily:'Kanits',paddingTop:10}}>บัญชีของฉัน</Text>
{user.social =='email'?
      <ListItem  bottomDivider topDivider onPress={() => navigation.navigate(user !== '' ? 'EditProfile':'Login')}>
      <FontAwesome5 name="user" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{fontFamily:'Kanits'}}>แก้ไขข้อมูลส่วนตัว</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      :null}
{user.social =='email'?
      <ListItem  bottomDivider onPress={() => navigation.navigate(user !== '' ? 'ChangePassword':'Login')}>
      <FontAwesome5 name="lock" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{fontFamily:'Kanits'}}>เปลี่ยนรหัสผ่าน</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
:null}
      <ListItem  bottomDivider onPress={() => navigation.navigate(user !== '' ? 'ListBook':'Login')}>
      <FontAwesome name="list-alt" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{fontFamily:'Kanits'}}>ข้อมูลการเช่า</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem  bottomDivider onPress={() => navigation.navigate(user !== '' ? 'ListReport':'Login')}>
      <FontAwesome name="history" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{fontFamily:'Kanits'}}>ประวัติการแจ้งปัญหา</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem  bottomDivider onPress={() => navigation.navigate(user !== '' ? 'ListBill':'Login')}>
      <FontAwesome5 name="money-check-alt" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{fontFamily:'Kanits'}}>รายการบิลค่าเช่า</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      <ListItem  bottomDivider onPress={() => navigation.navigate(user !== '' ? 'Reserve':'Login')}>
      <FontAwesome5 name="money-bill-alt" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title><Text style={{fontFamily:'Kanits'}}>รายการชำระเงินมัดจำ</Text></ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

      {/* <ListItem  bottomDivider onPress={() => navigation.navigate(Email !== '' ? 'Address':'Login')}>
        <Icon name="map" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title>ที่อยู่ของฉัน</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem> */}

      {/* <ListItem  bottomDivider onPress={() => navigation.navigate(Email !== '' ? 'Money':'Login')}>
        <Icon name="map" />
        <ListItem.Content>
          <ListItem.Title>เงินของฉัน</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem> */}

      <Text style={{padding:10,fontFamily:'Kanits'}}>เพิ่มเติม</Text>
<ListItem  bottomDivider onPress={() => onShare()}>
<FontAwesome5 name="share" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title>แชร์แอปนี้</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <ListItem  bottomDivider onPress={() => openStore()}>
<FontAwesome5 name="star" size={20} color="#333" />
        <ListItem.Content>
          <ListItem.Title>ให้คะแนนแอปนี้</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
<View style={{padding:7,paddingTop:15}}>
{user !== '' ?
      <Button title="ออกจากระบบ" color="green"  onPress={() => logout()}/>
      :null}
</View>
<View style={{paddingBottom:60}}></View>

      </ScrollView>
      
    </View>
    : <Placeholder Animation={Fade}>
              <View style={{padding:7}}>
                <View style={{ flexDirection: 'row',padding:10}}>
                    <View>
                        <PlaceholderMedia style={{paddingLeft:10,borderRadius: 100}} size={100}/>
                    </View>
                    <View style={{flex:1, marginLeft:10, justifyContent:'center'}}>
                        <View style={{alignItems: 'center'}}>
                        <PlaceholderLine width={70} height={16}/>
                        <PlaceholderLine width={90} height={15}/>
                        </View>
                    </View>
                </View>
                <PlaceholderLine width={15} height={9}/>
                <View style={{padding:10}}>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <View style={{marginLeft:10}}>
                        <PlaceholderLine width={70} height={20}/>
                        </View>
                    </View>
                </View>
                <View style={{padding:15}}/>
                <View style={{padding:10}}>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <View style={{marginLeft:10}}>
                        <PlaceholderLine width={70} height={20}/>
                        </View>
                    </View>
                </View>
                <View style={{padding:15}}/>
                <View style={{padding:10}}>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <View style={{marginLeft:10}}>
                        <PlaceholderLine width={70} height={20}/>
                        </View>
                    </View>
                </View>
                <View style={{padding:15}}/>
                <View style={{padding:10}}>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <View style={{marginLeft:10}}>
                        <PlaceholderLine width={70} height={20}/>
                        </View>
                    </View>
                </View>
                <View style={{padding:15}}/>
                <View style={{padding:10}}>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <View style={{marginLeft:10}}>
                        <PlaceholderLine width={70} height={20}/>
                        </View>
                    </View>
                </View>
                <View style={{padding:10}}/>
                <PlaceholderLine width={15} height={9}/>
                <View style={{padding:20}}/>
                <View style={{padding:10}}>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <View style={{marginLeft:10}}>
                        <PlaceholderLine width={70} height={20}/>
                        </View>
                    </View>
                </View>
                <View style={{padding:15}}/>
                <View style={{padding:10}}>
                        <View style={{flex:1,justifyContent:'center'}}>
                        <View style={{marginLeft:10}}>
                        <PlaceholderLine width={70} height={20}/>
                        </View>
                    </View>
                </View>
                <View style={{padding:15}}/>
                <PlaceholderLine width={100} height={35}/>
                </View>
                </Placeholder>
                }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f8f7fd'
      },
    scroll: {
        backgroundColor: 'white',
      },
      userRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 8,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
      },
      userImage: {
        marginRight: 12,
        alignItems: 'center',
        paddingTop:10,
      },
      listItemContainer: {
        height: 55,
        borderWidth: 0.5,
        borderColor: '#ECECEC',
      },
  coverImage: { height: 300, width: '100%' },
  profileContainer: {
    // height: 1000,
    backgroundColor: '#fff',
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageView: { alignItems: 'center', marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameAndBioView: { alignItems: 'center', marginTop: 10 },
  userFullName: { fontSize: 26 },
  userBio: {
    fontSize: 18,
    color: '#333',
    marginTop: 4,
  },
  countsView: { flexDirection: 'row', marginTop: 20 },
  countView: { flex: 1, alignItems: 'center' },
  countNum: { fontSize: 20 },
  countText: { fontSize: 18, color: '#333' },
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b7bec',
    margin: 5,
    borderRadius: 4,
  },
  interactButtonText: {
    color: '#fff',
    fontSize: 18,
    paddingVertical: 6,
  },
  profileContentButtonsView: {
    flexDirection: 'row',
    borderTopWidth: 2,
    borderTopColor: '#f1f3f6',
  },
  showContentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#000',
  },
  showContentButtonText: {
    fontSize: 18,
  },
});