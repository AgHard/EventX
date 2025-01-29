import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import { icons } from '../constants'
import { useState } from 'react'
const FormField = ({otherStyles, handleChangeText, value, title, placeholder, ...props}) => {

  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className = {`space-y-2 ${otherStyles}`}>
      <Text className = "text-base font-bold text-gray-100">{title}</Text>
      <View className="flex flex-row items-center w-full h-16 px-4 border-2 bg-black-100 rounded-2xl border-black-200 focus:border-secondary">
        <TextInput className="flex-1 text-base font-bold text-white"
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
          placeholderTextColor="#7b7b8b"
          secureTextEntry = {title === "Password" && !showPassword}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode="center"/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
export default FormField