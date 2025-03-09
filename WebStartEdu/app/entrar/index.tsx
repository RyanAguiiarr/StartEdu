import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import { colors } from "../../constants/Colors";
import Imput from "../../components/inputs";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";

export default function Index() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [nomeLogin, setNomeLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");

  const handlePress = async () => {
    try {
      const response = await axios.post("http://192.168.0.104:3000/index", {
        email: email,
        senha: senha,
        nome: nome,
      });

      await AsyncStorage.setItem("token", response.data.token);

      router.push("/cadastro");

      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro ao enviar dados:", error.response.data.message);
      } else {
        console.error("Erro ao enviar dados:", error);
      }
    }
  };

  const handlePressLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.104:3000/index/login",
        {
          email: nomeLogin,
          senha: senhaLogin,
        }
      );

      await AsyncStorage.setItem("token", response.data.token);

      router.push("/cadastro");

      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Erro ao enviar dados:", error.response.data.message);
      } else {
        console.error("Erro ao enviar dados:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CADASTRO</Text>

      <Text style={styles.text}>realize seu cadastro</Text>

      <Imput label="nome" value={nome} onchangeText={setNome} />
      <Imput label="email" value={email} onchangeText={setEmail} />
      <Imput label="senha" value={senha} onchangeText={setSenha} />

      <Button
        onPress={handlePress}
        title="CADASTRAR"
        color="green"
        accessibilityLabel="Learn more about this purple button"
      />

      <Text style={styles.title}>LOGIN</Text>

      <Text style={styles.text}>realize seu LOGIN</Text>

      <Imput label="Email" value={nomeLogin} onchangeText={setNomeLogin} />
      <Imput label="senha" value={senhaLogin} onchangeText={setSenhaLogin} />

      <Button
        onPress={handlePressLogin}
        title="LOGAR"
        color="green"
        accessibilityLabel="Learn more about this purple button"
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
});
