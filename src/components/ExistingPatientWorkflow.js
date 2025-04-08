import React, { useState, useEffect, useCallback } from 'react';
import { format, isValid } from 'date-fns';
import './EPatient.css'; // Import CSS
import mockPatientData from './mockPatientData';
import {TreatmentPlan} from './RenderTreatmentPlan'; // Import TreatmentPlan
import RenderPatientDetails from './RenderPatientDetails';

// Mock API functions (Replace with your actual API calls)
const mockUpdatePatientStatus = async (patientId, status) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const patient = mockPatientData[patientId];
            if (patient) {
                patient.status = status;
                resolve();
            } else {
                reject(new Error('Patient not found'));
            }
        }, 300);
    });
};



const ExistingPatientWorkflow = ({ patient, onPatientUpdate, userRole }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showTreatmentHistory, setShowTreatmentHistory] = useState(false);
    const treatmentHistory = mockPatientData[patient.id]?.treatmentPlan ? [mockPatientData[patient.id].treatmentPlan] : [];
    const [showFullPatientDetails, setShowFullPatientDetails] = useState(false); // New state for toggling full details
    const [drugsGiven, setDrugsGiven] = useState([]);

    const handleDrugStatusChange = useCallback((index, status) => {
        setDrugsGiven(prevDrugsGiven => {
            const updated = [...prevDrugsGiven];
            updated[index] = { ...updated[index], status };
            return updated;
        });
    }, []);


    /**
     * Handles changing the patient's status.
     */
    const handleStatusChange = async (status) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await mockUpdatePatientStatus(patient.id, status);
            onPatientUpdate({ ...patient, status });
            setSuccess(`Patient status changed to ${status}`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };



    /**
     * Renders the Existing Patient Workflow component.
     */
    return (
        <div className="existing-patient-workflow">
            <h2 className="patient-details-title">Patient Details</h2>
            <RenderPatientDetails patient={patient} />
            <h3 className="treatment-title">Treatment Plan</h3>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <TreatmentPlan patientId={patient.id} drugsGiven={drugsGiven} onDrugGivenChange={handleDrugStatusChange}/>

            <div className="treatment-history">
                <button onClick={() => setShowTreatmentHistory(prev => !prev)} className="history-button">
                    {showTreatmentHistory ? 'Hide' : 'Show'} Treatment History
                </button>
                {showTreatmentHistory && (
                    <div className="history-list">
                        {treatmentHistory.map((t, index) => (
                            <div key={index} className="history-item">
                                <p><strong>Date:</strong> {isValid(new Date(t.treatmentDate)) ? format(new Date(t.treatmentDate), 'PP') : 'N/A'}</p>
                                <p><strong>Drugs:</strong> {t.drugs || 'N/A'}</p>
                                 {t.drugsGiven && t.drugsGiven.length > 0 && (
                                    <p>
                                        <strong>Drug Status:</strong>
                                        {t.drugsGiven.map((drug, drugIndex) => (
                                            <span key={drugIndex}>
                                                {drug.name} ({drug.status})
                                                {drugIndex < t.drugsGiven.length - 1 ? ', ' : ''}
                                            </span>
                                        ))}
                                    </p>
                                )}
                                {!t.drugsGiven && <p><strong>Drug Status:</strong> N/A</p>}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {userRole === 'admin' && (
                <div className="status-change">
                    <label className="status-label">Change Patient Status:</label>
                    <button onClick={() => handleStatusChange('under treatment')} className="status-button treatment-status-button">Under Treatment</button>
                    <button onClick={() => handleStatusChange('completed')} className="status-button completed-status-button">Completed</button>
                </div>
            )}
        </div>
    );
};

export default ExistingPatientWorkflow;
