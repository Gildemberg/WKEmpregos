import { firebase } from '../../services/firebaseConfig'
import { getDatabase, push, ref as dbRef, set } from "firebase/database";

import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { getAuth } from "firebase/auth";
import React, { useState } from 'react'
import styles from './style'
const db = getDatabase();
const auth = getAuth();

export default function CadastrarVeiculo({ navigation }) {
    const [empresa, setEmpresa] = useState("")
    const [funcao, setFuncao] = useState("")
    const [salario, setSalario] = useState("")
    const [tipo, setTipo] = useState("")
    const [desc, setDesc] = useState("")
    const [errorCadastrarVaga, setErrorCadastrarVaga] = useState(null)

    const validar = () => {
        if (empresa == "") {
            setErrorCadastrarVaga("Informe o nome da empresa")
        } else if (funcao == "") {
            setErrorCadastrarVaga("Informe a função")
        } else if (salario == "") {
            setErrorCadastrarVaga("Informe o salário")
        } else if (tipo == "") {
            setErrorCadastrarVaga("Informe o tipo do contrato")
        } else if (desc == "") {
            setErrorCadastrarVaga("Informe a descrição da vaga")
        } else {
            setErrorCadastrarVaga(null)
            cadastrarVaga()
        }
    }

    const cadastrarVaga = () => {
        const data = new Date().getMilliseconds();
        const vagaURL = dbRef(db, 'vagas/' + auth.currentUser.uid);
        const URL = push(vagaURL);
        set(URL, {
            data: data,
            empresa: empresa,
            funcao: funcao,
            salario: salario,
            tipo: tipo,
            desc: desc,
            status: 'Disponível'
        })
            .then(() => {
                navigation.navigate('Tabs');
            })
            .catch((error) => {
                console.error('Erro ao cadastrar vaga:', error);
                setErrorCadastrarVaga('Erro ao cadastrar essa vaga. Por favor, tente novamente.');
            });
    }

    return (
        <View style={styles.container}>
            {errorCadastrarVaga != null && (
                <Text style={styles.alert}>{errorCadastrarVaga}</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder='Empresa'
                value={empresa}
                onChangeText={setEmpresa}
            />

            <TextInput
                style={styles.input}
                placeholder='Função'
                value={funcao}
                onChangeText={setFuncao}
            />

            <TextInput
                style={styles.input}
                placeholder='Salário'
                value={salario}
                onChangeText={setSalario}
            />

            <TextInput
                style={styles.input}
                placeholder='CLT ou PJ'
                value={tipo}
                onChangeText={setTipo}
            />

            <TextInput
                style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
                placeholder='Descrição da Vaga'
                value={desc}
                onChangeText={setDesc}
            />

            <TouchableOpacity style={styles.button} onPress={validar}>
                <Text style={styles.textButton}>Cradastrar Vaga</Text>
            </TouchableOpacity>
        </View>
    )
}