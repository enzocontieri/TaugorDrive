import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Welcome = ({ navigation }) => {

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={{ flex: 1 }}>
                <View>
                    <Image
                    source={require('../assets/Taugor.png')}
                      style={{ 
                        display:'flex',
                        height: 150,
                        width: 150,
                        borderRadius: 20,
                        top: 200,
                        left: 110,
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}  
                    />
                </View>

                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 450,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                                              color: 'white'
                    }}>Vamos </Text>
                    <Text style={{
                        fontSize: 46,
                                              color: 'white'
                    }}>Começar!</Text>

                    <View style={{ marginVertical: 22 }}>
                        <Text style={{
                            fontSize: 16,
                            color: 'white',
                            marginVertical: 4
                        }}>Cadastre e liste arquivos</Text>
                        <Text style={{
                            fontSize: 16,
                            color: 'white',
                        }}>Calculamos para você o tamanho dos arquivos</Text>
                    </View>

                    <Button
                        title="Registrar"
                        onPress={() => navigation.navigate("Signup")}
                        style={{
                            marginTop: 22,
                            width: "100%",
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    />

                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: 'white'
                        }}>Já possui conta ?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: 'white',
                                
                                marginLeft: 4
                            }}>Entrar</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Welcome