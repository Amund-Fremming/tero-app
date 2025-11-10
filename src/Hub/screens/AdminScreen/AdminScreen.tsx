import { Pressable, SectionList, Text, View } from "react-native";
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

    setPopup(result.value)
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
        popup && (
          <View style={styles.healthCard}>
            <Text>Modal</Text>
            <Text style={styles.healthText}></Text>
          </View>
        )
      }

    </View >
  );
};

export default AdminScreen;
