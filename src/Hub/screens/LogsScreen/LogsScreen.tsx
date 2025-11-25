import { Pressable, ScrollView, Text, View } from "react-native";
import styles from "./logsScreenStyles";
import { useAuthProvider } from "@/src/common/context/AuthProvider";
import { useServiceProvider } from "@/src/common/context/ServiceProvider";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { screenHeight, verticalScale } from "@/src/common/utils/dimensions";
import Color from "@/src/common/constants/color";
import { useModalProvider } from "@/src/common/context/ModalProvider";
import { Log, LogCategory, PagedResponse } from "@/src/common/constants/types";

export const LogsScreen = () => {
  const navigation: any = useNavigation();
  const { accessToken } = useAuthProvider();
  const { commonService } = useServiceProvider();
  const { displayErrorModal } = useModalProvider();

  const [logs, setLogs] = useState<Log[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<LogCategory | null>(null);
  const [pageNum, setPageNum] = useState<number>(0);
  const [hasPrev, setHasPrev] = useState<boolean>(false);
  const [hasNext, setHasNext] = useState<boolean>(false);

  useEffect(() => {
    getLogs(0, selectedCategory);
  }, [selectedCategory]);

  const getLogs = async (page: number, category: LogCategory | null) => {
    if (!accessToken) {
      console.error("Access token was not present");
      return;
    }

    const result = await commonService().getLogs(accessToken, category, page);
    if (result.isError()) {
      displayErrorModal("Klarte ikke hente logger");
      return;
    }

    const pagedResponse: PagedResponse<Log> = result.value;
    setLogs(pagedResponse.items);
    setHasNext(pagedResponse.has_next);
  };

  const handleCategorySelect = (category: LogCategory | null) => {
    setSelectedCategory(category);
    setPageNum(0);
    setHasPrev(false);
  };

  const handleNextPage = async () => {
    if (!hasNext) {
      return;
    }

    const page = pageNum + 1;
    setPageNum(page);
    setHasPrev(true);
    await getLogs(page, selectedCategory);
  };

  const handlePrevPage = async () => {
    if (pageNum === 0) {
      return;
    }

    if (pageNum === 1) {
      setHasPrev(false);
    }

    const page = pageNum - 1;
    setPageNum(page);
    await getLogs(page, selectedCategory);
  };

  const getCategoryColor = (category: LogCategory): string => {
    switch (category) {
      case LogCategory.Info:
        return Color.Green;
      case LogCategory.Warning:
        return Color.Yellow;
      case LogCategory.Critical:
        return Color.Red;
      default:
        return Color.Gray;
    }
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('no-NO', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      style={{
        width: "100%",
        backgroundColor: Color.LightGray,
        height: screenHeight(),
      }}
      contentContainerStyle={{
        alignItems: "center",
        gap: verticalScale(15),
        paddingBottom: verticalScale(200),
      }}
    >
      <View style={styles.leadContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.header}>Logger</Text>
        </Pressable>
      </View>

      <View style={styles.categoryBar}>
        <Pressable
          style={selectedCategory === null ? styles.categoryButtonActive : styles.categoryButton}
          onPress={() => handleCategorySelect(null)}
        >
          <Text style={selectedCategory === null ? styles.categoryTextActive : styles.categoryText}>
            Alle
          </Text>
        </Pressable>
        <Pressable
          style={selectedCategory === LogCategory.Info ? styles.categoryButtonActive : styles.categoryButton}
          onPress={() => handleCategorySelect(LogCategory.Info)}
        >
          <Text style={selectedCategory === LogCategory.Info ? styles.categoryTextActive : styles.categoryText}>
            Info
          </Text>
        </Pressable>
        <Pressable
          style={selectedCategory === LogCategory.Warning ? styles.categoryButtonActive : styles.categoryButton}
          onPress={() => handleCategorySelect(LogCategory.Warning)}
        >
          <Text style={selectedCategory === LogCategory.Warning ? styles.categoryTextActive : styles.categoryText}>
            Warning
          </Text>
        </Pressable>
        <Pressable
          style={selectedCategory === LogCategory.Critical ? styles.categoryButtonActive : styles.categoryButton}
          onPress={() => handleCategorySelect(LogCategory.Critical)}
        >
          <Text style={selectedCategory === LogCategory.Critical ? styles.categoryTextActive : styles.categoryText}>
            Critical
          </Text>
        </Pressable>
      </View>

      {logs.length === 0 && (
        <Text style={styles.emptyText}>Ingen logger funnet</Text>
      )}

      {logs.map((log) => (
        <View key={log.id} style={styles.logCard}>
          <Text style={[styles.logCategory, { color: getCategoryColor(log.category) }]}>
            {log.category}
          </Text>
          <Text style={styles.logMessage}>{log.message}</Text>
          <Text style={styles.logTimestamp}>{formatTimestamp(log.timestamp)}</Text>
          {log.source && <Text style={styles.logSource}>Kilde: {log.source}</Text>}
        </View>
      ))}

      {(hasPrev || hasNext) && (
        <View style={styles.navButtons}>
          {hasPrev && (
            <Pressable style={styles.navButton} onPress={handlePrevPage}>
              <Text style={styles.navButtonText}>Forrige</Text>
            </Pressable>
          )}
          {hasNext && (
            <Pressable style={styles.navButton} onPress={handleNextPage}>
              <Text style={styles.navButtonText}>Neste</Text>
            </Pressable>
          )}
        </View>
      )}

      {logs.length > 0 && (
        <Text style={styles.pageInfo}>Side {pageNum + 1}</Text>
      )}
    </ScrollView>
  );
};

export default LogsScreen;
