import React,{ useState, useEffect}from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,Dimensions,Alert } from 'react-native'
import {ListItem,Avatar } from 'react-native-elements';
import { FontAwesome5,FontAwesome,Ionicons,Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appbar,Badge } from 'react-native-paper';

export default function Owner({route,navigation}) {
    return (
        <View style={styles.container}>
        <Appbar.Header style={{backgroundColor:'#749d63'}}>
<Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
<Appbar.Content title="RT House" color="white" />
<Appbar.Action icon="cog" color="white" />
<Appbar.Action icon="bell" color="white" />
<Appbar.Action icon="account-circle" color="white" onPress={() => navigation.navigate('Profile')}/>
</Appbar.Header>
        
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingTop:20}}>
        
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
})
