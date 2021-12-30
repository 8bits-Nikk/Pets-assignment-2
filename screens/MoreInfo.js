import React, {useState} from "react";
import {Image, Text, View,StyleSheet} from "react-native";
import {Card} from "react-native-paper";

const MoreInfo = ({route}) =>{

    const [data] = useState(route.params.data);

    return(
        <View style={styles.body}>
            <Card>
                <Image source={{uri: data.Img}} style={styles.image}/>
            </Card>
            <View style={{marginTop: 12,}}>
                <Text style={styles.fonts}>👉 Name: {data.Name}</Text>
                <Text style={styles.fonts}>👉 Dob: {data.Dob}</Text>
                <Text style={styles.fonts}>👉 Gender: {data.Gender}</Text>
                <Text style={styles.fonts}>👉 Breed: {data.Breed}</Text>
                <Text style={styles.fonts}>👉 Description: {data.Description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
      padding: 12,
    },
    image: {
        height: 300,
    },
    fonts: {
        fontSize: 20,
        color: "#000000",
        margin:3,
        textAlign: "justify"
    },

});

export default MoreInfo;