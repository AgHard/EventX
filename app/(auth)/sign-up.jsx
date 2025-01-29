import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setIsLogged } from '../../redux/slices/authSlice';
import { fetchCurrentUser } from '../../redux/slices/userSlice';
import { createUser } from '../../lib/api';

const SignUp = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    setErrorMessage('Please enter a valid email address.');
    return;
  }

  const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Za-z0-9]).{8,}$/;
  if (!passwordRegex.test(form.password)) {
    setErrorMessage(
      'Password must be at least 8 characters long, include at least one special character.'
    );
    return;
  }
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await createUser(form.username, form.email, form.password);

      await dispatch(fetchCurrentUser()).unwrap();

      dispatch(setIsLogged(true));

      router.replace('/home');
    } catch (error) {
      setErrorMessage(error.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-gray-500">
      <ScrollView>
        <View
          className="flex justify-center w-full min-h-[85vh] px-4 my-6"
          style={{ minHeight: Dimensions.get('window').height - 100 }}
        >
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[90px]" />
          <Text className="mt-10 text-2xl font-bold text-white font-psemibold">
            Sign up to EventX
          </Text>
          {errorMessage ? (
            <Text className="mt-4 text-2xl font-extrabold text-center text-red-500">{errorMessage}</Text>
          ) : null}
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            handlePress={submit}
            title="Sign Up"
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex flex-row justify-center gap-2 pt-5">
            <Text className="text-lg font-bold text-white font-pregular">
              Already have an account?
            </Text>
            <Link href="/sign-in" className="text-lg font-bold text-secondary">
              Signin
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
