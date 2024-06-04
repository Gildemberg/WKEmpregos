import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { firebase } from '../../services/firebaseConfig'
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
const db = getDatabase();
const auth = getAuth();
import styles from './style'

export default function Account({ navigation }) {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")

    const recuperarDados = () => {
        onValue(ref(db, 'users/' + auth.currentUser.uid), (snapshot) => {
            setNome(snapshot.val().nome)
            setEmail(snapshot.val().email)
        });
    }

    useEffect(() => {
        recuperarDados();
    }, [])

    const logoff = () => {
        signOut(auth).then(() => {
            navigation.navigate('Login')
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dados do Usuário</Text>
            <Text style={styles.info}>{nome}</Text>
            <Text style={styles.info}>{email}</Text>

            <TouchableOpacity style={styles.button}
                onPress={logoff}
            >
                <Text style={styles.textButton}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}