import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard,
  KeyboardAvoidingView, Platform, ScrollView, Alert, AsyncStorage
} from 'react-native'


import api from '../../services/api'

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function newOng() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const navigation = useNavigation();

  function backToLogin() {
    navigation.goBack();
  }

  async function handleNewOng(values) {

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const response = await api.post('ongs', data);

      try {
        await AsyncStorage.setItem('ongID', response.data.id)
        
      } catch {
        alert('Erro ao capturar ID da ong cadastrada.');
      }

      Alert.alert('Sucesso', `Seu ID de acesso: ${response.data.id}`);
      navigation.navigate('Logon')
    } catch {
      Alert.alert('Falha', 'Erro no cadastro, tente novamente.');
    }
  }

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS == "android" ? "padding" : "height"}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.keyboard}
    >

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={logoImg} />

            <TouchableOpacity style={styles.goBack} onPress={backToLogin}>
              <Feather name="arrow-left" size={28} color="#e82041" />
              <Text style={styles.goBackText}>Já tenho cadastro</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Cadastro</Text>
          <Text style={styles.description}>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrar os casos da sua ONG.</Text>
          
          <ScrollView>
            <View style={styles.ong}>
              <TextInput 
                style={styles.textInput}
                placeholder="Nome da ONG"
                value={name}
                onChangeText={text => setName( text )}
              />
              <TextInput
                style={styles.textInput}
                placeholder="E-mail"
                value={email}
                onChangeText={text => setEmail( text )}
              />
              <TextInput
                style={styles.textInput} 
                placeholder="Whatsapp"
                value={whatsapp}
                onChangeText={text => setWhatsapp( text )}
              />
              <TextInput
                style={styles.textInput} 
                placeholder="Cidade"
                value={city}
                onChangeText={text => setCity( text )}
              />
              <TextInput
                style={styles.textInput} 
                placeholder="UF"
                value={uf}
                onChangeText={text => setUf( text )}
              />
            </View>
          </ScrollView>

          <View style={styles.action}>
            <TouchableOpacity style={styles.registerAction} onPress={handleNewOng}>
              <Text style={styles.actionText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}