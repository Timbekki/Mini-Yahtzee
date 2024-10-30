import { Text, SafeAreaView,  } from "react-native";
import style from "../styles/style";

export default Header = () => {
  return (
    <SafeAreaView style={style.header}>
      <Text style={style.title}>Mini-Yahtzee</Text>
    </SafeAreaView>
  );
}