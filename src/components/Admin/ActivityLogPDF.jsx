import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#111827'
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#6B7280'
  },
  activityItem: {
    marginBottom: 20,
    padding: 15,
    borderBottom: '1 solid #E5E7EB'
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    color: '#111827',
    fontWeight: 'bold'
  },
  info: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4B5563'
  },
  details: {
    marginTop: 10,
    paddingLeft: 15
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 5
  },
  label: {
    width: 100,
    fontSize: 12,
    color: '#6B7280'
  },
  value: {
    flex: 1,
    fontSize: 12,
    color: '#111827'
  },
  status: {
    fontSize: 12,
    marginTop: 5,
    color: '#3B82F6'
  }
});

const ActivityLogPDF = ({ activities }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Activity Log Report</Text>
      <Text style={styles.subHeader}>
        Generated on {new Date().toLocaleDateString()}
      </Text>

      {activities.map((activity) => (
        <View key={activity.id} style={styles.activityItem}>
          <Text style={styles.title}>{activity.title}</Text>
          <Text style={styles.info}>
            Doctor: {activity.doctor} | Date: {new Date(activity.date).toLocaleDateString()}
          </Text>
          <Text style={styles.status}>Status: {activity.status}</Text>

          {activity.type === 'appointment' && (
            <View style={styles.details}>
              <Text style={styles.info}>Vitals:</Text>
              {Object.entries(activity.details.vitals).map(([key, value]) => (
                <View key={key} style={styles.detailRow}>
                  <Text style={styles.label}>{key}:</Text>
                  <Text style={styles.value}>{value}</Text>
                </View>
              ))}
              <Text style={styles.info}>Notes: {activity.details.notes}</Text>
            </View>
          )}

          {activity.type === 'test' && (
            <View style={styles.details}>
              <Text style={styles.info}>Test Type: {activity.details.testType}</Text>
              {Object.entries(activity.details.results).map(([key, value]) => (
                <View key={key} style={styles.detailRow}>
                  <Text style={styles.label}>{key}:</Text>
                  <Text style={styles.value}>{value}</Text>
                </View>
              ))}
              <Text style={styles.info}>
                Interpretation: {activity.details.interpretation}
              </Text>
            </View>
          )}

          {activity.type === 'medication' && (
            <View style={styles.details}>
              {activity.details.changes.map((change, index) => (
                <View key={index}>
                  <Text style={styles.info}>Medication: {change.medication}</Text>
                  <Text style={styles.info}>
                    Dosage Change: {change.oldDosage} → {change.newDosage}
                  </Text>
                  <Text style={styles.info}>Reason: {change.reason}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </Page>
  </Document>
);

export default ActivityLogPDF; 