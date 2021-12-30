import React from 'react';
import {StatusBar, StyleSheet, Text, View} from "react-native";
import LottieView from 'lottie-react-native';
import {ActivityIndicator, Colors} from "react-native-paper";

const Splash = ({navigation}) => {


    const changeScreen = () => {
        navigation.replace('Pets');
    }
    React.useEffect(() => {
        setTimeout(changeScreen, 2000);
    });

    return (
        <View style={styles.body}>
            <StatusBar hidden={true}/>
            <View style={styles.upper}>
                <LottieView
                    style={styles.lottieImg}
                    autoPlay={true}
                    source={require('../assets/pets.json')}>
                </LottieView>
            </View>

            <View style={styles.bottom}>
                <Text style={styles.title}> Welcome to,</Text>
                <Text style={styles.title}> Pets..!</Text>
                <ActivityIndicator animation={true}
                                   color={Colors.red800}
                                   size='large'
                                   style={{
                                       marginTop: 30,
                                   }}/>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
    },
    upper: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    lottieImg: {
        height: 230,
        width: 230,
    },
    bottom: {
        flex: 1,
        backgroundColor: '#00c9bf',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        padding: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 42,
        color: "#001413",
        fontWeight: "bold",
    },
});

export default Splash;
