import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff'
    },

    tarefa: {
        backgroundColor: "#ddd",
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },

    action: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20
    },

    data: {
        color: '#000'
    },

    descricao: {
        fontSize: 40,
    },
    
    valorVenda: {
        fontSize: 40,
        color: 'green',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    buttonCreate: {
        backgroundColor: '#070A52',
        width: 60,
        height: 60,
        borderRadius: 50,
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textButtonCreate: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff'
    },

    cancel: {
        color: '#F00'
    },

    imagem: {
        width: 400, 
        height: 300, 
        borderRadius: 5,
        marginBottom: 30,
        alignSelf: 'center'
    },

    alterar : {
        color: '#000'
    },

    deletar: {
        color: '#8B0000'
    },

    btnVendido: {
        backgroundColor: 'green',
        width: 300,
        alignSelf: 'center',
        padding: 20,
        borderRadius: 30,
        marginTop: 50
    },

    txtBtnVendido: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20
    },
    btnOpaco: {
        opacity: 0
    }
});

export default styles