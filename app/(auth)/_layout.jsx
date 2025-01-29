import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import { setGlobalError } from '../../redux/slices/authSlice';
import { Loader } from "../../components";

const AuthLayout = () => {
  const dispatch = useDispatch();

  const { globalError, loading } = useSelector((state) => state.auth);

  const clearError = () => dispatch(setGlobalError(''));

  return (
    <View style={{ flex: 1 }}>
      {globalError ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{globalError}</Text>
          <Text style={styles.dismissText} onPress={clearError}>
            Dismiss
          </Text>
        </View>
      ) : null}
      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="auto" />
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  errorBanner: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    zIndex: 10,
  },
  errorText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  dismissText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});
