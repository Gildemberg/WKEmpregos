import { firebase } from '../../services/firebaseConfig'
import { getDatabase, onValue, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref as refS, uploadBytes, getDownloadURL } from 'firebase/storage';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
const db = getDatabase();
const auth = getAuth();

export default function EditarVeiculo({ navigation, route }) {
    const [dataVenda, setDataVenda] = useState("")
    const [marca, setMarca] = useState("")
    const [modelo, setModelo] = useState("")
    const [ano, setAno] = useState("")
    const [valor, setValor] = useState("")
    const [urlImage, setUrlImage] = useState("")
    const [image, setImage] = useState(null);
    const [teste1, setTeste1] = useState(true);
    const [errorEditarVenda, setErrorEditarVenda] = useState(null)

    const validar = () => {
        if (dataVenda == "") {
            setErrorEditarVenda("Informe a data da venda")
        } else if (marca == "") {
            setErrorEditarVenda("Informe a marca do veiculo")
        } else if (modelo == "") {
            setErrorEditarVenda("Informe o modelo do veiculo")
        } else if (ano == "") {
            setErrorEditarVenda("Informe o ano do veiculo")
        } else if (valor == "") {
            setErrorEditarVenda("Informe o valor da venda")
        } else {
            setErrorEditarVenda(null)
            cadastrarVenda()
        }
    }

    const cadastrarVenda = () => {
        const taskListRef = ref(db, 'vendas/' + auth.currentUser.uid + '/' + route.params.id);
        set(taskListRef, {
            dataVenda: dataVenda,
            marca: marca,
            modelo: modelo,
            ano: ano,
            valor: valor,
            urlImage: urlImage // Salva a URL da imagem no Realtime Database
        })
            .then(() => {
                console.log('Venda cadastrada com sucesso!');
                navigation.navigate('Tabs');
            })
            .catch((error) => {
                console.error('Erro ao cadastrar venda:', error);
                setErrorEditarVenda('Erro ao cadastrar venda. Por favor, tente novamente.');
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
        const storageRef = refS(storage, filename);

        try {
            await uploadBytes(storageRef, blob);

            const url = await getDownloadURL(storageRef);
            setUrlImage(url);
            setTeste1(false);
        } catch (e) {
            console.error(e);
        }
    };

    const recuperarDados = () => {
        onValue(ref(db, 'vendas/' + auth.currentUser.uid + '/' + route.params.id), (snapshot) => {
            setDataVenda(snapshot.val().dataVenda)
            setModelo(snapshot.val().modelo)
            setMarca(snapshot.val().marca)
            setAno(snapshot.val().ano)
            setValor(snapshot.val().valor)
            setUrlImage(snapshot.val().urlImage)
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

            {teste1 && urlImage && <Image source={{ uri: urlImage }} style={styles.imagemSelecionada} />}
            {image && <Image source={{ uri: image }} style={styles.imagemSelecionada} />}

            <TouchableOpacity style={styles.button} onPress={selecionarImagem}>
                <Text style={styles.textButton}>Selecionar Imagem</Text>
            </TouchableOpacity>

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
                <Text style={styles.textButton}>Concluir</Text>
            </TouchableOpacity>
        </View>
    )
}