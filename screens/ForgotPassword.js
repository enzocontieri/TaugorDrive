import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const enviarEmail = () => {
    //Envia apenas um Alerta com o email passado no imput 
    Alert.alert('E-mail enviado', `O e-mail de recuperação foi enviado para ${email}`, [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Login'), 
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text>Digite o e-mail para recuperar a senha:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={enviarEmail}>
        <Text style={styles.buttonText}>Enviar E-mail</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#dcdcdc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: 250,
  },
  button: {
    backgroundColor: '#007260',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});
