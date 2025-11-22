import { useClerk } from "@clerk/clerk-expo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Linking from "expo-linking";
import { TouchableOpacity } from "react-native";

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <TouchableOpacity
      onPress={handleSignOut}
      style={{
        backgroundColor: "#212122",
        padding: 10,
      }}
      className="rounded-full"
    >
      <MaterialIcons name="logout" size={14} color="white" />
    </TouchableOpacity>
  );
};
