import { Text, Pressable } from "react-native";
import {useAuth0 } from 'react-native-auth0';
import { useModalProvider } from "../../context/ModalProvider";

export const LogoutButton = () => {
    const { clearSession } = useAuth0();
    const { displayErrorModal } = useModalProvider();

    const handlePress = async () => {
        try {
            await clearSession();
        } catch (e) {
            console.error(e);
            displayErrorModal("Det skjedde en feil ved utlogg.");
        }
    }

    return (
        <Pressable onPress={handlePress}>
            <Text>Logout</Text>
        </Pressable>
    );
}

export default LogoutButton;