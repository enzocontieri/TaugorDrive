import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Pressable, TextInput, Alert, TouchableOpacity, Button } from 'react-native';
import { FIREBASE_STORAGE } from '../firebaseConfig';
import { ref, getMetadata } from 'firebase/storage';

const HomeScreen = ({ navigation }) => {
  const [nomeArquivo, setNomeArquivo] = useState('');
  const [infoArquivos, setInfoArquivos] = useState([]);

  // funcao que busca o arquivo passando nomeArquivo 
  const buscarArquivo = async () => {
    try {
      if (!nomeArquivo.trim()) {
        Alert.alert('Nome do arquivo não pode estar vazio');
        return;
      }

      const pegarDocumento = `gs://teste-taugor-8d480.appspot.com/${nomeArquivo}`;
      // integracao com firebase 
      const documentoRef = ref(FIREBASE_STORAGE, pegarDocumento);

      // puxa as informações do firebase storage
      const metadata = await getMetadata(documentoRef);

      // instancia as informacoes para o novo arquivo 
      const novoArquivo = {
        nome: nomeArquivo,
        tamanho: metadata.size,
        dataCriacao: metadata.timeCreated,
        type: metadata.contentType
      };

      // Adicionando as informações do novo arquivo ao array existente
      setInfoArquivos(prevState => [...prevState, novoArquivo]);
    } catch (error) {
      console.error('Erro ao buscar o arquivo:', error);
      Alert.alert('Erro ao buscar o arquivo:', error.message);
    }
  };

  // determinar o tipo de conteúdo do arquivo
  const tipoConteudo = (type) => {
    if (type.startsWith('video/')) {
      return 'Vídeo';
    } else if (type === 'application/pdf') {
      return 'PDF';
    } else if (type.startsWith('image/')) {
      return 'Imagem';
    } else {
      return 'Outro';
    }
  };

  // Função para exibir os detalhes do arquivo
  const detalhesArquivos = (index) => { //recebe index que sera o indice 
    setInfoArquivos(prevState => // atualiza o estado e acessa o estado anterior
      prevState.map((arquivo, i) => // mapea o estado anterior e percorre a lista de arquivos 
        i === index ? { ...arquivo, detalhesVisiveis: !arquivo.detalhesVisiveis } : arquivo //verifica se i é igual ao index e cria um novo objeto com os atrivbutos
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.textHeader}>Bem Vindo</Text>
          <Text style={{ fontSize: 15 }}>Busque aqui os seus arquivos</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite o nome do arquivo"
            value={nomeArquivo}
            onChangeText={setNomeArquivo}
            style={styles.inputText}
          />
          <TouchableOpacity style={styles.inputButton} onPress={buscarArquivo}>
            <Text style={{ fontSize: 20, padding: 7, color: 'white', fontWeight: 'bold' }}>Buscar</Text>
          </TouchableOpacity>
          <View style={{left: -195}}>
            <Text style={{ fontSize: 15, top: 40 }}>Arquivos adicionados:</Text>
          </View>
        </View>


        <ScrollView style={{top: 30}}>
        {infoArquivos.map((infoArquivo, index) => (
            <TouchableOpacity key={index} onPress={() => detalhesArquivos(index)}>
              <View style={styles.fileContainer}>
                <Text>Nome do arquivo: {infoArquivo.nome}</Text>
                {infoArquivo.detalhesVisiveis && ( // se detalhes do infoArquivo for verdadeiro exibe as informacoes  
                  <>
                    <Text>Tamanho do arquivo: {infoArquivo.tamanho} bytes</Text>
                    <Text>Data de criação: {new Date(infoArquivo.dataCriacao).toLocaleString()}</Text>
                    <Text>Tipo de conteúdo: {tipoConteudo(infoArquivo.type)}</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View>
          <Pressable
            onPress={() => navigation.navigate("UploadScreen")}
            style={styles.button}
          >
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Upload</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  headerContainer: {
    flex: 1,
    marginHorizontal: 22
  },
  textHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
    marginTop: 25,
    color: 'black'
  },
  button: {
    paddingBottom: 16,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007260',
    textColor: 'white'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#dcdcdc',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  inputText: {
    flex: 3
  },
  inputButton: {
    left: '85%',
    position: 'absolute',
    backgroundColor: '#007260',
    alignItems: 'center',
    borderRadius: 7,
    flex: 1,

  },
  fileContainer: {
    marginTop: 10,
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    padding: 10,
  },
  infoText: {
    fontFamily: "",
  }
});
