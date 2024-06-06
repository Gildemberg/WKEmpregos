import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import { firebase } from '../../services/firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Logo from '../../../assets/logo.jpg';


export default function Login({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState(null)

    const validate = () => {
        if (email == "") {
            setErrorLogin("Informe seu e-mail")
        } else if (password == "") {
            setErrorLogin("Informe uma senha")
        } else {
            setErrorLogin(null)
            login()
        }
    }

    const auth = getAuth();
    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setEmail("")
                setPassword("")
                setErrorLogin(null)
                navigation.navigate('Tabs')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorLogin(errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://images.vexels.com/media/users/3/147726/isolated/preview/3c35c23c922833a71a94e7d5faf28b88-logotipo-do-servico-de-venda-de-carros.png'}} style={styles.logo} />
            {errorLogin != null && (
                <Text style={styles.alert}>{errorLogin}</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder='E-mail'
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder='Senha'
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button}
                onPress={validate}
            >
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonCreate}
                onPress={() => navigation.navigate('CriarUsuario')}
            >
                <Text style={styles.buttonCreateText}>Criar Usuário</Text>
            </TouchableOpacity>
        </View>
    )
}