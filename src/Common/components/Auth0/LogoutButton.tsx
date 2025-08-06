import { Text, Pressable } from "react-native";
import { useAuthProvider } from "../../context/AuthProvider";

export const LogoutButton = () => {
  const { triggerLogout } = useAuthProvider();

  const handlePress = async () => {
    await triggerLogout();
  };

  return (
    <Pressable onPress={handlePress}>
      <Text>Logout</Text>
    </Pressable>
  );
};

export default LogoutButton;
