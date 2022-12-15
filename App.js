import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Loading from './screens/Loading';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Reset from './screens/Reset';
import Otp from './screens/Otp';
import ResetPass from './screens/ResetPass';
import Dashboard from './screens/Dashboard';
import Google from './screens/Google';
import Facebook from './screens/Facebook';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import ChangePassword from './screens/ChangePassword';
import House from './screens/House';
import Detail_house from './screens/Detail_house';
import Apartment from './screens/Apartment';
import Detail_apartment from './screens/Detail_apartment';
import Booking from './screens/Booking';
import Payment from './screens/Payment';
import Report from './screens/Report';
import Owner from './screens/Owner';
import ListBill from './screens/ListBill';
import Detail_bill from './screens/Detail_bill';
import PayBill from './screens/PayBill';
import ListBook from './screens/ListBook';
import Detail_book from './screens/Detail_book';
import ListPayment from './screens/ListPayment';
import Detail_payment from './screens/Detail_payment';
import ListReport from './screens/ListReport';
import Detail_Report from './screens/Detail_Report';
import Notification from './screens/Notification';
import Detail_notification from './screens/Detail_notification';
import Reserve from './screens/Reserve';
import Detail_reserve from './screens/Detail_reserve';
import Cancel_book from './screens/Cancel_book';
import Temporary from './screens/Temporary';
import Daily from './screens/Daily';
import Daily_details from './screens/Daily_details';
import Temporary_details from './screens/Temporary_details';
import Book_temporary from './screens/Book_temporary';
import Payment_tem from './screens/Payment_tem';
import Book_daily from './screens/Book_daily';
import Payment_daily from './screens/Payment_daily';
import Detail_Payment_tem from './screens/Detail_Payment_tem';
import Detail_tem from './screens/Detail_tem';

const Stack = createStackNavigator();

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={horizontalAnimation}>
      <Stack.Screen name='Loading' component={Loading} options={{ 
        headerShown: false,
        title: 'Loading',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Home' component={Home} options={{ 
        headerShown: false,
        title: 'Home',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Login' component={Login} options={{ 
        headerShown: false,
        title: 'เข้าสู่ระบบ',
          headerStyle: {
          backgroundColor: '#ffbb3b'
          }}}/>
      <Stack.Screen name='Register' component={Register} options={{ 
        headerShown: false,
        title: 'สมัครสมาชิก',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Reset' component={Reset} options={{ 
        headerShown: false,
        title: 'ลืมรหัสผ่าน',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Otp' component={Otp} options={{ 
        headerShown: false,
        title: 'Otp',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='ResetPass' component={ResetPass} options={{ 
        headerShown: false,
        title: 'ResetPass',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Dashboard' component={Dashboard} options={{ 
        headerShown: false,
        title: 'Dashboard',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Google' component={Google} options={{ 
        headerShown: false,
        title: 'Google',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Facebook' component={Facebook} options={{ 
        headerShown: false,
        title: 'Facebook',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Profile' component={Profile} options={{ 
        headerShown: false,
        title: 'Profile',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='EditProfile' component={EditProfile} options={{ 
        headerShown: false,
        title: 'EditProfile',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='House' component={House} options={{ 
        headerShown: false,
        title: 'Profile',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ 
        headerShown: false,
        title: 'ChangePassword',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Detail_house' component={Detail_house} options={{ 
        headerShown: false,
        title: 'Detail_house',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Apartment' component={Apartment} options={{ 
        headerShown: false,
        title: 'Apartment',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Booking' component={Booking} options={{ 
        headerShown: false,
        title: 'Booking',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Payment' component={Payment} options={{ 
        headerShown: false,
        title: 'Payment',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Report' component={Report} options={{ 
        headerShown: false,
        title: 'Report',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Owner' component={Owner} options={{ 
        headerShown: false,
        title: 'Owner',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Detail_apartment' component={Detail_apartment} options={{ 
        headerShown: false,
        title: 'Detail_apartment',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='ListBill' component={ListBill} options={{ 
        headerShown: false,
        title: 'ListBill',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Detail_bill' component={Detail_bill} options={{ 
        headerShown: false,
        title: 'Detail_bill',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='PayBill' component={PayBill} options={{ 
        headerShown: false,
        title: 'PayBill',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='ListBook' component={ListBook} options={{ 
        headerShown: false,
        title: 'ListBook',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Detail_book' component={Detail_book} options={{ 
        headerShown: false,
        title: 'Detail_book',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='ListPayment' component={ListPayment} options={{ 
        headerShown: false,
        title: 'ListPayment',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Detail_payment' component={Detail_payment} options={{ 
        headerShown: false,
        title: 'Detail_payment',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='ListReport' component={ListReport} options={{ 
        headerShown: false,
        title: 'ListReport',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Detail_Report' component={Detail_Report} options={{ 
        headerShown: false,
        title: 'Detail_Report',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Notification' component={Notification} options={{ 
        headerShown: false,
        title: 'Notification',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
      <Stack.Screen name='Detail_notification' component={Detail_notification} options={{ 
        headerShown: false,
        title: 'Detail_notification',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
          <Stack.Screen name='Reserve' component={Reserve} options={{ 
        headerShown: false,
        title: 'Reserve',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
          <Stack.Screen name='Detail_reserve' component={Detail_reserve} options={{ 
        headerShown: false,
        title: 'Detail_reserve',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
        <Stack.Screen name='Cancel_book' component={Cancel_book} options={{ 
        headerShown: false,
        title: 'Cancel_book',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
        <Stack.Screen name='Temporary' component={Temporary} options={{ 
        headerShown: false,
        title: 'Temporary',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
        <Stack.Screen name='Daily' component={Daily} options={{ 
        headerShown: false,
        title: 'Daily',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
        <Stack.Screen name='Daily_details' component={Daily_details} options={{ 
        headerShown: false,
        title: 'Daily_details',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
        <Stack.Screen name='Temporary_details' component={Temporary_details} options={{ 
        headerShown: false,
        title: 'Temporary_details',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
        <Stack.Screen name='Book_temporary' component={Book_temporary} options={{ 
        headerShown: false,
        title: 'Book_temporary',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
          <Stack.Screen name='Payment_tem' component={Payment_tem} options={{ 
        headerShown: false,
        title: 'Payment_tem',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
          <Stack.Screen name='Book_daily' component={Book_daily} options={{ 
        headerShown: false,
        title: 'Book_daily',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
          <Stack.Screen name='Payment_daily' component={Payment_daily} options={{ 
        headerShown: false,
        title: 'Payment_daily',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
          <Stack.Screen name='Detail_Payment_tem' component={Detail_Payment_tem} options={{ 
        headerShown: false,
        title: 'Detail_Payment_tem',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
          <Stack.Screen name='Detail_tem' component={Detail_tem} options={{ 
        headerShown: false,
        title: 'Detail_tem',
          headerStyle: {
          backgroundColor: '#48D1CC'
          }}}/>
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}