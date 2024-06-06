import { firebase } from '../../services/firebaseConfig'
import { getDatabase, push, ref as dbRef, set } from "firebase/database";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { getAuth } from "firebase/auth";
import React, { useState } from 'react'
import styles from './style'
const db = getDatabase();
const auth = getAuth();

export default function CadastrarVeiculo({ navigation }) {
    const [dataVenda, setDataVenda] = useState("")
    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("")
    const [ano, setAno] = useState("")
    const [valor, setValor] = useState("")
    const [urlImage, setUrlImage] = useState("")
    const [image, setImage] = useState(null);
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
        const taskListRef = dbRef(db, 'vendas/' + auth.currentUser.uid);
        const newTaskRef = push(taskListRef);
        set(newTaskRef, {
            dataVenda: dataVenda,
            marca: marca,
            modelo: modelo,
            ano: ano,
            valor: valor,
            urlImage: urlImage, // Salva a URL da imagem no Realtime Database
            status: 'Disponível'
        })
            .then(() => {
                navigation.navigate('Tabs');
            })
            .catch((error) => {
                console.error('Erro ao cadastrar veículo:', error);
                setErrorCadastrarVenda('Erro ao cadastrar veículo. Por favor, tente novamente.');
            });
    }

    const selecionarImagem = async () => {
        // Solicita permissões para acessar a galeria de fotos
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Desculpe, precisamos da permissão para acessar a galeria de fotos!');
            return;
        }

        // Abre a galeria de fotos e permite ao usuário selecionar uma imagem
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri) => {
        const storage = getStorage();
        const response = await fetch(uri);
        const blob = await response.blob();
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const storageRef = ref(storage, filename);

        try {
            await uploadBytes(storageRef, blob);

            const url = await getDownloadURL(storageRef);
            setUrlImage(url);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            {errorCadastrarVenda != null && (
                <Text style={styles.alert}>{errorCadastrarVenda}</Text>
            )}

            {image && <Image source={{ uri: image }} style={styles.imagemSelecionada} />}

            <TouchableOpacity style={styles.button} onPress={selecionarImagem}>
                <Text style={styles.textButton}>Selecionar Imagem</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder='Data do Anúncio'
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


            <TouchableOpacity style={styles.button} onPress={validar}>
                <Text style={styles.textButton}>Cradastrar Venda</Text>
            </TouchableOpacity>
        </View>
    )
}