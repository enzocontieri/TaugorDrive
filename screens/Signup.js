import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";


const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = FIREBASE_AUTH
    
    //funcao que cadastra o usuario 
  const handleSignup = async () => {
            try{
                const response = await createUserWithEmailAndPassword( auth, email, password )
                console.log(response);
            } catch (error) {
                console.log(error);
                alert('Sing Up[ in failed: ' + error.message)
            }   
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={ styles.textContainer }>
                        Criar Conta
                    </Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.textSubTitle}>Email</Text>
                    <View style={styles.textBox}>
                        <TextInput
                            placeholder='Insira o Email'
                            placeholderTextColor={'black'}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            keyboardType='email-address'
                            style={{width: "100%"}}
                        />
                    </View>
                </View>

               

                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.textSubTitle}>Senha</Text>

                    <View style={styles.textBox}>
                        <TextInput
                            placeholder='Insira a Senha'
                            placeholderTextColor={'black'}
                            value={password}
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                            style={{ width: "100%" }}
                        />
                    </View>
                </View>

                <TouchableOpacity
                            onPress={async () => {
                                await handleSignup();
                                navigation.navigate('Login');
                            }}
                            style={[styles.button, { marginTop: 18, marginBottom: 4 }]}
                                    >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>


                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                    <View
                        style={styles.line}
                    />
                    <Text style={{ fontSize: 14 }}>Ou ja possui conta ?</Text>
                    <View
                        style={styles.line}
                    />
                </View>


                <View style={styles.textLeftFooter}>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.textRightFooter}>Entre Aqui</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({
    container:{
        flex: 1, marginHorizontal: 22
    },
    textContainer:{
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
        color: 'black'
    },
    textSubTitle:{
        fontSize: 16,
        fontWeight: 400,
        marginVertical: 8
    },
    textBox:{
        width: "100%",
        height: 48,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 22
    },
    textLeftFooter:{
        flexDirection: "row",
        justifyContent: "center",
    },
    button:{
        width: "100%",
        height: 48,
        backgroundColor: '#007260',
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'grey',
        marginHorizontal: 10
    },
    midiaImg:{
        height: 36,
        width: 36,
        marginRight: 8
    }

});