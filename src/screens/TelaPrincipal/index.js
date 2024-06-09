import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import styles from './style'
import React, { useEffect, useState } from 'react'
import { firebase } from '../../services/firebaseConfig'
import { getDatabase, onValue, query, ref, orderByChild } from "firebase/database";
import { getAuth } from "firebase/auth";
const db = getDatabase();
const auth = getAuth();

export default function TelaPrincipal({ navigation }) {
    const [vagas, setVagas] = useState([]);

    useEffect(() => {
        const listaVendas = query(ref(db, 'vagas/' + auth.currentUser.uid), orderByChild('status'));
        onValue(listaVendas, (snapshot) => {
            const lista = []
            snapshot.forEach((data) => {
                lista.push({ ...data.val(), id: data.key });
            });
            setVagas(lista)
        });
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={vagas}
                renderItem={({ item }) =>
                    <TouchableOpacity style={styles.vaga} onPress={() => navigation.navigate('TelaInformacoes', { id: item.id })} >
                        <View style={styles.box}>
                            <View style={styles.box2}>
                            <Text style={styles.empresa}>{item.empresa}</Text>
                            <Text style={styles.funcao}>Função: {item.funcao}</Text>
                            <Text style={styles.salario}>Salário: R$ {item.salario}</Text>
                            </View>
                            <View style={[styles.barraStatus, item.status==='Indisponível' && styles.barraStatusDisp]}></View>
                        </View>
                    </TouchableOpacity>
                }
            />

            <TouchableOpacity style={styles.buttonCreate} onPress={() => navigation.navigate('TelaCadastrarVaga')}>
                <Text style={styles.textButtonCreate}>Nova Vaga</Text>
            </TouchableOpacity>
        </View>
    )
}