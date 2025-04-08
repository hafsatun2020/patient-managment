import React from 'react';
import { format, parseISO, isValid } from 'date-fns';
import { Badge } from '@mui/material'; // Import Badge from Material UI for better styling

const PatientList = ({ patients, onPatientSelect }) => {

    const sortedPatients = [...patients].sort(
        (a, b) =>
            (a.dateOfAdmission ? new Date(a.dateOfAdmission).getTime() : 0) -
            (b.dateOfAdmission ? new Date(b.dateOfAdmission).getTime() : 0)
    );

    const getPatientStatusBadge = (status) => {
        const statusMap = {
            admitted: { label: 'Admitted', color: 'error' }, // Use color prop
            discharged: { label: 'Discharged', color: 'success' },
            deceased: { label: 'Deceased', color: 'secondary' },
            absconded: { label: 'Absconded', color: 'warning' },
            cured: { label: 'Cured', color: 'primary' },
            'in remission': { label: 'In Remission', color: 'info' },
            unknown: { label: 'Unknown', color: 'default' },
        };

        const statusData = statusMap[status] || statusMap.unknown; // Default to unknown
        return (
            <Badge
                badgeContent={statusData.label}
                color={statusData.color}
                variant="filled" // Use filled variant
            />
        );
    };

    return (
        <div className="patient-list">
            {sortedPatients.map(patient => (
                <div
                    key={patient.id}
                    className="patient-list-item"
                    onClick={() => onPatientSelect(patient)}
                >
                    <div className="patient-info">
                        <span className="patient-name">{patient.fullName}</span>
                        {getPatientStatusBadge(patient.status)}
                    </div>
                    <p className="patient-details">Hospital Number: {patient.hospitalNumber}</p>
                    <p className="patient-details">
                        Date of Admission: {patient.dateOfAdmission && isValid(parseISO(patient.dateOfAdmission))
                            ? format(parseISO(patient.dateOfAdmission), "PPP")
                            : 'N/A'}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default PatientList;
