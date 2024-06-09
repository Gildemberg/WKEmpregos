import { firebase } from '../../services/firebaseConfig'
import { getDatabase, onValue, ref, set, remove } from "firebase/database";
import { getStorage, ref as refS, deleteObject } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
const db = getDatabase();
const auth = getAuth();

export default function InfoVeiculo({ navigation, route }) {
    const [data, setData] = useState("")
    const [empresa, setEmpresa] = useState("")
    const [funcao, setFuncao] = useState("")
    const [salario, setSalario] = useState("")
    const [tipo, setTipo] = useState("")
    const [desc, setDesc] = useState("")
    const [status, setStatus] = useState("")

    useEffect(() => {
        recuperarDados();
    }, [])

    const recuperarDados = () => {
        onValue(ref(db, 'vagas/' + auth.currentUser.uid + '/' + route.params.id), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataMili = data.data || "";
                if(dataMili !== ""){
                    const data = new Date(dataMili);
                    // Formate a data no formato dd/mm/aaaa
                    const dia = String(data.getDate()).padStart(2, '0');
                    const mes = String(data.getMonth() + 1).padStart(2, '0');
                    const ano = data.getFullYear();
                    const dataFormatada = `${dia}/${mes}/${ano}`;
                    setData(dataFormatada)
                }else{
                    setData("")
                }
                setEmpresa(data.empresa || "")
                setFuncao(data.funcao || "")
                setSalario(data.salario || "")
                setTipo(data.tipo || "")
                setDesc(data.desc || "")
                setStatus(data.status || "")
            }
        });
    }

    const deletarVaga = () => {
        return Alert.alert(
            "Excluir vaga",
            "Você tem certeza que deseja remover essa vaga?",
            [
                {
                    text: "Cancelar",
                },
                {
                    text: "Confirmar",
                    onPress: () => {
                        remove(ref(db, 'vagas/' + auth.currentUser.uid + '/' + route.params.id))
                            .then(() => {
                                console.log('Vaga deletada com sucesso');
                                navigation.navigate('Tabs');
                            })
                            .catch((error) => {
                                console.error('Erro ao deletar vaga:', error);
                            });
                    }
                }
            ]
        );
    };

    const vagaPreenchida = () => {
        const data = new Date().getTime();
        const taskListRef = ref(db, 'vagas/' + auth.currentUser.uid + '/' + route.params.id);
        set(taskListRef, {
            data: data,
            empresa: empresa,
            funcao: funcao,
            salario: salario,
            tipo: tipo,
            desc: desc,
            status: 'Indisponível'
        })
            .then(() => {
                console.log('Vaga preenchida com sucesso!');
                navigation.navigate('Tabs');
            })
            .catch((error) => {
                console.error('Erro ao preencher vaga:', error);
            });
    }


    return (
        <View style={styles.container}>
            <View style={styles.botoes}>
                <TouchableOpacity onPress={() => navigation.navigate('TelaEditarVaga', { id: route.params.id })}>
                    <Text style={styles.alterar}><MaterialCommunityIcons name="pencil-circle" size={30} /></Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deletarVaga()}>
                    <Text style={styles.deletar}><MaterialCommunityIcons name="delete-circle" size={30} /></Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.data}>{data} </Text>
            <Text>Empresa:</Text>
            <Text style={styles.empresa}>{empresa}</Text>
            <Text>Função:</Text>
            <Text style={styles.funcao}>{funcao}</Text>
            <Text>Descrição da Vaga:</Text>
            <Text style={styles.descricao}>{desc}</Text>
            <Text>Tipo de Contrato:</Text>
            <Text style={styles.tipo}>{tipo}</Text>
            <Text>Salário:</Text>
            <Text style={styles.salario}>R$ {salario}</Text>


            <TouchableOpacity onPress={() => vagaPreenchida(route.params.id)} style={[styles.btnVendido, status === 'Indisponível' && styles.btnOpaco]} disabled={status === 'Indisponível'}>
                <Text style={styles.txtBtnVendido}>Vaga Preenchida</Text>
            </TouchableOpacity>

        </View>
    )
}