import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginPage from './src/pages/Login'
import HomePage from './src/pages/Home'
import UserPage from './src/pages/User'
import RolesPage from './src/pages/Roles'
import RolesListagemPage from './src/pages/Roles/roleslistagem'
import RolesCadastroPage from './src/pages/Roles/rolesCadastro'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Página de Acesso' }} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="User" component={UserPage} />
                <Stack.Screen name="Roles" component={RolesPage} />
                <Stack.Screen name="RolesListagem" component={RolesListagemPage} />
                <Stack.Screen name="RolesCadastro" component={RolesCadastroPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
