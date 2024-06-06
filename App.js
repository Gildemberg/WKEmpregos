import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Login from './src/screens/Login'
import CriarUsuario from './src/screens/CriarUsuario'
import CadastrarVeiculo from './src/screens/CadastrarVeiculo'
import EditarVeiculo from './src/screens/EditarVeiculo'
import Sobre from './src/screens/Sobre';
import Conta from './src/screens/Conta';
import Veiculos from "./src/screens/Veiculos";
import InfoVeiculo from "./src/screens/InfoVeiculo";

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

                <Stack.Screen name="CadastrarVeiculo" component={CadastrarVeiculo} options={{ title: 'Cadastro de Veículos'}} />

                <Stack.Screen name="EditarVeiculo" component={EditarVeiculo} options={{ title: 'Editar Veículo'}} />

                <Stack.Screen name="InfoVeiculo" component={InfoVeiculo} options={{ title: 'Veículo'}} />

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
            <Tab.Screen name="Veículos" component={Veiculos}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="car-back" color={color} size={32} />
                    ),
                    tabBarLabel: () => null
                }}
            />
            
            <Tab.Screen name="Conta" component={Conta}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={32} />
                    ),
                    tabBarLabel: () => null
                }}
            />
            
            {/* <Tab.Screen name="Sobre" component={Sobre}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="information-outline" color={color} size={32} />
                    ),
                    tabBarLabel: () => null
                }}
            /> */}
        </Tab.Navigator>
    );
}