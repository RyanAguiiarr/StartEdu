import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dieta</Text>

      <Text style={styles.text}>StartEdu</Text>

      <Link href="/entrar" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "green",
  },
  text: {
    fontSize: 16,
    color: "white",
    width: 240,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "blue",
    width: "100%",
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 34,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
