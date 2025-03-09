import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="entrar" options={{ headerShown: false }} />
        <Stack.Screen name="cadastro" options={{ headerShown: false }} />
        <Stack.Screen name="lista" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
