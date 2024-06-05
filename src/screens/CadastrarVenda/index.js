import { firebase } from '../../services/firebaseConfig'
import { getDatabase, push, ref, set } from "firebase/database";
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { getAuth } from "firebase/auth";
import React, { useState } from 'react'
import styles from './style'
const db = getDatabase();
const auth = getAuth();

export default function CreateTask({ navigation }) {
    const [dataVenda, setDataVenda] = useState("")
    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("")
    const [ano, setAno] = useState("")
    const [valor, setValor] = useState("")
    const [errorCadastrarVenda, setErrorCadastrarVenda] = useState(null)

    const validar = () => {
        if (dataVenda == "") {
            setErrorCadastrarVenda("Informe a data da venda")
        } else if (marca == "") {
            setErrorCadastrarVenda("Informe a marca do veiculo")
        } else if (modelo == "") {
            setErrorCadastrarVenda("Informe o modelo do veiculo")
        } else if (ano == "") {
            setErrorCadastrarVenda("Informe o ano do veiculo")
        } else if (valor == "") {
            setErrorCadastrarVenda("Informe o valor da venda")
        } else {
            setErrorCadastrarVenda(null)
            cadastrarVenda()
        }
    }

    const cadastrarVenda = () => {
        const taskListRef = ref(db, 'vendas/' + auth.currentUser.uid);
        const newTaskRef = push(taskListRef);
        set(newTaskRef, {
            dataVenda: dataVenda,
            marca: marca,
            modelo: modelo,
            ano: ano,
            valor: valor
        });
        navigation.navigate('Tabs')
    }

    return (
        <View style={styles.container}>
            {errorCadastrarVenda != null && (
                <Text style={styles.alert}>{errorCadastrarVenda}</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder='Data da Venda'
                value={dataVenda}
                onChangeText={setDataVenda}
            />

            <TextInput
                style={styles.input}
                placeholder='Marca'
                value={marca}
                onChangeText={setMarca}
            />

            <TextInput
                style={styles.input}
                placeholder='Modelo'
                value={modelo}
                onChangeText={setModelo}
            />

            <TextInput
                style={styles.input}
                placeholder='Ano do Veículo'
                value={ano}
                onChangeText={setAno}
            />

            <TextInput
                style={styles.input}
                placeholder='Valor da Venda'
                value={valor}
                onChangeText={setValor}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={validar}
            >
                <Text style={styles.textButton}>Cradastrar Venda</Text>
            </TouchableOpacity>
        </View>
    )
}