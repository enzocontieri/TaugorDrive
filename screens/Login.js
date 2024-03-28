import { View, Text, Image , Pressable, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button';
import { FIREBASE_AUTH } from "../firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH
    
    //Autenticacao para Login 
    const handleSignin = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            setLoading(false);
            return true; // Retorna true se o login for bem-sucedido
        } catch (error) {
            console.log(error);
            alert('Sing In failed: ' + error.message);
            setLoading(false);
            return false; // Retorna false se o login falhar
        }
    }
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 16 }}>
                    <Text style={styles.textHeader}>
                        Bem Vindo de Volta ! 👋
                    </Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.textBox}>Email</Text>

                    <View style={styles.textContainer}>
                        <TextInput
                            placeholder='Insira seu email'
                            placeholderTextColor={'black'}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            keyboardType='email-address'
                            style={{width: "100%"}}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={styles.textBox}>Senha</Text>

                    <View style={styles.textContainer}>
                        <TextInput
                            placeholder='Insira sua senha'
                            placeholderTextColor={'black'}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{ width: "100%" }}
                        />
                            
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6,
                    
                }}>
                        <View style={{flexDirection: 'column'}}>
                            <Pressable style={{marginTop: 2}}
                            onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text>Esqueci minha senha</Text>
                            </Pressable>
                        </View>
                </View>

                <Button
                    title="Entrar"
                    filled
                    style={{ marginTop: 18, marginBottom: 4 }}
                    onPress={() => { handleSignin(); navigation.replace('HomeScreen');
                        
                    }}
                />


                <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 22 }}>
                    <Text style={{ fontSize: 16, color: '#222222' }}>Ainda não possui conta ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("Signup")}
                    >
                        <Text style={styles.textFooter}>Registrar</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    textHeader:{
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
        color: 'black'
    },
    textBox:{
        fontSize: 16,
        fontWeight: 400,
        marginVertical: 8
    },
    textContainer: {
        width: "100%",
        height: 48,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 22
    },
    textFooter:{
        fontSize: 16,
        color: '#39B68D',
        fontWeight: "bold",
        marginLeft: 6
    },
})