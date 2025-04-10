import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: '#666',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 120,
    fontSize: 12,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    fontSize: 12,
  },
  table: {
    display: 'table',
    width: '100%',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    borderBottomStyle: 'solid',
    paddingVertical: 5,
  },
  tableCell: {
    fontSize: 12,
    padding: 5,
  }
});

const AppointmentPDF = ({ appointments }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Appointments Report</Text>
        <Text style={styles.value}>Generated on: {new Date().toLocaleDateString()}</Text>
      </View>

      {appointments.map((appointment) => (
        <View key={appointment.id} style={styles.section}>
          <View style={[styles.tableRow, { backgroundColor: '#f3f4f6' }]}>
            <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>
              {appointment.patientName} - {appointment.patientId}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{appointment.status}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Doctor:</Text>
            <Text style={styles.value}>{appointment.doctorName}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Department:</Text>
            <Text style={styles.value}>{appointment.department}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Date & Time:</Text>
            <Text style={styles.value}>
              {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{appointment.type}</Text>
          </View>

          {appointment.notes && (
            <View style={styles.row}>
              <Text style={styles.label}>Notes:</Text>
              <Text style={styles.value}>{appointment.notes}</Text>
            </View>
          )}

          {appointment.symptoms && (
            <View style={styles.row}>
              <Text style={styles.label}>Symptoms:</Text>
              <Text style={styles.value}>{appointment.symptoms.join(', ')}</Text>
            </View>
          )}

          <View style={styles.row}>
            <Text style={styles.label}>Contact:</Text>
            <Text style={styles.value}>
              {appointment.contactNumber} | {appointment.email}
            </Text>
          </View>

          {appointment.cancellationReason && (
            <View style={styles.row}>
              <Text style={styles.label}>Cancelled:</Text>
              <Text style={styles.value}>{appointment.cancellationReason}</Text>
            </View>
          )}
        </View>
      ))}
    </Page>
  </Document>
);

export default AppointmentPDF; 