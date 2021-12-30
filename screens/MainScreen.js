import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Modal,
    StatusBar,
    Platform,
    Image,
    TouchableNativeFeedback, Alert
} from "react-native";
import {
    FAB,
    Card,
    Title,
    Paragraph,
    Button,
    Text,
    Appbar,
    TextInput,
    RadioButton,
    Provider,
    Colors, IconButton, HelperText,
} from "react-native-paper";
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';


const CardItem = ({item, navigation}) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <TouchableNativeFeedback onPress={() => navigation.push('More Info', {data: item})}>
            <Card style={styles.card}>
                <Card.Cover source={{uri: item.Img}}/>
                <Card.Content>
                    <Title>{item.Name}</Title>
                    <Paragraph numberOfLines={showMore ? 0 : 1}>{item.Description}</Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => {
                        setShowMore(!showMore)
                    }}>{showMore ? "Show Less" : "Show More"}</Button>
                </Card.Actions>
            </Card>
        </TouchableNativeFeedback>
    );
}

const MainScreen = ({navigation}) => {

    const [Data, setData] = useState([
        {
            id: 1,
            Name: 'Teddy',
            Gender: 'Male',
            Breed: 'Breed A',
            Dob: '1/02/2021',
            Img: 'cat1',
            Description: 'The cat is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family.',
        },
        {
            id: 2,
            Name: 'Max',
            Gender: 'Male',
            Breed: 'Breed A',
            Dob: '1/10/2021',
            Img: 'cat2',
            Description: 'The cat is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family.',
        },
        {
            id: 3,
            Name: 'Buddy',
            Gender: 'Male',
            Breed: 'Breed A',
            Dob: '1/06/2021',
            Img: 'dog1',
            Description: 'The dog or domestic dog, is a domesticated descendant of the wolf which is characterized by an upturning tail. The dog derived from an ancient, extinct wolf, and the modern grey wolf is the dog\'s nearest living relative.',
        },
        {
            id: 4,
            Name: 'Milo',
            Gender: 'Male',
            Breed: 'Breed A',
            Dob: '31/12/2020',
            Img: 'dog2',
            Description: 'The dog or domestic dog, is a domesticated descendant of the wolf which is characterized by an upturning tail. The dog derived from an ancient, extinct wolf, and the modern grey wolf is the dog\'s nearest living relative.',
        },
    ])

    const [showModel, setShowModel] = useState(false);

    const [name, setName] = useState("");
    const [Gender, setGender] = useState();
    const [Dob, setDob] = useState();
    const [Breed, setBreed] = useState("Select Breed");
    const [Description, setDescription] = useState("Description");

    const [Len, setLen] = useState("0/20");
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const [shouldShow, setShouldShow] = useState(false);
    const [image, setImage] = useState(null);


    const showDatepicker = () => {
        setShow(true);
    };
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
        setDob(fDate);
    };

    const openPicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImage(image.path);
            setShouldShow(true)
        });

    };

    const setNull = () => {
        setShowModel(false);
        setName("");
        setGender(null);
        setBreed(null);
        setImage(null);
        setDescription("");
        setDob("");
        setShouldShow(false);
    }
    const addToList = () => {
        console.log(hasNameErrors());
        console.log(hasDesErrors());
        console.log(hasGenderErrors());
        console.log(hasImageErrors());
        if (hasNameErrors || hasDesErrors  || hasGenderErrors || hasImageErrors){
            const newId = Data.length + 1;
            setData([...Data, {
                id: newId,
                Name: name,
                Gender: Gender,
                Dob: Dob,
                Breed: Breed,
                Img: image,
                Description: Description,
            }])
            setNull();
        }else{
            Alert.alert('Enter Valid Data.');
        }
    }
    const hasNameErrors = () => {
        const regex = /^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$/g;
        return !regex.test(name);
    };
    const hasDesErrors = () => {
        return Description.length > 20;
    }
    const hasGenderErrors = () =>{
        return Gender == null;
    }
    const hasImageErrors = () => {
        return image == null;
    }

    return (
        <Provider>
            <View style={styles.body}>
                <StatusBar barStyle={"light-content"}/>
                <Modal visible={showModel} onRequestClose={setNull}>
                    <Appbar.Header style={{
                        backgroundColor: '#FFFFFF',
                    }}>
                        <Appbar.BackAction onPress={setNull}/>
                        <Appbar.Content title="Add Pets"/>
                    </Appbar.Header>

                    <View style={styles.modelBody}>
                        <TextInput label="Name of Pet"
                                   mode={'outlined'}
                                   placeholder={"Enter Name"}
                                   onChangeText={name => {
                                       setName(name)
                                   }}/>
                        <HelperText type="error" visible={hasNameErrors()}>
                            Name is invalid!
                        </HelperText>


                        <View style={styles.dropDown}>
                            <Picker
                                selectedValue={Breed}
                                onValueChange={(itemValue) => setBreed(itemValue)}
                                itemStyle={{color: '#757575',}}
                            >
                                <Picker.Item label="Breed A" value="breedA"/>
                                <Picker.Item label="Breed B" value="breedB"/>
                                <Picker.Item label="Breed C" value="breedC"/>
                            </Picker>
                        </View>

                        <TextInput style={{marginTop: 12,}}
                                   mode={"outlined"}
                                   label={"Description"}
                                   placeholder={"Enter Description"}
                                   onChangeText={dec => {
                                       setDescription(dec)
                                       const len = dec.length.toString() + "/20"
                                       setLen(len)
                                   }}
                                   right={<TextInput.Affix text={Len}/>}
                        />
                        <HelperText type="error" visible={hasDesErrors()}>
                            Description is out of bound.
                        </HelperText>

                        <TextInput
                            style={{marginTop: 12,}}
                            mode={"outlined"}
                            label={"Date of Birth"}
                            value={Dob}
                            placeholder={"dd/mm/yyyy"}
                            showSoftInputOnFocus={false}
                            onPressIn={showDatepicker}
                            right={<TextInput.Icon name="calendar" onPress={showDatepicker}/>}
                        />
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        )}

                        <View style={{flexDirection: 'column',}}>
                            <Text style={{marginTop: 12, fontSize: 20}}>Gender :</Text>
                            <View style={{alignItems: 'center', flexDirection: 'row',}}>
                                <Text>Male : </Text>
                                <RadioButton
                                    value="Male"
                                    status={Gender === 'Male' ? 'checked' : 'unchecked'}
                                    onPress={() => setGender('Male')}
                                />
                            </View>
                            <View style={{justifyContent: "flex-start", alignItems: 'center', flexDirection: 'row',}}>
                                <Text>FeMale : </Text>
                                <RadioButton
                                    value="FeMale"
                                    status={Gender === 'FeMale' ? 'checked' : 'unchecked'}
                                    onPress={() => setGender('FeMale')}
                                />
                            </View>
                        </View>

                        <View
                            style={{flexDirection: 'row'}}>
                            <Text style={{marginTop: 12, fontSize: 20}}>Upload Image :</Text>
                            <IconButton
                                icon="image-plus"
                                color={Colors.red500}
                                size={30}
                                onPress={openPicker}
                            />

                        </View>
                        <View>
                            {shouldShow ? (
                                <Image
                                    source={{
                                        uri: image,
                                    }}
                                    style={{width: 150, height: 150}}
                                />
                            ) : null}
                        </View>
                        <Button icon="plus-circle"
                                mode="contained"
                                style={styles.addButton}
                                onPress={addToList}> Add Pet</Button>

                    </View>
                </Modal>
                <FlatList data={Data}
                          renderItem={({item}) => (
                              <CardItem item={item} navigation={navigation}/>
                          )}
                          keyExtractor={item => item.id}/>
                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={() => setShowModel(true)}
                />
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,

    },
    card: {
        margin: 8,
        elevation: 4,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    modelBody: {
        flex: 1,
        margin: 16,
    },
    dropDown: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#FAFAFA',
        borderColor: '#757575',
        marginTop: 16,
    },
    addButton: {
        marginTop: 12,
        height: 50,
        justifyContent: "center",
        backgroundColor: '#00c9bf',
        borderRadius: 12,
    },
    image: {
        marginVertical: 24,
        alignItems: 'center',
    },

})
export default MainScreen;
