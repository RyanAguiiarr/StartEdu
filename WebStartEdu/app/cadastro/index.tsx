import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import { colors } from "../../constants/Colors";
import Imput from "../../components/inputs";
import { useState } from "react";
import axios from "axios";
import { router } from "expo-router";

export default function Index() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [sexo, setSexo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNasci, setData] = useState("");

  const handlePress = async () => {
    try {
      const response = await axios.post("http://192.168.0.104:3000/cadastro", {
        email: email,
        senha: senha,
        nome: nome,
        sexo: sexo,
        telefone: telefone,
        cpf: cpf,
        dataNasci: dataNasci,
        cursoId: "436473d7-0f81-482d-9c5f-971df6949da0",
      });

      router.push("/lista");

      console.log("Resposta do servidor:", response.data);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CADASTRO | LOGIN</Text>

      <Text style={styles.text}>realize seu cadastro</Text>

      <Imput label="nome" value={nome} onchangeText={setNome} />
      <Imput label="email" value={email} onchangeText={setEmail} />
      <Imput label="sexo" value={sexo} onchangeText={setSexo} />
      <Imput label="telefone" value={telefone} onchangeText={setTelefone} />
      <Imput label="cpf" value={cpf} onchangeText={setCpf} />
      <Imput label="data nascimento" value={dataNasci} onchangeText={setData} />
      <Imput label="senha" value={senha} onchangeText={setSenha} />

      <Button
        onPress={handlePress}
        title="Learn More"
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
