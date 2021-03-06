import { StyleSheet } from 'react-native';
import Constants from 'expo-constants'

export default StyleSheet.create({
  keyboard: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },
  
  container: {
    justifyContent: 'space-around'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  goBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  goBackText: {
    color: '#41414d',
    fontSize: 15,
    fontWeight: 'bold'
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: '#13131a',
    fontWeight: 'bold'
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#737380'
  },

  ong: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
    marginTop: 48,
  },

  textInput: {
    height: 60,
    fontSize: 18, 
    borderColor: 'gray', 
    borderBottomWidth: 1
  },

  action: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },

  registerAction: {
    backgroundColor: '#e02041',
    borderRadius: 8,
    height: 50,
    width: '98%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  actionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
});