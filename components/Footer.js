import { Text, SafeAreaView,  } from "react-native";
import style from "../styles/style";

export default Footer = () => {
  return (
    <SafeAreaView style={style.footer}>
      <Text style={style.author}>Author: Timo Karjalainen</Text>
    </SafeAreaView>
  );
}