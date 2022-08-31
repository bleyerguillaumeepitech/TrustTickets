import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from './screen/loading';
import Scaner from './screen/scaner';
import Result from './screen/result';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Loading" component={Loading} />
        <Stack.Screen options={{
          headerStyle: {
            backgroundColor: '#A09DE4',
          },
          headerBackVisible: false,
          title: 'Scanner billet qr code',
          headerTintColor: '#fff',
          headerBackTitleVisible: false
        }} name="Scaner" component={Scaner} />
        <Stack.Screen options={{
         headerStyle: {
          backgroundColor: '#A09DE4',
        },
        title: 'Verification',
        headerTintColor: '#fff',
        headerBackTitleVisible: false}} name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
