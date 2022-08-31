import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Vibration } from "react-native"
import { Audio } from 'expo-av';


const Result = ({ route, navigation }) => {

    const [valid, setValid] = useState(null)
    const [error, setError] = useState("")
    const [sound, setSound] = useState(null)

    async function playSound(isGood) {
        console.log('Loading Sound');
        var path = isGood ? require('../assets/song.mp3') : require('../assets/bad.mp3')
        const { sound } = await Audio.Sound.createAsync(
          path,
        );
        setSound(sound);
        
        console.log('Playing Sound');
        await sound.playAsync(); 
        }
    useEffect(() => {

        sound ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;

        const check = () => {
            axios.post("http://10.136.78.190:8000/api/verif", { tokenId: JSON.parse(route.params.data).tokenId, contractAddress: JSON.parse(route.params.data).contractAddress, date: JSON.parse(route.params.data).date }).then(res => {
                setValid(true)
                playSound(true)
                Vibration.vibrate(2000)
            }).catch(err => {
                setValid(false)
                setError(err.response.data.message)
                playSound(false)
                Vibration.vibrate(2000)
            })
        }
        check()
    }, [])

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/angryimg.png")} style={styles.image}>
                <View style={styles.checkList}>
                    <View style={styles.bloc}>
                        <Text style={styles.txt}>Verification ticket : {valid ? "✅" : "❌"}</Text>
                        {valid == false ? <Text style={styles.txtDesc}>{error}</Text> : null}
                        <Text style={styles.txtDesc}>Nom : {JSON.parse(route.params.data).eventDetails.name} </Text>
                        <Text style={styles.txtDesc}>Lieu : {JSON.parse(route.params.data).eventDetails.location} </Text>
                        <Text style={styles.txtDesc}>Date : {JSON.parse(route.params.data).date} </Text>
                        <Text style={styles.txtDesc}>Numero ticket : {JSON.parse(route.params.data).ticketCode} </Text>
                    </View>
                    {/* <Text style={styles.txt}>{route.params.data}</Text> */}
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    image: {
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    checkList: {
        flexDirection: "column",
        width: "90%",
        textAlign: "center",
        backgroundColor: "#00000055",
        marginTop: "20%",
        alignItems: "center",
        borderRadius: 10,
    },
    txt: {
        color: "#fff",
        fontSize: 20,
    },
    txtDesc: {
        color: "#ffffff70",
        fontSize: 20,
    },
    bloc: {
        margin: "5%",
        width: "100%",
        paddingStart: "5%",
    }
});

export default Result;