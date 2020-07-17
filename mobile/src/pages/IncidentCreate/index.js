import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, TextInput } from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function IncidentCreate() {
  const [title, setTitle] = useState('titulo do titulo');
  const [description, setDescription] = useState('123');
  const [value, setValue] = useState('descrição');
  const ongId = '61d39daf'
  
  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  async function handleRegisterIncident(e) {
    setTitle('')
    setValue('');
    setDescription('');

    const data = {
      title,
      description,
      value,
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId, 
        }
      })

      alert('Caso cadastrado com sucesso!');
      
      navigation.navigate('Incidents');
    } catch (err) {
      alert(`Erro no cadastro, tente novamente.`);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Cadastre um caso</Text>
      <Text style={styles.description}>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</Text>

      <View style={styles.incident}>
        <TextInput 
          style={styles.textInput}
          placeholder="Título do caso"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextInput style={styles.textInput} placeholder="Descrição">DescriçãoCaso</TextInput>
        <TextInput style={styles.textInput} placeholder="Valor em R$">22222</TextInput>
      </View>

      <View style={styles.action}>
        <TouchableOpacity style={styles.registerAction} onPress={handleRegisterIncident}>
          <Text style={styles.actionText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}