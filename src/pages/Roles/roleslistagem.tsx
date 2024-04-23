import React from 'react';
import { Alert, Button, FlatList, Text, View } from "react-native"
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { rolesService } from '../../services/roles.service'
import RolesView from '../../components/RolesView'

export default function RolesListagem() {

  const navigation = useNavigation<NavigationProp<any>>()
  const [refreshing, setRefreshing] = React.useState(false)
  const [roles, setRoles] = React.useState<any[]>([])

  React.useEffect(() => {
    fetchRoles()
  }, [])

  function logOut() {
      navigation.goBack()
  }

    async function fetchRoles() {
        setRefreshing(true)
        try {
            const list = await rolesService.get()
            if (list) setRoles(list)
            else logOut()
        } catch (error) {
            console.error(error)
        }
        setRefreshing(false)
  }

  function editRole(id: number) {
      //navigation.navigate('Roles', { id })
  }

  function removeRole(id: number) {
    // rolesService.remove(id).then(isDeleted => {
    //       if (isDeleted) fetchRoles()
    //   })
  }

  return (
      <View>
          <FlatList
              data={roles}
              refreshing={refreshing}
              onRefresh={fetchRoles}
              renderItem={({ item }) =>
                  <RolesView role={item} edit={editRole} remove={removeRole} />
              }
          />
      </View>
  )
}
