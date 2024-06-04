import { View, Text, TouchableOpacity, FlatList, Modal, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../services/firebaseConfig'
import { getDatabase, onValue, orderByChild, query, ref, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
const db = getDatabase();
const auth = getAuth();

export default function Vendas({ navigation }) {
    const [vendas, setVendas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const deletarVenda = (id) => {
        return Alert.alert(
            "Excluir venda",
            "Você tem certeza que deseja remover essa venda?",
            [
                {
                    text: "Cancelar",
                },
                {
                    text: "Confirmar",
                    // Função que remove tarefa do banco quando o usuário clica na opção "Confirmar" do popup
                    onPress: () => remove(ref(db, 'vendas/' + auth.currentUser.uid + '/' + id))
                }
            ]
        );
    };

    useEffect(() => {
        const listaVendas = query(ref(db, 'vendas/' + auth.currentUser.uid));
        onValue(listaVendas, (snapshot) => {
            const lista = []
            snapshot.forEach((data) => {
                lista.push({ ...data.val(), id: data.key });
            });
            setVendas(lista)
        });
    }, [])


    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={vendas}
                renderItem={({ item }) =>
                    <View style={styles.tarefa}>
                        <View>
                            <Text style={styles.data}>{item.dataVenda}</Text>
                            <Text style={styles.descricao}>{item.marca}</Text>
                            <Text style={styles.descricao}>{item.modelo}</Text>
                            <Text style={styles.descricao}>{item.ano}</Text>
                            <Text style={styles.descricao}>{item.valor}</Text>
                        </View>
                        <View style={styles.action}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditarVenda', { id: item.id })}
                            >
                                <Text style={styles.descricao}><MaterialCommunityIcons name="file-document-edit-outline" size={32} /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => deletarVenda(item.id)}
                            >
                                <Text style={styles.descricao}><MaterialCommunityIcons name="delete-outline" size={32} /></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />

            <TouchableOpacity
                style={styles.buttonCreate}
                onPress={() => navigation.navigate('CadastrarVenda')}
            >
                <Text style={styles.textButtonCreate}>+</Text>
            </TouchableOpacity>
        </View>
    )
}