import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F60",
        padding: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    logo: {
        marginBottom: 50,
    },
    alert: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
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
    button: {
        backgroundColor: '#070A52',
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
    buttonCreate: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 20,
        width: '100%'
    },
    buttonCreateText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff'
    }
})

export default styles