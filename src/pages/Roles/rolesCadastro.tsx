import React from 'react';
import { Alert, Button, FlatList, Text, View } from "react-native"
import { NavigationProp, useNavigation , useRoute} from '@react-navigation/native'
import { rolesService } from '../../services/roles.service'
import MyInput from '../../components/MyInput'
import styles from './styles'

export default function RolesCadastro() {
    const navigation = useNavigation<NavigationProp<any>>()
    const [name, setName] = React.useState('')
    const [descricao, setDescricao] = React.useState('')


    navigation.setOptions({ title: 'Nova Role' })

    function create() {
        if (!name || name.trim().length < 1) {
            Alert.alert('Nome é obrigatório')
            return
        }
        if (!descricao || descricao.trim().length < 1) {
            Alert.alert('Descrição é obrigatório')
            return
        }
        
        rolesService.create(name, descricao).then(result => {
            if (result === true) {
                setName('')
                setDescricao('')
                navigation.goBack()
            } else {
                Alert.alert(result+'')
            }
        }).catch(error => console.error(error))
    }

    return (
        <View style={styles.containerCadastro}>
            <MyInput title='Nome' value={name} change={setName} />
            <MyInput title='Descricao' value={descricao} change={setDescricao} />

            <View style={styles.buttonView}>
                <Button title='Salvar' onPress={create} />
            </View>

        </View>
    )
}