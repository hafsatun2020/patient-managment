import React, { useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import NewPatientForm from './NewPatientForm'; // Assuming this is in the same directory

// ===============================
// PatientSearch Component
// ===============================
const PatientSearch = ({ patients, onPatientSelect, onAddNewPatient }) => { // Added patients prop
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showNewPatientForm, setShowNewPatientForm] = useState(false);

    const handleSearch = () => {
        setLoading(true);
        // Perform search using the patients prop
        const results = patients.filter(patient =>
            patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.hospitalNumber.includes(searchTerm)
        );
        setSearchResults(results);
        setLoading(false);

    };

    const handlePatientSelect = (patient) => {
        onPatientSelect(patient);
    };

    const handleAddNewPatient = (newPatient) => {
        onAddNewPatient(newPatient);
        setShowNewPatientForm(false);
    };

    return (
        <div>
            <h2>Patient Search</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <TextField
                    label="Search by Name or Hospital Number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="outlined"
                />
                <Button onClick={handleSearch} variant="contained" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </Button>
            </div>

            {showNewPatientForm ? (
                <NewPatientForm onPatientAdded={handleAddNewPatient} />
            ) : (
                <Button onClick={() => setShowNewPatientForm(true)} variant="outlined" sx={{ marginBottom: '20px' }}>Add New Patient</Button>
            )}

            {searchResults.length > 0 && (
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Full Name</TableCell>
                                <TableCell>Hospital Number</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchResults.map((patient) => (
                                <TableRow key={patient.id}>
                                    <TableCell>{patient.fullName}</TableCell>
                                    <TableCell>{patient.hospitalNumber}</TableCell>
                                    <TableCell>{patient.age}</TableCell>
                                    <TableCell>{patient.address}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handlePatientSelect(patient)} variant="contained">Select</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
            {searchResults.length === 0 && !loading && searchTerm && (
                <p>No patients found matching your search.</p>
            )}
        </div>
    );
};



export  {PatientSearch};