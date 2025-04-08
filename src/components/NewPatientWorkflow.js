import React, { useState } from 'react';
import {TreatmentPlan} from './RenderTreatmentPlan'; // Import the components
import  {PatientSearch} from './PatientSearch'; // Import the components
import {PatientAdmission} from './PatientAdmission'; // Import the components


import mockPatientData from './mockPatientData'; // Import the mock patient data

/**
 * Maps through the mock patient data and returns an array of patient information.
 * @returns An array of patient objects.
 */
const getPatientList = () => {
    const patients = Object.values(mockPatientData);
    return patients;
};

const mockSaveNewPatient = async (patientData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!patientData.fullName || !patientData.hospitalNumber) {
                reject({ error: "Full Name and Hospital Number are required." });
                return;
            }

            // Simulate saving to a database
            const newPatientId = Math.max(0, ...Object.keys(mockPatientData).map(Number)) + 1;
            const newPatient = { ...patientData, id: newPatientId, status: 'admitted' };
            mockPatientData[newPatientId] = newPatient;

            // Simulate sending email
            console.log(`Sending email for new patient: ${patientData.fullName}`);

            resolve({ message: "Patient record saved!", patient: newPatient });
        }, 500);
    });
};


const NewPatientWorkflow = ({ onPatientAdded, onAdmitPatient }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [patientFound, setPatientFound] = useState(null);
    const [allPatients, setAllPatients] = useState(getPatientList()); // Use the function here
    const [admittedPatientId, setAdmittedPatientId] = useState(null); // State to hold admitted patient ID
    const [loading, setLoading] = useState(false);



    // Function to handle patient search
    const handlePatientSearch = (patient) => {
        setPatientFound(patient);
    };

    const handleCreateNewPatient = async (patientData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const savedPatientData = await mockSaveNewPatient(patientData);
            setSuccess(savedPatientData.message);
            onPatientAdded(savedPatientData.patient); // Pass new patient to parent
            setAllPatients(prevPatients => [...prevPatients, savedPatientData.patient]); // Update allPatients
            setAdmittedPatientId(savedPatientData.patient.id);
            setPatientFound(savedPatientData.patient);
        } catch (err) {
            setError(err.error || "Failed to save patient record.");
        } finally {
            setLoading(false);
        }
    };

    const handleAdmit = (patientId) => {
        onAdmitPatient(patientId);
        setSuccess(`Patient with ID ${patientId} admitted.`);
    };



    return (
        <div className="new-patient-workflow">
            <h2 className="form-title">New Patient Registration Workflow</h2>

            <PatientSearch patients={allPatients} onPatientSelect={handlePatientSearch} onAddNewPatient={handleCreateNewPatient} />

            {patientFound && (
                <>
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                        <p className="font-bold">Patient Found/Selected!</p>
                        <p>
                            {admittedPatientId
                                ? "Patient has been admitted."
                                : "Please review the patient details."}
                        </p>
                    </div>

                    <PatientAdmission
                        patientId={patientFound.id}
                        onPatientAdmitted={handleAdmit}

                    />

                    <TreatmentPlan patientId={patientFound.id} />
                </>
            )}

            {error && <div className="text-red-500 mt-4">{error}</div>}
            {success && <div className="text-green-500 mt-4">{success}</div>}
        </div>
    );
};




export default NewPatientWorkflow;
