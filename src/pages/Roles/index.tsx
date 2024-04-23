import React from 'react'
import { Button, View, Text, Alert } from 'react-native'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import { rolesService } from '../../services/roles.service'
import RolesView from '../../components/UserView'
import styles from './styles'

export default function RolesPage() {
    const navigation = useNavigation<NavigationProp<any>>()

    function listagem() {
        navigation.navigate('RolesListagem')
    }

    function cadastrar() {
        navigation.navigate('RolesCadastro')
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button title="Listagem de Roles" onPress={listagem} />
            </View>
            <View style={styles.buttons}>
                <Button title="Cadastrar Role" onPress={cadastrar}/>
            </View>
        </View>
    )
}