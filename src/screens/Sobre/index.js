import { View, Text } from 'react-native'
import React from 'react'
import styles from './style'

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Aplicativo desenvolvido durante as aulas da disciplina de Computação para Dispositivos Móveis</Text>
      <Text style={styles.info}>Curso:  Curso de Sistemas de Informação</Text>
      <Text style={styles.info}>Perídoo: 5º período</Text>
      <Text style={styles.info}>Semestre:  2024.1</Text>
    </View>
  )
}