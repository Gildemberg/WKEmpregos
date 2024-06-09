import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#483D8B'
    },

    vaga: {
        backgroundColor: "#ddd",
        marginBottom: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },

    box : {
        width: '100%',
    },

    box2 : {
        width: '100%',
        padding: 10,
    },

    empresa: {
        fontSize: 20,
        textAlign: 'center'
    },

    funcao: {
        fontSize: 18,
    },
    
    salario: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    status: {
        color: 'green',
        textAlign: 'right'
    },

    barraStatus: {
        width: '100%',
        backgroundColor: 'green',
        height: 10,
        borderBottomEndRadius:10,
        borderBottomStartRadius: 10
    },
    
    barraStatusDisp: {
        backgroundColor: 'red',
    },

    buttonCreate: {
        backgroundColor: '#2E8B57',
        width: 300,
        height: 30,
        borderRadius: 50,
        position: 'absolute',
        bottom: 20,
        right: 58,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textButtonCreate: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff'
    }
});

export default styles