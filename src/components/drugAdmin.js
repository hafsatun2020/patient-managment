import React, { useState, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { format } from 'date-fns';

// Mock API functions (Replace with your actual API calls)
const mockAdministerDrug = async (patientId, drugData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Administering drug to patient ${patientId}:`, drugData);
            // Simulate saving to the backend
            resolve({ success: true, message: 'Drug administration recorded.' });
        }, 500);
    });
};

const mockUpdatePatientStatus = async (patientId, status) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Updating patient ${patientId} status to: ${status}`);
            // Simulate updating patient status
            resolve({ success: true, message: `Patient status updated to ${status}.` });
        }, 500);
    });
};

const mockGetDrugAdministrationData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate fetching data from the backend
            const mockData = {
                '1': [
                    { drugName: 'Drug A', administeredAt: new Date(Date.now() - 3600000), status: 'Given', administeredBy: 'Dr. Smith' }, // 1 hour ago
                    { drugName: 'Drug B', administeredAt: new Date(Date.now() - 7200000), status: 'Given', administeredBy: 'Nurse Jane' }, // 2 hours ago
                    { drugName: 'Drug C', administeredAt: new Date(Date.now() + 3600000), status: 'Pending', administeredBy: 'Dr. Smith' }, // In 1 hour
                ],
                '2': [
                    { drugName: 'Drug X', administeredAt: new Date(), status: 'Given', administeredBy: 'Nurse John' },
                    { drugName: 'Drug Y', administeredAt: new Date(Date.now() + 86400000), status: 'Pending', administeredBy: 'Dr. Jane' }, // In 24 hours
                ],
            };
            resolve(mockData);
        }, 500);
    });
};

// ===============================
// DrugAdministration Component
// ===============================
const DrugAdministration = ({ patientId, userRole }) => { // Added userRole as a prop
    const [drugName, setDrugName] = useState('');
    const [administeredAt, setAdministeredAt] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAdminister = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            if (!drugName || !administeredAt) {
                setError('Drug Name and Administration Date/Time are required.');
                setLoading(false);
                return;
            }
            const administeredBy = userRole; // Set administeredBy
            const drugData = {
                drugName,
                administeredAt,
                status: 'Given',
                administeredBy,
            };
            await mockAdministerDrug(patientId, drugData);
            setSuccess('Drug administration recorded successfully.');
            // Reset form
            setDrugName('');
            setAdministeredAt(new Date());
        } catch (err) {
            setError('Failed to record drug administration.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Administer Drug (Patient ID: {patientId})</h2>
            <FormControl fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel id="drug-name-label">Drug Name</InputLabel>
                <Select
                    labelId="drug-name-label"
                    id="drug-name"
                    value={drugName}
                    label="Drug Name"
                    onChange={(e) => setDrugName(e.target.value)}
                >
                    <MenuItem value="">Select a Drug</MenuItem>
                    <MenuItem value="Drug A">Drug A</MenuItem>
                    <MenuItem value="Drug B">Drug B</MenuItem>
                    <MenuItem value="Drug C">Drug C</MenuItem>
                    {/* Add more drug options as needed */}
                </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    label="Date and Time of Administration"
                    value={administeredAt}
                    onChange={setAdministeredAt}
                    renderInput={(props) => <TextField {...props} fullWidth style={{ marginBottom: '16px' }} />}
                />
            </LocalizationProvider>

            <Button onClick={handleAdminister} variant="contained" disabled={loading} style={{ marginBottom: '16px' }}>
                {loading ? 'Recording...' : 'Record Administration'}
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

// ===============================
// PatientStatus Component
// ===============================
const PatientStatus = ({ patientId, onStatusChange }) => {
    const [status, setStatus] = useState('admitted'); // Default status
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleStatusUpdate = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await mockUpdatePatientStatus(patientId, status); // Use the imported function
            if(result.success){
              onStatusChange(status); // Notify parent component
            }
            else{
              setError(result.message)
            }

        } catch (err) {
            setError(err.message || 'Failed to update patient status.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Change Patient Status (Patient ID: {patientId})</h2>
            <FormControl fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                    labelId="status-label"
                    id="status"
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="admitted">Admitted</MenuItem>
                    <MenuItem value="discharged">Discharged</MenuItem>
                    <MenuItem value="deceased">Deceased</MenuItem>
                    <MenuItem value="absconded">Absconded</MenuItem>
                    <MenuItem value="cured">Cured</MenuItem>
                    <MenuItem value="in remission">In Remission</MenuItem>
                    {/* Add more status options as needed */}
                </Select>
            </FormControl>
            <Button onClick={handleStatusUpdate} variant="contained" disabled={loading} style={{ marginBottom: '16px' }}>
                {loading ? 'Updating...' : 'Update Status'}
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

// ===============================
// AdminDrugStatus Component
// ===============================
const AdminDrugStatus = () => {
    const [drugData, setDrugData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => { // Added useEffect
        const fetchData = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await mockGetDrugAdministrationData(); // Use the imported function
                setDrugData(data);
            } catch (err) {
                setError('Failed to fetch drug administration data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading drug administration data...</div>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!drugData) {
        return <div>No drug administration data available.</div>;
    }

    return (
        <div>
            <h2>Drug Administration Status</h2>
            {Object.entries(drugData).map(([patientId, drugs]) => (
                <div key={patientId} style={{ marginBottom: '16px' }}>
                    <h3>Patient ID: {patientId}</h3>
                    {drugs.map((drug, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>
                            <p>
                                <strong>Drug:</strong> {drug.drugName}, <strong>Administered At:</strong>{' '}
                                {format(drug.administeredAt, 'Pp')}, <strong>Status:</strong> {drug.status}, <strong>Administered By:</strong> {drug.administeredBy || 'N/A'}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export { DrugAdministration, PatientStatus, AdminDrugStatus };
