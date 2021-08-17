# instagram-clone


# Install React Navigation
https://reactnavigation.org/docs/getting-started/
npm install @react-navigation/native
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
- if ERR: Run Windows PowerShell as administrator, run 'Set-ExecutionPolicy RemoteSigned' then 'Y'

# Install Redux
npm i redux
npm i react-redux
npm i redux-thunk

# Navigation
reactnavigation.org -> main packagage is already installed
look into 'Bottom Navigation'
npm install @react-navigation/bottom-tabs
* if bottom nav does not work, make sure to update native: 'npm install @react-navigation/native'
** for continued errors that becomes hella frustrating, try the following:
1. install the specific versions below
    "@react-navigation/material-bottom-tabs": "^6.0.1",
    "@react-navigation/native": "^6.0.1",
    "@react-navigation/stack": "^6.0.1",
2. Clear cache: npm install -c

install vector icons
npm i react-native-vector-icons

# Camera and Image Gallery
Camera: expo install expo-camera
Image Gallery: expo install expo-image-picker
https://docs.expo.dev/versions/latest/sdk/camera/


# Git Config
warning: LF will be replaced by CRLF: git config --global core.autocrlf false
