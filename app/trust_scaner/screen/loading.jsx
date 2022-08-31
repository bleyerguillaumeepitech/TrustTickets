import { View, Text, StyleSheet, Image } from "react-native"


const Loading = ({ route, navigation }) => {

    setTimeout(() => {
        navigation.navigate("Scaner")
    } , 2000)
    
    return(
        <View style={styles.container}>
            <Image source={require("../assets/tt.png")} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center"
    },
    image:{
        width: "40%",
        height: "100%",
        resizeMode: "contain"
    }
    
})

export default Loading;