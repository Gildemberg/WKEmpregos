import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#6A5ACD",
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
        backgroundColor: '#FFF',
        padding: 20,
        marginBottom: 20,
        width: '100%'
    },
    logo: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
    },
    button: {
        backgroundColor: '#483D8B',
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
        width: 300, 
        height: 200,
        marginBottom: 20
    }
});

export default styles