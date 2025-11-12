import { Pressable, SectionList, Text, TextInput, View } from "react-native";
import styles from "./adminScreenStyles";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { useServiceProvider } from "@/src/common/context/ServiceProvider";
import { useEffect, useState } from "react";
import { ActivityStats, ClientPopup, SystemHealth } from "@/src/common/constants/types";
import { useNavigation } from "expo-router";
import { useModalProvider } from "@/src/common/context/ModalProvider";

export const AdminScreen = () => {
  const navigation: any = useNavigation();
  const { redirectUri } = useAuthProvider();
  const { commonService, userService } = useServiceProvider();
  const { accessToken } = useAuthProvider();

  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    platform: false,
    session: false,
    database: false
  });
  const [stats, setStats] = useState<ActivityStats | undefined>(undefined);
  const [popup, setPopup] = useState<ClientPopup | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedPopup, setEditedPopup] = useState<ClientPopup>({
    heading: "",
    paragraph: "",
    active: false
  });

  useEffect(() => {
    getHealth();
    getUserActivityStats();
    getClientPopup();
  }, []);

  const getHealth = async () => {
    const result = await commonService().healthDetailed();
    if (result.isError()) {
      console.error("Failed to contact health api");
      return;
    }

    setSystemHealth(result.value);
  }

  const getUserActivityStats = async () => {
    if (!accessToken) {
      console.error("Access token was not present!");
      return;
    }

    const result = await userService().getUserStats(accessToken);
    if (result.isError()) {
      console.error("Failed to load user activity stats");
      return;
    }

    setStats(result.value);
  }

  const getClientPopup = async () => {
    const result = await userService().getGlobalPopup();
    if (result.isError()) {
      console.error("Failed to load client popup");
      return;
    }

    setPopup(result.value);
    setEditedPopup(result.value);
  }

  const handleUpdatePopup = async () => {
    if (!accessToken) {
      console.error("Access token was not present!");
      return;
    }

    const result = await userService().updateGlobalPopup(accessToken, editedPopup);
    if (result.isError()) {
      console.error("Failed to update popup");
      return;
    }

    setPopup(editedPopup);
    setEditMode(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.leadContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.header}>Admin</Text>
        </Pressable>
      </View>

      <Text>Redirect uri: {redirectUri}</Text>
      <View style={styles.healthCard}>
        <View style={styles.healthWrapper}>
          <Text style={styles.healthText}>Platform</Text>
          <Text style={styles.healthText}>{systemHealth.platform ? "✅" : "❌"}</Text>
        </View>
        <View style={styles.healthWrapper}>
          <Text style={styles.healthText}>Database</Text>
          <Text style={styles.healthText}>{systemHealth.database ? "✅" : "❌"}</Text>
        </View>
        <View style={styles.healthWrapper}>
          <Text style={styles.healthText}>Session</Text>
          <Text style={styles.healthText}>{systemHealth.session ? "✅" : "❌"}</Text>
        </View>
      </View>
      {
        !stats && (
          // TODO - load again button
          <View style={styles.healthCard}>
            <Text style={styles.healthText}>Klarte ikke laste stats...</Text>
          </View>
        )
      }
      {
        stats && (
          <View style={styles.healthCard}>
            <Text>Brukere</Text>
            <View style={styles.healthWrapper}>
              <Text style={styles.healthText}>I dag</Text>
              <Text style={styles.healthText}>{stats.recent.todays_users}</Text>
            </View>
            <View style={styles.healthWrapper}>
              <Text style={styles.healthText}>Denne uken</Text>
              <Text style={styles.healthText}>{stats.recent.this_week_users}</Text>
            </View>
            <View style={styles.healthWrapper}>
              <Text style={styles.healthText}>Denne måneden</Text>
              <Text style={styles.healthText}>{stats.recent.this_month_users}</Text>
            </View>
          </View>
        )
      }
      {
        stats && (
          <View style={styles.healthCard}>
            <Text>Brukere</Text>
            <View style={styles.healthWrapper}>
              <Text style={styles.healthText}>Daglig</Text>
              <Text style={styles.healthText}>{stats.average.avg_daily_users}</Text>
            </View>
            <View style={styles.healthWrapper}>
              <Text style={styles.healthText}>Ukentlig</Text>
              <Text style={styles.healthText}>{stats.average.avg_daily_users}</Text>
            </View>
            <View style={styles.healthWrapper}>
              <Text style={styles.healthText}>Månedlig</Text>
              <Text style={styles.healthText}>{stats.average.avg_month_users}</Text>
            </View>
            <View style={styles.healthWrapper}>
              <Text style={styles.healthText}>Totalt</Text>
              <Text style={styles.healthText}>{stats.total_user_count}</Text>
            </View>
          </View>
        )
      }

      {
        !popup && (
          // TODO - load again button
          <View style={styles.healthCard}>
            <Text style={styles.healthText}>Klarte ikke laste modal...</Text>
          </View>
        )
      }
      {
        popup && !editMode && (
          <View style={styles.healthCard}>
            <Text style={styles.sectionTitle}>Modal</Text>
            <View style={styles.healthWrapper}>
              <Text style={styles.healthText}>Tittel</Text>
              <Text style={styles.healthText}>{popup.heading}</Text>
            </View>
            <View style={styles.fieldWrapper}>
              <Text style={styles.healthText}>Melding</Text>
              <Text style={styles.healthText}>{popup.paragraph}</Text>
            </View>
            <View style={styles.healthWrapper}>
              <Text style={styles.healthText}>Aktiv</Text>
              <Text style={styles.healthText}>{popup.active ? "✅" : "❌"}</Text>
            </View>
            <Pressable onPress={() => setEditMode(true)} style={styles.editButton}>
              <Text style={styles.editButtonText}>Rediger</Text>
            </Pressable>
          </View>
        )
      }
      {
        popup && editMode && (
          <View style={styles.healthCard}>
            <Text style={styles.sectionTitle}>Rediger Modal</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Tittel</Text>
              <TextInput
                style={styles.input}
                value={editedPopup.heading}
                onChangeText={(text) => setEditedPopup(prev => ({ ...prev, heading: text }))}
                placeholder="Skriv inn tittel"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Melding</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={editedPopup.paragraph}
                onChangeText={(text) => setEditedPopup(prev => ({ ...prev, paragraph: text }))}
                placeholder="Skriv inn melding"
                multiline
                numberOfLines={4}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Aktiv</Text>
              <View style={styles.toggleWrapper}>
                <Pressable
                  style={[styles.toggleButton, editedPopup.active && styles.toggleButtonActive]}
                  onPress={() => setEditedPopup(prev => ({ ...prev, active: true }))}
                >
                  <Text style={[styles.toggleButtonText, editedPopup.active && styles.toggleButtonTextActive]}>Ja</Text>
                </Pressable>
                <Pressable
                  style={[styles.toggleButton, !editedPopup.active && styles.toggleButtonActive]}
                  onPress={() => setEditedPopup(prev => ({ ...prev, active: false }))}
                >
                  <Text style={[styles.toggleButtonText, !editedPopup.active && styles.toggleButtonTextActive]}>Nei</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.buttonWrapper}>
              <Pressable style={styles.cancelButton} onPress={() => {
                setEditedPopup(popup);
                setEditMode(false);
              }}>
                <Text style={styles.cancelButtonText}>Avbryt</Text>
              </Pressable>
              <Pressable onPress={handleUpdatePopup} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Lagre</Text>
              </Pressable>
            </View>
          </View>
        )
      }

    </View >
  );
};

export default AdminScreen;
