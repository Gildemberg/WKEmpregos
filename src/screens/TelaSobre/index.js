import { View, Text } from 'react-native'
import React from 'react'
import styles from './style'

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.info3}>Aplicativo desenvolvido como Projeto Final da disciplina de Computação para Dispositivos Móveis</Text>
      <Text style={styles.info}>Curso:  Curso de Sistemas de Informação</Text>
      <Text style={styles.info}>Perídoo: 5º período</Text>
      <Text style={styles.info}>Semestre:  2024.1</Text>
      <Text style={styles.info2}>Desenvolvedores: </Text>
      <Text style={styles.info2}>Jean Cesar Lopis</Text>
      <Text style={styles.info2}>João Carlos Zweibrucker Gomes</Text>
    </View>
  )
}