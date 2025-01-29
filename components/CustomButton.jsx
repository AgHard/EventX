import { TouchableOpacity, Text } from 'react-native'
const CustomButton = ({title, containerStyles, handlePress, textStyles, isLoading}) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center 
        ${containerStyles} ${isLoading? 'opacity-50' : ''}`} disabled = {isLoading}>
      <Text className={`text-primary font-psemibold text-lg font-bold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}
export default CustomButton