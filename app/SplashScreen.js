import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as SplashScreen from 'expo-splash-screen';

export default function SplashScreenComponent({ onLoaded }) {
  useEffect(() => {
    const prepare = async () => {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
      } catch (e) {
        console.warn(e);
      } finally {
        // Delay for 5 seconds before hiding the splash screen
        setTimeout(async () => {
          await SplashScreen.hideAsync();
          onLoaded();
        }, 5000); // 5000 milliseconds = 5 seconds
      }
    };

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.jpg')} style={styles.image} />
      <Text style={styles.text}>Snap Talk</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  image: {
    width: wp(80),
    height: hp(40),
    resizeMode: 'contain'
  },
  text: {
    fontSize: hp(5),
    fontWeight: 'bold',
    marginTop: hp(2)
  }
});
