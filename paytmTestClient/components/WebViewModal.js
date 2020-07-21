import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import {WebView} from 'react-native-webview';

const {width: screenWidth} = Dimensions.get('window');

const getDefaultPage = (body) =>
  `<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<meta http-equiv='X-UA-Compatible' content='IE=edge'>
<meta name='viewport' content='width=device-width, initial-scale=1'>
<style>
body {
  font-size: 14px;
  color: #040404;
  margin: 0 auto;
  padding: 0 20px;
}
</style>
</head>
<body>
${body || '<p>Request failed, please try again.</p>'}
</body>
</html>`;

const WebViewModal = ({
  visible = false,
  hide = () => {},
  url = '',
  body = '',
  onNavigationStateChange = () => {},
}) => {
  return (
    <Modal visible={visible} animationType="fade" onRequestClose={hide}>
      <WebView
        originWhitelist={['*']}
        javaScriptEnabled={true}
        startInLoadingState={true}
        onNavigationStateChange={onNavigationStateChange}
        source={url ? {uri: url} : {html: getDefaultPage(body), baseUrl: ''}}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: screenWidth,
    backgroundColor: '#ffffff',
  },
  headerRow: {
    flexDirection: 'row',
    width: screenWidth * 0.9,
  },
  heading: {
    textAlign: 'center',
    flex: 1,
    color: '#404040',
    fontFamily: 'Lato-Regular',
    fontSize: 20,
  },
  bottomShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 10,
  },
});

export default WebViewModal;
