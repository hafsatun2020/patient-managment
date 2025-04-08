// AdminDashboard.js
import React, { useState } from 'react';
import { PatientSearch } from '../PatientSearch';
import { PatientAdmission } from '../PatientAdmission';
import { TreatmentPlan } from '../RenderTreatmentPlan';
import PatientOverview from './PatientOverview';
import PatientList from './PatientList';
import mockPatientData from '../mockPatientData';
import { AdminDrugStatus } from '../drugAdmin';

const AdminDashboard = ({ patients, setPatients }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleNewPatientAdded = (newPatient) => {
    setPatients(prev => [...prev, newPatient]);
  };

  const handleAdmitPatient = (patientId) => {
    const updated = patients.map(p =>
      p.id === patientId ? { ...p, status: 'admitted', dateOfAdmission: new Date() } : p
    );
    setPatients(updated);
  };

  return (
    <div className="admin-dashboard">
      <PatientSearch
        patients={patients}
        onPatientSelect={handlePatientSelect}
        onAddNewPatient={handleNewPatientAdded}
      />

      {selectedPatient && (
        <PatientAdmission
          patientId={selectedPatient.id}
          onPatientAdmitted={handleAdmitPatient}
        />
      )}

      <PatientOverview patients={patients} mockPatientData={mockPatientData} />
      <PatientList patients={patients} onPatientSelect={handlePatientSelect} />

      {selectedPatient && (
        <TreatmentPlan patientId={selectedPatient.id} />
      )}

      {selectedPatient && (
        <AdminDrugStatus patientId={selectedPatient.id} />
      )}
    </div>
  );
};

export default AdminDashboard;
