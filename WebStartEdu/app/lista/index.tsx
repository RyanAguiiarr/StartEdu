import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { colors } from "../../constants/Colors";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Lista() {
  const [alunos, setAlunos] = useState([]); // Estado para armazenar a lista de alunos
  const [seuToken, setSeuToken] = useState(""); // Estado para armazenar o token

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          console.log("Token recuperado:", token); // Adicione este log
          setSeuToken(token);
        }
      } catch (error) {
        console.error("Erro ao recuperar o token:", error);
      }
    };

    fetchToken();
  }, []);

  const handlePress = async () => {
    try {
      const params = "99624398-2eb6-4b54-aff2-0b0c99011848";
      const response = await axios.get(
        `http://192.168.0.104:3000/lista/${params}`,
        {
          headers: {
            Authorization: `Bearer ${seuToken}`, // Usa o token armazenado
          },
        }
      );
      console.log("Resposta do servidor:", response.data);
      setAlunos(response.data.nome_alunos); // Atualiza o estado com a lista de alunos
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro ao enviar dados:", error.response.data.message);
      } else {
        console.error("Erro ao enviar dados:", error);
      }
    }
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista</Text>
      <Text style={styles.text}>Listagem de alunos</Text>

      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Carregar Alunos</Text>
      </Pressable>

      <FlatList
        data={alunos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Usando o índice como chave
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    marginTop: 40,
    fontSize: 36,
    fontWeight: "bold",
    color: colors.green,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    width: 240,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.blue,
    width: "100%",
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 34,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  itemText: {
    color: colors.white,
  },
});
