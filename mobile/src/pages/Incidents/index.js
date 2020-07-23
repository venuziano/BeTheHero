import React, { useState, useEffect } from 'react';
import { Feather, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity, AsyncStorage, Alert, BackHandler, ToastAndroid } from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  // const [validCloseWindow, setvalidCloseWindow] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  function navigateToIncidentCreate() {
    navigation.navigate('IncidentCreate');
  }

  const handleLogout = () => {
    Alert.alert(
      "Deseja sair?",
      "Confirme abaixo.",
      [
        { 
          text: "Sim", 
          onPress: () => navigation.navigate('Logon')
        },
        {
          text: "Não",
          onPress: () => {},
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  }

  const handleExit = () => {
    Alert.alert(
      "Deseja fechar o aplicativo?",
      "Confirme abaixo.",
      [
        { 
          text: "Sim", 
          onPress: () => BackHandler.exitApp()
        },
        {
          text: "Não",
          onPress: () => {},
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  }

  BackHandler.addEventListener('hardwareBackPress', handleExit);

  async function loadStorage() {
    var ongid = '';
    var ongname = '';

    try {
      ongid = await AsyncStorage.getItem('ongID');
      ongname = await AsyncStorage.getItem('ongName');

    } catch (e) {
      alert(e);
    }

    return new Promise((resolve, reject) => {

      if (ongid !== null) {
        setID(ongid);
        setName(ongname);
        const ong = { 'name': ongname, 'id': ongid}

        return resolve(ong);
      }
    })
  }

  loadIncidents = async function(ong) {

    if (loading) {
      return;
    }

    if (total > 0 && incidents.lenght === total) {
      return;
    }

    try {
      const response = await api.get('profiles', {
        headers: {
          Authorization: ong.id,
        },
        params: { page },
      });
  
      setIncidents([ ... incidents, ... response.data]);
      setTotal(response.headers['x-total-count']);
      setPage(page + 1);
      setLoading(false);
      
      // if(! response.data) {
      //   console.log('ta vazioo: ' + response.data)
      // } else {
      //   console.log('não ta vazio: ' + response.data)
      // }

      console.log('page: ' + page + ' , list: ' + response.data)

    } catch (e) {
      alert(e);
    }  
  }

  loadIncidentsAfterLaunch = async function() {

    if (loading) {
      return;
    }

    if (total > 0 && incidents.lenght === total) {
      return;
    }

    try {
      const response = await api.get('profiles', {
        headers: {
          Authorization: id,
        },
        params: { page },
      });

      setIncidents([ ... incidents, ... response.data]);
      setTotal(response.headers['x-total-count']);
      setPage(page +1);
      setLoading(false);

    } catch (e) {
      alert(e);
    }  
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
     
      loadStorage()
      .then(loadIncidents)
      
      return function cleanup() {
        loadStorage()
        .then(loadIncidents)
      };

    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <SimpleLineIcons onPress={handleLogout} name="logout" size={24} color="black" />
      </View>

      <Text style={styles.title}>Bem-Vinda, {name}</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
      <Text style={styles.totalText}>
          Total de <Text style={styles.totalTextBold}>{total} casos.</Text>
      </Text>

      <FlatList
        data={incidents}
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidentsAfterLaunch}
        onEndReachedThreshold={0.3}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
               style: 'currency', 
               currency: 'BRL' 
               }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#E02041"></Feather>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigateToIncidentCreate()}
        style={styles.touchFloatButton}>
        <AntDesign style={styles.FloatingButtonStyle} name="pluscircle" size={50} color="#E02041" />
      </TouchableOpacity>
    </View>
  );
}