import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TelaLogin from './src/screens/TelaLogin'
import TelaCriarUsuario from './src/screens/TelaCriarUsuario'
import TelaCadastrarVaga from './src/screens/TelaCadastrarVaga'
import TelaEditarVaga from './src/screens/TelaEditarVaga'
import TelaSobre from './src/screens/TelaSobre';
import TelaConta from './src/screens/TelaConta';
import TelaPrincipal from "./src/screens/TelaPrincipal";
import TelaInformacoes from "./src/screens/TelaInformacoes";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="TelaLogin"
                screenOptions={{
                    headerTintColor: '#FFF',
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#6A5ACD' }
                }}
            >
                <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ headerShown: false }} />

                <Stack.Screen name="TelaCriarUsuario" component={TelaCriarUsuario} options={{ title: 'Cadastro de Usuário'}} />

                <Stack.Screen name="TelaCadastrarVaga" component={TelaCadastrarVaga} options={{ title: 'Cadastro de Vaga'}} />

                <Stack.Screen name="TelaEditarVaga" component={TelaEditarVaga} options={{ title: 'Editar Veículo'}} />

                <Stack.Screen name="TelaInformacoes" component={TelaInformacoes} options={{ title: 'Informações da vaga'}} />

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
                tabBarActiveBackgroundColor: '#6A5ACD',
                tabBarShowLabel: true,
                tabBarStyle: { backgroundColor: '#836FFF' },
                headerShown: true,
                headerTintColor: '#FFF',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#6A5ACD' }
            }}
        >
            <Tab.Screen name="Vagas" component={TelaPrincipal}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="format-list-text" color={color} size={32} />
                    ),
                    tabBarLabel: () => null
                }}
            />
            
            <Tab.Screen name="Conta" component={TelaConta}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={32} />
                    ),
                    tabBarLabel: () => null
                }}
            />
            
            <Tab.Screen name="Sobre" component={TelaSobre}
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