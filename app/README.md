projeto base
https://github.com/mikemorcerf/react-native-mobile-with-typescript-GoBarber/blob/master/src/pages/SignUp/index.tsx

instalar expo
https://expo.io/learn

instalar expo no linux
sudo npm install --unsafe-perm -g expo-cli

npm install expo-font @expo-google-fonts/ubuntu @expo-google-fonts/roboto
npm install @react-navigation/native
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install @react-navigation/stack
expo install react-native-maps
expo install expo-constants
expo install expo-location
npm install yup
npm install @types/yup

## problemas em rodar o expo por excesso de arquivos

1. verificar total de arquivos
cat /proc/sys/fs/inotify/max_user_watches
2. caso seja pouco editar o `/etc/sysctl.conf`
fs.inotify.max_user_watches=1048576
3. reiniciar o sysctl
sudo sysctl -p /etc/sysctl.conf
