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
                    headerStyle: { backgroundColor: '#F60' }
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
                tabBarActiveTintColor: "#FFF", //Cor de ícones ativos
                tabBarInactiveTintColor: "#F60", //Cor de ícones inativos
                tabBarActiveBackgroundColor: '#F60',
                tabBarShowLabel: true,
                tabBarStyle: { backgroundColor: '#070A52' },
                headerShown: true,
                headerTintColor: '#FFF',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#F60' }
            }}
        >
            <Tab.Screen name="Vendas" component={Vendas}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="check-circle-outline" color={color} size={32} />
                    ),
                }}
            />
            <Tab.Screen name="Conta" component={Conta}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={32} />
                    ),
                }}
            />
            <Tab.Screen name="Sobre" component={Sobre}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="information-outline" color={color} size={32} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}