import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// Mock API functions (Replace with your actual API calls)
const mockAdmitPatient = async (patientId, admissionData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Admitting patient ${patientId} with data:`, admissionData);
            // Simulate updating patient data and setting status to 'admitted'
            resolve({ success: true, message: `Patient ${patientId} admitted.` });
        }, 500);
    });
};

// ===============================
// PatientAdmission Component
// ===============================
const PatientAdmission = ({ patientId, onPatientAdmitted }) => {
    const [admissionData, setAdmissionData] = useState({
        weight: '',
        height: '',
        address: '',
        dateOfAdmission: null, // Initialize as null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setAdmissionData({ ...admissionData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setAdmissionData({ ...admissionData, dateOfAdmission: date });
    };

    const handleAdmit = async () => {
        setLoading(true);
        setError('');
        try {
            if (!admissionData.weight || !admissionData.height || !admissionData.dateOfAdmission) {
                setError("Weight, Height, and Date of Admission are required.");
                setLoading(false);
                return;
            }
            const result = await mockAdmitPatient(patientId, admissionData);
            if (result.success) {
                onPatientAdmitted(patientId);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError("Failed to admit patient.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Admit Patient (ID: {patientId})</h2>
            <TextField
                label="Weight (kg)"
                name="weight"
                value={admissionData.weight}
                onChange={handleInputChange}
                variant="outlined"
                type="number"
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="Height (cm)"
                name="height"
                value={admissionData.height}
                onChange={handleInputChange}
                variant="outlined"
                type="number"
                style={{ marginBottom: '10px' }}
            />
            <TextField
                label="Address"
                name="address"
                value={admissionData.address}
                onChange={handleInputChange}
                variant="outlined"
                style={{ marginBottom: '10px' }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Date of Admission"
                    value={admissionData.dateOfAdmission}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            style={{ marginBottom: '10px' }}
                        />
                    )}
                />
            </LocalizationProvider>
            <Button onClick={handleAdmit} variant="contained" disabled={loading}>
                {loading ? 'Admitting...' : 'Admit Patient'}
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export  {PatientAdmission};

