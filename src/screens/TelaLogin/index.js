import { Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import React, { useState } from 'react';
import { firebase } from '../../services/firebaseConfig'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function TelaLogin({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorLogin, setErrorLogin] = useState(null)
    const auth = getAuth();

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
            <Image source={require('../../../assets/logo.jpg')} style={styles.logo} />
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
                onPress={() => navigation.navigate('TelaCriarUsuario')}
            >
                <Text style={styles.buttonCreateText}>Criar Usuário</Text>
            </TouchableOpacity>
        </View>
    )
}