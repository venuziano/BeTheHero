import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard,
  KeyboardAvoidingView, Platform, ScrollView, Alert, AsyncStorage
} from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function IncidentCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [ongID, setOngID] = useState('');
  
  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  async function loadStorage() {
    
    try {
      const ongid = await AsyncStorage.getItem('ongID');

      if (ongid !== null) {
        setOngID(ongid);
      }

    } catch (e) {
      alert(e);
    } 
  }

  async function handleRegisterIncident(values) {
    
    const data = {
      title,
      description,
      value,
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongID, 
        }
      })

      Alert.alert('Sucesso', 'Caso cadastrado com sucesso!');
      navigation.navigate('Incidents');
    } catch (err) {
      alert('Falha', 'Erro no cadastro, tente novamente.');
    }
  }

  useEffect(() => { loadStorage() }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "android" ? "padding" : "height"}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.keyboard}
    >

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={logoImg} />

            <TouchableOpacity onPress={navigateBack}>
              <Feather name="arrow-left" size={28} color="#e82041" />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Cadastre um caso</Text>
          <Text style={styles.description}>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</Text>
          
          <ScrollView>
            <View style={styles.incident}>
              <TextInput 
                style={styles.textInput}
                placeholder="Título do caso"
                value={title}
                onChangeText={text => setTitle( text )}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Descrição"
                value={description}
                onChangeText={text => setDescription( text )}
              />
              <TextInput
                style={styles.textInput} 
                placeholder="Valor em R$"
                value={value}
                onChangeText={text => setValue( text )}
              />
            </View>
          </ScrollView>

          <View style={styles.action}>
            <TouchableOpacity style={styles.registerAction} onPress={handleRegisterIncident}>
              <Text style={styles.actionText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}