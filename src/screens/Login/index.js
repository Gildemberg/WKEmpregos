import React, { useEffect, useState } from 'react'
import { firebase } from '../../services/firebaseConfig'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import styles from './style'

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

    const verificarLogin = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                navigation.navigate('Tabs');
            } else {
            }
        });
    }

    useEffect(() => {
        verificarLogin();
    }, [])

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../../assets/logo_pra_fazer.png')} />

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
                onPress={() => navigation.navigate('CreateUser')}
            >
                <Text style={styles.buttonCreateText}>Criar Usuário</Text>
            </TouchableOpacity>
        </View>
    )
}