import { Text, Pressable } from "react-native";
import {useAuth0} from 'react-native-auth0';
import { useModalProvider } from "../../context/ModalProvider";

export const LoginButton = () => {
    const { authorize } = useAuth0();
    const { displayErrorModal } = useModalProvider();

    const handlePress = async () => {
        try {
            console.log("Login processing")
            await authorize();
        } catch (e) {
            console.error(e);
            displayErrorModal("Det skjedde en feil ved login");
        }
    }

    return (
        <Pressable onPress={handlePress}>
            <Text>Login</Text>
        </Pressable>
    );
}

export default LoginButton;