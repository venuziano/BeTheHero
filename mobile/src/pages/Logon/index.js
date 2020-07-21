import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, View, TextInput, TouchableOpacity, AsyncStorage, Alert } from 'react-native'
import { Entypo } from '@expo/vector-icons';

import styles from './styles';
import api from '../../services/api'

export default function Logon() {
  // const ongID = AsyncStorage.getItem('ongID')
  const [id, setId] = useState('');

  const navigation = useNavigation();

  function incidentList() {
    navigation.navigate('Incidents')
  }

  function newOng() {
    navigation.navigate('newOng');
  }

  async function loadStorage() {
    setId('');
    
    try {
      const ongid = await AsyncStorage.getItem('ongID');

      if (ongid !== null) {
        setId(ongid);
      }

    } catch (e) {
      alert(e);
    } 
  }

  async function handleLogon() {
    
    try {
      const response = await api.post('session', { id })

      await AsyncStorage.setItem('ongID', id);
      await AsyncStorage.setItem('ongName', response.data.name);

      navigation.navigate('Incidents');
    } catch (e) {
      alert(e)
      // Alert.alert('Falha', 'Erro no login, tente novamente.')
    }
  }

  useEffect(() => {  
    navigation.addListener('focus', () => {
      loadStorage();
    });
  }, []);

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Faça seu Login</Text>

      <View style={styles.login}>
        <TextInput 
          style={styles.textInput}
          placeholder="Sua ID"
          value={id}
          onChangeText={text => setId( text )}
        />
      </View>

      <View style={styles.action}>
        <TouchableOpacity style={styles.loginAction} onPress={handleLogon}>
          <Text style={styles.actionText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => newOng()}
      >
      <Entypo name="login" size={16} color="#E02041"></Entypo>
      <Text style={styles.detailsButtonText}>Não tenho cadastro</Text>
      </TouchableOpacity>
    </View>
  )
}