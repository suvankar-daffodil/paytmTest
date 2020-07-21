import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, LogBox} from 'react-native';

import WebViewModal from './components/WebViewModal';

LogBox.ignoreAllLogs(true);
const CALLBACK_URL = 'http://192.168.100.117:5000/paytm/response';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          elevation: 10,
          padding: 10,
          borderRadius: 5,
          backgroundColor: 'rgb(41,98,255)',
        }}>
        <Text style={{color: 'white'}}>Pay with Paytm</Text>
      </TouchableOpacity>
      <WebViewModal
        visible={modalVisible}
        url="http://192.168.100.117:5000/paytm/pay"
        hide={() => setModalVisible(false)}
        onNavigationStateChange={({url}) => {
          if (url.includes(`${CALLBACK_URL}?`)) {
            setModalVisible(false);
            const searchParams = url
              .replace(`${CALLBACK_URL}?`, '')
              .replace('STATUS=', '')
              .replace('TXNID=', '')
              .split('&');
            Alert.alert(searchParams[0], searchParams[1]);
          }
        }}
      />
    </View>
  );
};

export default App;
