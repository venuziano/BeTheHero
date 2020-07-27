import { StyleSheet } from 'react-native';
import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: '#13131a',
    fontWeight: 'bold'
  },

  login: {
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

  loginAction: {
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

  detailsButton: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  detailsButtonText: {
    color: '#41414d',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});