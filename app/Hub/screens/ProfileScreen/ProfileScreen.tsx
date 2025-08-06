import LoginButton from "@/app/Common/components/LoginButton/LoginButton";
import LogoutButton from "@/app/Common/components/LogoutButton/LogoutButton";
import { Text, View } from "react-native";
import { useAuth0 } from "react-native-auth0";

export const ProfileScreen = () => {
    const { user } = useAuth0();

    return (
        <View>
            <Text>ProfileScreen</Text>

            <View>
                <Text>Brukerdata:</Text>
                { !user && <Text>Du er ikke logget inn</Text>}
                {user && <Text>Logged inn som: {user.name}</Text>}
            </View>
        
            <LoginButton />
            <LogoutButton />
        </View>
    );
}

export default ProfileScreen;