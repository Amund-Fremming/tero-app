import { View, Text } from "react-native";
import { styles } from "./tipsUsScreenStyles";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { useModalProvider } from "../../context/ModalProvider";

export const TipsUsScreen = () => {
    const navigation: any = useNavigation();
    const { displayInfoModal } = useModalProvider();

    const handleSend = () => {
        console.warn("NOT IMPLEMENTED");

        displayInfoModal("Takk for tipset!", () => navigation.goBack());
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tips oss!</Text>
            <Text style={styles.subHeader}>Send oss ditt spillforslag</Text>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>navn</Text>
                <TextInput style={styles.input} />
            </View>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>mobil</Text>
                <TextInput style={styles.input} />
            </View>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Din ide</Text>
                <TextInput style={styles.multiline} multiline={true} />
            </View>

            <Pressable style={styles.button} onPress={handleSend}>
                <Text style={styles.buttonText}>Send</Text>
            </Pressable>
        </View>
    );
}