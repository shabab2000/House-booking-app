import React,{ useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

export default function Loading({navigation}) {
    
   const loads = async () => {
        let uid = await AsyncStorage.getItem("uid");
        console.log('uid: '+uid);
                    if(uid!== null) {
                        navigation.replace('Dashboard');
                    }else{
                        navigation.replace('Home');
                    }
      }
    useEffect(() => {
        loads()
    }, []);
    
    const [loaded] = useFonts({ 
        'Kanit': require('./font/Kanit-Medium.ttf'),
        'Kanits': require('./font/Kanit-Light.ttf'),
      });
      if (!loaded) {
        return <AppLoading />;
      }
    return (
        <View>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({})
