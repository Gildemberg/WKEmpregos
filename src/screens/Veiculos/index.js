import { View, Text, TouchableOpacity, FlatList, Modal, Pressable, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import { firebase } from '../../services/firebaseConfig'
import { getDatabase, onValue, query, ref, orderByChild } from "firebase/database";
import { getAuth } from "firebase/auth";
const db = getDatabase();
const auth = getAuth();

export default function Veiculos({ navigation }) {
    const [vendas, setVendas] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const listaVendas = query(ref(db, 'vendas/' + auth.currentUser.uid), orderByChild('status'));
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
                    <TouchableOpacity style={styles.tarefa} onPress={() => navigation.navigate('InfoVeiculo', { id: item.id })} >
                        <View>
                            {item.urlImage ? <Image source={{ uri: item.urlImage }} style={styles.imagem} /> : null}
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.data}>{item.dataVenda}</Text>
                            <Text style={styles.descricao}>{item.marca} - {item.modelo} - {item.ano}</Text>
                            <Text style={styles.valorVenda}>R$ {item.valor}</Text>
                            <Text style={[styles.status, item.status==='Vendido' && styles.disp]}>{item.status}</Text>
                            
                        </View>
                    </TouchableOpacity>
                }
            />

            <TouchableOpacity
                style={styles.buttonCreate}
                onPress={() => navigation.navigate('CadastrarVeiculo')}
            >
                <Text style={styles.textButtonCreate}>+</Text>
            </TouchableOpacity>
        </View>
    )
}