import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Text, Alert, ActivityIndicator, TextInput } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { FIREBASE_STORAGE } from "../firebaseConfig";
import { ref, uploadBytes } from 'firebase/storage';


const UploadScreen = ({navigation}) => {
  const [documento, setDocumento] = useState([]);
  const [nomeDocumento, setNomeDocumento] = useState('');
  

  const armazenaDocumento = async () => { //funcao que seleciona o arquivo nas pastas locais 
    try {
      const resultado = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
      console.log('Resultado do DocumentPicker:', resultado); // Adicionado para debug
      
      if (!resultado.cancelled) {
        setDocumento(resultado);
        console.log(resultado);
      } else { //caso o usuario saia da tela de arquivos
        Alert.alert('Nenhum documento selecionado');
      }
    } catch (error) {
      console.error('Erro ao selecionar o documento:', error);
    }
  }
  
  const uploadDocumento = async () => { //funcao que envia o valor armazenado no state documento para o Firebase Storage
    try {
      if (!documento) { //Verifica se foi armazenaDocumento conseguiu armazenar no state
        Alert.alert('Nenhum documento selecionado');
        return;
      }

      const nomeArquivo = `${nomeDocumento}`; 
      const documentoRef = ref(FIREBASE_STORAGE, `gs://teste-taugor-8d480.appspot.com/${nomeArquivo}`);
  
      await uploadBytes(documentoRef, documento);
  
      Alert.alert('Documento enviado com sucesso');
    } catch (error) {

      Alert.alert('Erro durante o upload:', error.message);
    }
    navigation.navigate('HomeScreen')
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textHeader}>Adicione seus arquivos aqui</Text>
      </View>

      <TouchableOpacity style={styles.cont} onPress={() => armazenaDocumento()}>
        <Image source={require('../assets/plus.png')} style={styles.image} />
      </TouchableOpacity>

      <TextInput
        style={styles.inputContainer}
        value={nomeDocumento}
        onChangeText={setNomeDocumento}
        placeholder='Insira um Nome ao Arquivo'
      />
      <View style={{top: 58 }}>
        <Text style={{fontSize: 13, textAlign: 'center', marginHorizontal: 90,}}>
          Verfique de não repetir o mesmo nome ja cadastrado
          </Text>
      </View>

        <TouchableOpacity style={styles.uploadButton} onPress={uploadDocumento}>
        <Text style={styles.textButton}>Upload</Text>
        </TouchableOpacity>
     

    </SafeAreaView>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    top: '30%', 
  },
  textHeader: {
    fontSize: 20,
    textAlign: 'center',
  },
  cont: {
    backgroundColor: '#007260',
    zIndex: 1,
    height: 120,
    width: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
  },
  image: {
    tintColor: '#FFFFFF',
    height: 90,
    width: 90,
  },
  uploadButton: {
    backgroundColor: '#007260',
    height: 40, 
    borderRadius: 5, 
    width: 150, 
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '90%',
  },
  textButton: {
    color: 'white',
    fontSize: 20,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#dcdcdc',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 10,
    top: '65%',
    position:'absolute'
  },
});
