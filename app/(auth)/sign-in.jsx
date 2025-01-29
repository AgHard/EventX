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
import { signIn } from '../../lib/api';

const SignIn = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const submit = async () => {
    if (!form.email || !form.password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await signIn(form.email, form.password);
      await dispatch(fetchCurrentUser()).unwrap();
      dispatch(setIsLogged(true));

      router.replace('/home');
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
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
          <Text className="mt-10 text-2xl font-bold text-white">
            Log in to EventX
          </Text>
          {errorMessage ? (
            <Text className="mt-4 text-2xl font-extrabold text-center text-red-500">{errorMessage}</Text>
          ) : null}
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
            title="Sign In"
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex flex-row justify-center gap-2 pt-5">
            <Text className="text-lg font-bold text-white font-pregular">Don't have an account?</Text>
            <Link href="/sign-up" className="text-lg font-bold text-secondary">
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
