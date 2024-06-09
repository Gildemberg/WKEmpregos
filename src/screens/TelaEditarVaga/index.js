import { firebase } from '../../services/firebaseConfig'
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
const db = getDatabase();
const auth = getAuth();

export default function EditarVaga({ navigation, route }) {
    const [empresa, setEmpresa] = useState("")
    const [funcao, setFuncao] = useState("")
    const [salario, setSalario] = useState("")
    const [tipo, setTipo] = useState("")
    const [desc, setDesc] = useState("")
    const [errorEditarVaga, setErrorEditarVaga] = useState(null)

    const validar = () => {
        if (empresa == "") {
            setErrorEditarVaga("Informe o nome da empresa")
        } else if (funcao == "") {
            setErrorEditarVaga("Informe a função")
        } else if (salario == "") {
            setErrorEditarVaga("Informe o salário")
        } else if (tipo == "") {
            setErrorEditarVaga("Informe o tipo do contrato")
        } else if (desc == "") {
            setErrorEditarVaga("Informe a descrição da vaga")
        } else {
            setErrorEditarVaga(null)
            editarVaga()
        }
    }

    const editarVaga = () => {
        const data = new Date().getTime();
        const taskListRef = ref(db, 'vagas/' + auth.currentUser.uid + '/' + route.params.id);
        set(taskListRef, {
            data: data,
            empresa: empresa,
            funcao: funcao,
            salario: salario,
            tipo: tipo,
            desc: desc
        })
            .then(() => {
                console.log('Vaga editada com sucesso!');
                navigation.navigate('Tabs');
            })
            .catch((error) => {
                console.error('Erro ao editar vaga:', error);
                setErrorEditarVaga('Erro ao editar vaga. Por favor, tente novamente.');
            });
    }

    const recuperarDados = () => {
        onValue(ref(db, 'vagas/' + auth.currentUser.uid + '/' + route.params.id), (snapshot) => {
            setEmpresa(snapshot.val().empresa)
            setFuncao(snapshot.val().funcao)
            setSalario(snapshot.val().salario)
            setTipo(snapshot.val().tipo)
            setDesc(snapshot.val().desc)
        });
    }

    useEffect(() => {
        recuperarDados();
    }, [])

    return (
        <View style={styles.container}>
            {errorEditarVaga != null && (
                <Text style={styles.alert}>{errorEditarVaga}</Text>
            )}
            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/wkempregos-81a16.appspot.com/o/logo3.png?alt=media&token=17310386-4730-4a54-ae97-392e060465f5'}} style={styles.logo} />

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
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
                placeholder='Descrição da Vaga'
                value={desc}
                onChangeText={setDesc}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={validar}
            >
                <Text style={styles.textButton}>Concluir</Text>
            </TouchableOpacity>
        </View>
    )
}