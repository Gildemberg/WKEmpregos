import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#070A52",
        padding: 30,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alert: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFF',
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        borderRadius: 10,
        backgroundColor: '#ddd',
        padding: 20,
        marginBottom: 20,
        width: '100%'
    },
    button: {
        backgroundColor: '#4169E1',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%'
    },
    textButton: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff'
    },
    imagemSelecionada: {
        width: 350, 
        height: 200,
        marginBottom: 20
    }
});

export default styles