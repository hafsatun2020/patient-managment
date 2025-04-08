import React, { useState } from 'react';
import { PatientSearch } from '../PatientSearch';
import PatientList from './PatientList';
import PatientDetailsSection from './PatientDetailsSection';
import { TreatmentPlan } from '../RenderTreatmentPlan';
import { DrugAdministration, AdminDrugStatus } from '../drugAdmin';
import NewPatientSection from './NewPatientSection';

const JuniorDoctorDashboard = ({ patients, setPatients }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Filter only admitted patients
  const admittedPatients = patients.filter(p => p.status === 'admitted');

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleStatusChange = (patientId, newStatus) => {
    const updatedPatients = patients.map(p =>
      p.id === patientId ? { ...p, status: newStatus, dateOfDischarge: new Date() } : p
    );
    setPatients(updatedPatients);
    setSelectedPatient(null);
  };

  const handleNewPatientAdded = (newPatient) => {
    setPatients(prev => [...prev, newPatient]);
  };

  return (
    <div className="junior-doctor-dashboard">
      <h2>Junior Doctor Dashboard</h2>

      <PatientSearch
        patients={admittedPatients}
        onPatientSelect={handlePatientSelect}
        hideNewPatientButton={false}
        onAddNewPatient={handleNewPatientAdded}
      />

      <NewPatientSection onNewPatient={handleNewPatientAdded} />

      <h3>Patients on Admission</h3>
      <PatientList patients={admittedPatients} onPatientSelect={handlePatientSelect} />

      {selectedPatient && (
        <>
          <PatientDetailsSection patient={selectedPatient} />

          <h4>Treatment Plan (View Only)</h4>
          <TreatmentPlan patientId={selectedPatient.id}  readOnly={true}  />

          <h4>Drug Administration</h4>
          <DrugAdministration patientId={selectedPatient.id} />
          <AdminDrugStatus patientId={selectedPatient.id} />

          <div style={{ marginTop: '1rem' }}>
            <button onClick={() => handleStatusChange(selectedPatient.id, 'discharged')}>
              Discharge Patient
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default JuniorDoctorDashboard;
