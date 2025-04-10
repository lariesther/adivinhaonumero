import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';

export default function App() {
  const numeroSecreto = 42; // Você pode mudar ou usar Math.random()
  const [palpite, setPalpite] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [tentativas, setTentativas] = useState(5);
  const [acertou, setAcertou] = useState(false);

  const verificarPalpite = () => {
    const numero = parseInt(palpite);

    if (isNaN(numero) || numero < 0 || numero > 100) {
      setMensagem('Digite um número entre 0 e 100!');
      return;
    }

    Keyboard.dismiss(); // Fecha o teclado

    if (numero === numeroSecreto) {
      setMensagem(`Parabéns! Você acertou! O número era ${numeroSecreto}.`);
      setAcertou(true);
    } else {
      if (tentativas - 1 === 0) {
        setMensagem(`Você perdeu! O número era ${numeroSecreto}.`);
        setTentativas(0);
      } else {
        setMensagem(numero < numeroSecreto ? 'Chute mais alto!' : 'Chute mais baixo!');
        setTentativas(tentativas - 1);
      }
    }

    setPalpite('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Qual o número de 0 a 100?</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite seu palpite"
        value={palpite}
        onChangeText={setPalpite}
      />

      <TouchableOpacity style={styles.botao} onPress={verificarPalpite}>
        <Text style={styles.botaoTexto}>Verificar</Text>
      </TouchableOpacity>

      <Text style={styles.mensagem}>{mensagem}</Text>
      <Text style={styles.tentativas}>Tentativas restantes: {tentativas}</Text>

      {acertou && (
        <Image source={require('./assets/segredo.png')} style={styles.imagemSegredo} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000.',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mensagem: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  tentativas: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  imagemSegredo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
  },
});

