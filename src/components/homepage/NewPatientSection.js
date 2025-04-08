import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import NewPatientWorkflow from '../NewPatientWorkflow';

const NewPatientSection = ({ onPatientAdded, onAdmitPatient }) => {
    const [showNewPatientForm, setShowNewPatientForm] = useState(false);

    return (
        <div className="new-patient-section">
            <button
                onClick={() => setShowNewPatientForm(!showNewPatientForm)}
                className="new-patient-button"
            >
                <PlusCircle className="new-patient-icon" />
                {showNewPatientForm ? 'Cancel' : 'Register New Patient'}
            </button>
            {showNewPatientForm && (
                <NewPatientWorkflow onPatientAdded={onPatientAdded} onAdmitPatient={onAdmitPatient} />
            )}
        </div>
    );
};

export default NewPatientSection;