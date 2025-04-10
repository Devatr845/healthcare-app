import React from 'react';
import MedicalRecordCard from './MedicalRecordCard';
import PrescriptionHistoryCard from './PrescriptionHistoryCard';
import './MedicalRecordCard.css';
import './PrescriptionHistoryCard.css';

const MedicalRecordsView = ({ records, isHistoryView, onReprescribe }) => {
  return (
    <div className="medical-records-section">
      <div className={`medical-records-container ${isHistoryView ? 'history-view' : ''}`}>
        {records.map((record, index) => (
          isHistoryView ? (
            <PrescriptionHistoryCard
              key={index}
              prescription={record}
              onReprescribe={onReprescribe}
            />
          ) : (
            <MedicalRecordCard key={index} record={record} />
          )
        ))}
      </div>
    </div>
  );
};

export default MedicalRecordsView; 