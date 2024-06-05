import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#ddd'
    },

    tarefa: {
        backgroundColor: "#4169E1",
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },

    action: {
        flexDirection: 'row'
    },

    data: {
        color: '#fff'
    },

    descricao: {
        fontSize: 18,
    },
    
    valorVenda: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
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
    }
});

export default styles