import { firebase } from '../../services/firebaseConfig'
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
const db = getDatabase();
const auth = getAuth();

export default function CreateTask({ navigation, route }) {
    const [dataVenda, setDataVenda] = useState("")
    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("")
    const [ano, setAno] = useState("")
    const [valor, setValor] = useState("")
    const [errorEditarVenda, setErrorEditarVenda] = useState(null)

    const validar = () => {
        if (date == "") {
            setErrorEditarVenda("Informe a data da tarefa")
        } else if (description == "") {
            setErrorEditarVenda("Informe a descrição da tareja")
        } else {
            setErrorEditarVenda(null)
            editarVenda()
        }
    }

    const editarVenda = () => {
        const taskListRef = ref(db, 'vendas/' + auth.currentUser.uid + '/' + route.params.id);
        set(taskListRef, {
            dataVenda: dataVenda,
            marca: marca,
            modelo: modelo,
            ano: ano,
            valor: valor
        });
        navigation.navigate('Tabs')
    }

    const recuperarDados = () => {
        onValue(ref(db, 'vendas/' + auth.currentUser.uid + '/' + route.params.id), (snapshot) => {
            setDataVenda(snapshot.val().date)
            setModelo(snapshot.val().modelo)
            setMarca(snapshot.val().marca)
            setAno(snapshot.val().ano)
            setValor(snapshot.val().valor)
        });
    }

    useEffect(() => {
        recuperarDados();
    }, [])

    return (
        <View style={styles.container}>
            {errorEditarVenda != null && (
                <Text style={styles.alert}>{errorEditarVenda}</Text>
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
                <Text style={styles.textButton}>Editar venda</Text>
            </TouchableOpacity>
        </View>
    )
}