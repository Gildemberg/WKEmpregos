import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff'
    },

    data: {
        fontSize: 15,
        textAlign: 'right'
    },

    empresa: {
        fontSize: 25,
        marginBottom: 10
    },
    
    funcao: {
        fontSize: 25,
        marginBottom: 10
    },
    
    descricao: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'justify'
    },
    
    tipo: {
        fontSize: 25,
        marginBottom: 10
    },
    
    salario: {
        fontSize: 25,
        fontWeight: 'bold',
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
    },
    
    botoes: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: 20
    },
});

export default styles