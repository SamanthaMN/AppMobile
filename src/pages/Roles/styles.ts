import { Dimensions, StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        
      },
    containerCadastro:{
      flex: 1,
      paddingTop: 40,
      alignItems: 'center',
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
    },
    buttons:{
      padding: 50
    },
    buttonView: {
      marginTop: 40,
      width: Dimensions.get('screen').width - 140,
  }
})