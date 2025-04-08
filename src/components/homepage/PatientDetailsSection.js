import React from 'react';
import ExistingPatientWorkflow from '../ExistingPatientWorkflow';

const PatientDetailsSection = ({ patient, onPatientUpdate }) => {
    return (
        <div className="patient-details-section">
            <h2 className="details-title">Patient Details</h2>
            <ExistingPatientWorkflow patient={patient} onPatientUpdate={onPatientUpdate} />
        </div>
    );
};

export default PatientDetailsSection;