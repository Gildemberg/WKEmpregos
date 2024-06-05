import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Login from './src/screens/Login'
import CriarUsuario from './src/screens/CriarUsuario'
import CadastrarVenda from './src/screens/CadastrarVenda'
import EditarVenda from './src/screens/EditarVenda'
import Vendas from './src/screens/Vendas';
import Sobre from './src/screens/Sobre';
import Conta from './src/screens/Conta';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerTintColor: '#FFF',
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#070A52' }
                }}
            >
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

                <Stack.Screen name="CriarUsuario" component={CriarUsuario} options={{ title: 'Cadastro de Usuário'}} />

                <Stack.Screen name="CadastrarVenda" component={CadastrarVenda} options={{ title: 'Cadastro de Venda'}} />

                <Stack.Screen name="EditarVenda" component={EditarVenda} options={{ title: 'Editar Venda'}} />

                <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#fff", //Cor de ícones ativos
                tabBarInactiveTintColor: "#fff", //Cor de ícones inativos
                tabBarActiveBackgroundColor: '#4169E1',
                tabBarShowLabel: true,
                tabBarStyle: { backgroundColor: '#070A52' },
                headerShown: true,
                headerTintColor: '#FFF',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#070A52' }
            }}
        >
            
            <Tab.Screen name="Conta" component={Conta}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={32} />
                    ),
                    tabBarLabel: () => null
                }}
            />
            <Tab.Screen name="Vendas" component={Vendas}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="format-list-text" color={color} size={32} />
                    ),
                    tabBarLabel: () => null
                }}
            />
            <Tab.Screen name="Sobre" component={Sobre}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="information-outline" color={color} size={32} />
                    ),
                    tabBarLabel: () => null
                }}
            />
        </Tab.Navigator>
    );
}