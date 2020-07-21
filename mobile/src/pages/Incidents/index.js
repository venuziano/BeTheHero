import React, { useState, useEffect, useCallback } from 'react';
import { Feather, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
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

//   async function loadStorage() {
    
//     try {
//       const ongid = await AsyncStorage.getItem('ongID');
//       const ongname = await AsyncStorage.getItem('ongName');
//       console.log('ongid: ' + ongid)
//       console.log('ongname: ' + ongname)
//       if (ongid && ongname !== null) {
//         setID(ongid);
//         setName(ongname);
//       }
//     } catch (e) {
//       alert('erro', e);
//     }
//     console.log('id dentro do loadStorage: ' + id),
//     loadIncidents();
// }

  loadStorage = async function(callback) {
    
    try {
      const ongid = await AsyncStorage.getItem('ongID');
      const ongname = await AsyncStorage.getItem('ongName');

      console.log('ongid: ' + ongid)
      console.log('ongname: ' + ongname)

      if (ongid && ongname !== null) {
        setID(ongid);
        setName(ongname);
      }
    } catch (e) {
      alert(e);
    }
    
    console.log('id dentro do loadStorage: ' + id);
    callback();
  }

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  function navigateToIncidentCreate() {
    navigation.navigate('IncidentCreate');
  }

  function handleLogout(){
    navigation.navigate('Logon');
  }

  loadIncidents = async function() {

    if (loading) {
      return;
    }

    if (total > 0 && incidents.lenght === total) {
      return;
    }

    try {
      console.log('id dentro do loadincidents: ' + id)
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

  // async function loadIncidents() {

  //   if (loading) {
  //     return;
  //   }

  //   if (total > 0 && incidents.lenght === total) {
  //     return;
  //   }

  //   try {
  //     console.log('id dentro do loadincidents: ' + id)
  //     const response = await api.get('profiles', {
  //       headers: {
  //         Authorization: id,
  //       },
  //       params: { page },
  //     });
  
  //     setIncidents([ ... incidents, ... response.data]);
  //     setTotal(response.headers['x-total-count']);
  //     setPage(page +1);
  //     setLoading(false);

  //   } catch (e) {
  //     alert(e);
  //   }  
  // }

  useEffect(() => {
    navigation.addListener('focus', () => {
      loadStorage(loadIncidents);
    });
  }, []);

  
  // BackHandler.addEventListener('hardwareBackPress', handleBackButton());

  // function handleBackButton() {
  //   if (navigation.canGoBack()) {
  //       if (validCloseWindow)
  //           return false;
  //       setvalidCloseWindow(true);
  //       setTimeout(() => {
  //         setvalidCloseWindow(false);
  //       }, 30);
  //       ToastAndroid.show("Press Again To Exit !", ToastAndroid.SHORT);
  //       return true && clearTimeout();
  //   }
  // };

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
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.5}
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