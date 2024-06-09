import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './style'
import React, { useState } from 'react'

import { firebase } from '../../services/firebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database'
const db = getDatabase();

export default function TelaCriarUsuario({navigation}) {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorCreateUser, setErroCreateUser] = useState(null)

    function validarCampos() {
        if (nome == "") {
            setErroCreateUser("informe o seu nome")
        } else if (email == "") {
            setErroCreateUser("informe o seu email")
        } else if (password == "") {
            setErroCreateUser("informe a sua senha")
        } else {
            setErroCreateUser(null)
            criarUsuario();
        }
    }

    const criarUsuario = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(db, 'users/' + user.uid), {
                    nome: nome,
                    email: email
                  });
                navigation.navigate('Tabs');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErroCreateUser(errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            {errorCreateUser != null && (
                <Text style={styles.alert}>{errorCreateUser}</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder='Nome'
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder='E-mail'
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Senha'
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={validarCampos}
            >
                <Text style={styles.textButton}>Criar usuário</Text>
            </TouchableOpacity>
        </View>
    )
}