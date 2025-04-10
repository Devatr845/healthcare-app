import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  section: {
    marginBottom: 15
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    color: '#3B82F6'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  label: {
    width: 120,
    fontWeight: 'bold'
  },
  value: {
    flex: 1
  }
});

const PatientPDF = ({ patient }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Patient Report</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Personal Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Patient ID:</Text>
          <Text style={styles.value}>{patient.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{patient.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{patient.age}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{patient.gender}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Contact Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{patient.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{patient.email}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Medical Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Condition:</Text>
          <Text style={styles.value}>{patient.condition}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Doctor:</Text>
          <Text style={styles.value}>{patient.doctor}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Last Visit:</Text>
          <Text style={styles.value}>{new Date(patient.lastVisit).toLocaleDateString()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{patient.status}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PatientPDF; 