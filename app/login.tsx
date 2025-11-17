import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 6,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-blue-500 text-lg font-bold">Login</Text>
    </SafeAreaView>
  );
};

export default Login;
