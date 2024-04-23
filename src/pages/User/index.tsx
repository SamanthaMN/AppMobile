import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { Button, View, Text, Alert  } from 'react-native'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'

import MyInput from '../../components/MyInput'

import styles from './styles'
import { userService } from '../../services/user.service'
import { rolesService } from '../../services/roles.service'

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    const id: number = route.params ? (route.params as any).id : 0
    const [refreshing, setRefreshing] = React.useState(false)

    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [Roles, setRoles] = React.useState<any[]>([])
    const [RolesSelected, setRolesSelected] = React.useState('')
    const [ArrayRoles, setArrayRoles] = React.useState<string[]>([])
    //const [ArrayRoles, setArrayRoles] = React.useState([''])
    const [password, setPassword] = React.useState('')
    const [confirmPass, setConfirmPass] = React.useState('')

    function fetchUser() {
        if (id > 0) {
            userService.getById(id).then(user => {
                setName(user.name)
                setUsername(user.username)
                setArrayRoles(user.role)
            })
        }
    }

    async function buscaRoles(){
        setRefreshing(true)
        try {
            const list = await rolesService.get()
            if (list) 
                setRoles(list)
            else 
                navigation.goBack()
        } catch (error) {
            console.error(error)
        }
        setRefreshing(false)
    }

    function mapeamentoRoles(){
        return Roles.map(item => (
            <Picker.Item key={item.id} label={item.name} value={item.id} />
        ));
    }

    React.useEffect(() => {
        fetchUser()

        if (id === 0) {
            navigation.setOptions({ title: 'Novo Usuário' })
        } else {
            navigation.setOptions({ title: 'Editar Usuário' })
        }
        buscaRoles()
    }, [id])

    function create() {
        if (!name || name.trim().length < 1) {
            Alert.alert('Nome é obrigatório')
            return
        }
        if (!username || username.trim().length < 1) {
            Alert.alert('Login é obrigatório')
            return
        }
        if (!password || password.trim().length < 1) {
            Alert.alert('Senha é obrigatória')
            return
        }
        if (password !== confirmPass) {
            Alert.alert('Senha não confere')
            return
        }
        
        userService.create(name, username, ArrayRoles, password).then(result => {
            if (result === true) {
                setName('')
                setUsername('')
                setRoles([])
                setRolesSelected('')
                setArrayRoles([])
                setPassword('')
                setConfirmPass('')
                navigation.goBack()
            } else {
                Alert.alert(result+'')
            }
        }).catch(error => console.error(error))
    }

    function update() {
        if (!name || name.trim().length < 1) {
            Alert.alert('Nome é obrigatório')
            return
        }
        
        userService.update(id, name).then(result => {
            if (result === true) {
                setName('')
                setUsername('')
                navigation.goBack()
            } else {
                Alert.alert(result+'')
            }
        }).catch(error => console.error(error))
    }

    function save() {
        if (id > 0) update()
        else create()
    }

    function saveRole() {
        setArrayRoles(prevArray => [...prevArray, RolesSelected])
    }

    return (
        <View style={styles.container}>
            <MyInput title='Nome' value={name} change={setName} />
            <MyInput title='Login' value={username} change={setUsername} disabled={id > 0} />
            
            <Text>Selecione uma Role:</Text>
            <Picker selectedValue={RolesSelected}
                    onValueChange={(itemValue, itemIndex) => setRolesSelected(itemValue)}
                    style={{ height: 70, width: 300 }}>

                {mapeamentoRoles()}
            </Picker>

            {/*<Text>Roles adicionadas: {ArrayRoles}</Text>*/}

            <View style={styles.buttonView}>
                <Button title='Adicionar Role' onPress={saveRole} />
            </View>

            {(id === 0) && (
                <>
                    <MyInput title='Senha' value={password} change={setPassword} isPassword />
                    <MyInput title='Confirmar Senha' value={confirmPass} change={setConfirmPass} isPassword />
                </>
            )}

            <View style={styles.buttonView}>
                <Button title='Salvar' onPress={save} />
            </View>

        </View>
    )
}