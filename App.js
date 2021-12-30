import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Splash from "./screens/Splash";
import MainScreen from "./screens/MainScreen";
import MoreInfo from "./screens/MoreInfo";



const Stack = createNativeStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name= "Splash"
                component={Splash}
                options={{
                    header: () => null}}
                />

                <Stack.Screen
                    name= "Pets"
                    component={MainScreen}
                />
                <Stack.Screen
                    name= "More Info"
                    component={MoreInfo}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
