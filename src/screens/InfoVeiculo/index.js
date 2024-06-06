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
    const [dataVenda, setDataVenda] = useState("")
    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("")
    const [ano, setAno] = useState("")
    const [valor, setValor] = useState("")
    const [status, setStatus] = useState("")
    const [urlImage, setUrlImage] = useState("")

    useEffect(() => {
        recuperarDados();
    }, [])

    const recuperarDados = () => {
        onValue(ref(db, 'vendas/' + auth.currentUser.uid + '/' + route.params.id), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setDataVenda(data.dataVenda || "")
                setModelo(data.modelo || "")
                setMarca(data.marca || "")
                setAno(data.ano || "")
                setValor(data.valor || "")
                setStatus(data.status || "")
                setUrlImage(data.urlImage || "")
            }
        });
    }

    const deletarVenda = () => {
        return Alert.alert(
            "Excluir veículo",
            "Você tem certeza que deseja remover essa veículo?",
            [
                {
                    text: "Cancelar",
                },
                {
                    text: "Confirmar",
                    onPress: () => {
                        const storage = getStorage();
                        const url = refS(storage, urlImage);

                        deleteObject(url)
                            .then(() => {
                                console.log('Imagem do veículo deletado com sucesso');
                            }).catch((error) => {
                                console.error('Erro ao deletar imagem do veículo:', error);
                            });

                        remove(ref(db, 'vendas/' + auth.currentUser.uid + '/' + route.params.id))
                            .then(() => {
                                console.log('Veículo deletado com sucesso');
                                navigation.navigate('Tabs');
                            })
                            .catch((error) => {
                                console.error('Erro ao deletar veículo:', error);
                            });
                    }
                }
            ]
        );
    };

    const venderVeiculo = () => {
        const taskListRef = ref(db, 'vendas/' + auth.currentUser.uid + '/' + route.params.id);
        set(taskListRef, {
            dataVenda: dataVenda,
            marca: marca,
            modelo: modelo,
            ano: ano,
            valor: valor,
            urlImage: urlImage, // Salva a URL da imagem no Realtime Database
            status: 'Vendido'
        })
            .then(() => {
                console.log('Venda concluida com sucesso!');
                navigation.navigate('Tabs');
            })
            .catch((error) => {
                console.error('Erro ao cadastrar venda:', error);
            });
    }


    return (
        <View style={styles.container}>
            {urlImage ? <Image source={{ uri: urlImage }} style={styles.imagem} /> : null}

            <Text style={styles.data}>{dataVenda} </Text>
            <Text style={styles.descricao}>Marca: {marca}</Text>
            <Text style={styles.descricao}>Modelo: {modelo}</Text>
            <Text style={styles.descricao}>Ano: {ano}</Text>
            <Text style={styles.valorVenda}>R$ {valor}</Text>

            <View style={styles.action}>
                <TouchableOpacity onPress={() => navigation.navigate('EditarVeiculo', { id: route.params.id })}>
                    <Text style={styles.alterar}><MaterialCommunityIcons name="pencil-circle" size={45} /></Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deletarVenda()}>
                    <Text style={styles.deletar}><MaterialCommunityIcons name="delete-circle" size={45} /></Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => venderVeiculo(route.params.id)} style={[styles.btnVendido, status === 'Vendido' && styles.btnOpaco]} disabled={status === 'Vendido'}>
                <Text style={styles.txtBtnVendido}>Vendido</Text>
            </TouchableOpacity>

        </View>
    )
}