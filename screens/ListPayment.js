import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  StatusBar,
  Alert,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import { Appbar,Badge } from 'react-native-paper';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListPayments from "./ListPayments";
import ListPayment_tem from "./ListPayment_tem";
import ListPayment_daily from "./ListPayment_daily"


const Tab = createMaterialTopTabNavigator();

export default function ListPayment({ navigation }) {
  return (
    <View style={styles.containerstatus}>
      <Appbar.Header style={{backgroundColor:'#749d63'}}>
  <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
  <Appbar.Content title="ประวัติการชำระเงิน" color="white" />
</Appbar.Header>
      <Tab.Navigator
        // initialRouteName="PayDone"
        tabBarOptions={{
          activeTintColor: "#000",
          inactiveTintColor: "#FFF",
          style: {
            backgroundColor: "#87CEFA",
          },
          labelStyle: {
            textAlign: "center",
            fontFamily:'Kanits'
          },
          indicatorStyle: {
            borderBottomColor: "#000",
            borderBottomWidth: 2,
            //width: 80,
            //left: "5.5%",
          },
        }}
      >
        
        <Tab.Screen
          name="ListPayments"
          component={ListPayments}
          options={{
            title: "ห้องพักรายเดือน",
            headerShown: false,
            tabBarLabel: "รายเดือน",
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="heart" color={color} size={size} />
            // ),
          }}
        />
        <Tab.Screen
          name="ListPayment_tem"
          component={ListPayment_tem}
          options={{
            title: "ห้องพักชั่วคราว",
            headerShown: false,
            tabBarLabel: "ชั่วคราว",
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="heart" color={color} size={size} />
            // ),
          }}
        />
        <Tab.Screen
          name="ListPayment_daily"
          component={ListPayment_daily}
          options={{
            title: "ห้องพักค้างคืน",
            headerShown: false,
            tabBarLabel: "ค้างคืน",
            // tabBarIcon: ({ color, size }) => (
            //   <MaterialCommunityIcons name="heart" color={color} size={size} />
            // ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  containerstatus: {
    flex: 1,
  },
  container: {
    flex: 1,
    // paddingBottom: 600,
    backgroundColor: "#e4e4e4",
  },
  goBackcontainer: {
    position: "absolute",
    left: 15,
    top: -2,
  },
  goBackimage: {
    width: 30,
    height: 30,
  },
  textStyle: {
    fontSize: 14,
    color: "black",
    flex: 1,
  },
  hr: {
    width: "21%",
    height: 2,
    backgroundColor: "#f37721",
    marginTop: 6,
    marginLeft: 15,
  },
});
