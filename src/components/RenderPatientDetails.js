import React, { useState } from 'react';
import { format, isValid } from 'date-fns';
import mockPatientData from './mockPatientData';
/**
 * Renders patient demographic details.
 */
const RenderPatientDetails = ({ patient }) => {
    const [showFullPatientDetails, setShowFullPatientDetails] = useState(false);

    return (
        <div className="patient-info">
        <div
            onClick={() => setShowFullPatientDetails(!showFullPatientDetails)}
            className="cursor-pointer bg-gray-100 p-2 rounded"
        >
            <p><strong>Full Name:</strong> {patient.fullName}</p>
            <p><strong>Hospital Number:</strong> {patient.hospitalNumber}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p>
                <strong>Date of Admission:</strong>{' '}
                {patient.dateOfAdmission && isValid(new Date(patient.dateOfAdmission))
                    ? format(new Date(patient.dateOfAdmission), 'PPP')
                    : 'N/A'}
            </p>
            <p className="show-full-details">
                {showFullPatientDetails ? 'Hide Details ▲' : 'Show Full Details ▼'}
            </p>
        </div>

        <div className={`full-patient-details ${showFullPatientDetails ? 'show-details' : 'hide-details'}`}>
        <div className="patient-details-grid">
            <p><strong>Address:</strong> {patient.address}</p>
            <p><strong>Next of Kin:</strong> {patient.nextOfKin}</p>
            <p><strong>Weight:</strong> {patient.weight} kg</p>
            <p><strong>Height:</strong> {patient.height} cm</p>
            <p><strong>Medical History:</strong> {patient.medicalHistory}</p>
            <p><strong>Presenting Complaints:</strong> {patient.presentingComplaints}</p>
            <p><strong>Systemic Review:</strong> {patient.systemicReview}</p>
            <p><strong>Family History:</strong> {patient.familyHistory}</p>
            <p><strong>Additional Relevant History:</strong> {patient.additionalRelevantHistory}</p>
                 <p>
                        <strong>Booked ANC:</strong> {patient.bookedANC ? 'Yes' : 'No'}
                    </p>
                    <p>
                        <strong>Gestational Age Booking:</strong>{' '}
                        {patient.gestationalAgeBooking}
                    </p>
                    <p>
                        <strong>Normal Delivery:</strong>{' '}
                        {patient.normalDelivery ? 'Yes' : 'No'}
                    </p>
                    <p>
                        <strong>Specific Delivery Details:</strong>{' '}
                        {patient.specificDeliveryDetails}
                    </p>
                    <p>
                        <strong>Neonatal Problems:</strong>{' '}
                        {patient.neonatalProblems}
                    </p>
                    <p>
                        <strong>Congenital Anomalies:</strong>{' '}
                        {patient.congenitalAnomalies}
                    </p>
                    <p>
                        <strong>Childhood Vaccines:</strong>{' '}
                        {patient.childhoodVaccines}
                    </p>
                    <p>
                        <strong>Other Vaccines:</strong> {patient.otherVaccines}
                    </p>
                    <p>
                        <strong>Nutritional Assessment:</strong>{' '}
                        {patient.nutritionalAssessment}
                    </p>
                    <p>
                        <strong>Developmental Assessment:</strong>{' '}
                        {patient.developmentalAssessment}
                    </p>
                    <p>
                        <strong>Regression Milestones:</strong>{' '}
                        {patient.regressionMilestones}
                    </p>
                    <p>
                        <strong>Child in School:</strong>{' '}
                        {patient.childInSchool ? 'Yes' : 'No'}
                    </p>
                    <p>
                        <strong>Class Name:</strong> {patient.className}
                    </p>
                    <p>
                        <strong>Performance Satisfactory:</strong>{' '}
                        {patient.performanceSatisfactory ? 'Yes' : 'No'}
                    </p>
                    <p>
                        <strong>Past Illnesses Drug History:</strong>{' '}
                        {patient.pastIllnessesDrugHistory}
                    </p>
                    <p>
                        <strong>Interventions Current Illness:</strong>{' '}
                        {patient.interventionsCurrentIllness}
                    </p>
                    <p>
                        <strong>Patent Medicine Vendors:</strong>{' '}
                        {patient.patentMedicineVendors}
                    </p>
                    <p>
                        <strong>Traditional Healer:</strong>{' '}
                        {patient.traditionalHealer ? 'Yes' : 'No'}
                    </p>
                    <p>
                        <strong>Hospital Treatment:</strong>{' '}
                        {patient.hospitalTreatment}
                    </p>
                    <p>
                        <strong>Previous Treatment Details:</strong>{' '}
                        {patient.previousTreatmentDetails}
                    </p>
                    <p>
                        <strong>Radiation Exposure:</strong>{' '}
                        {patient.radiationExposure}
                    </p>
                    <p>
                        <strong>Other Exposures:</strong> {patient.otherExposures}
                    </p>
                    <p>
                        <strong>Head Circumference:</strong>{' '}
                        {patient.headCircumference} cm
                    </p>
                    <p>
                        <strong>Spo2:</strong> {patient.spo2}%
                    </p>
                    <p>
                        <strong>Temperature:</strong> {patient.temperature} °C
                    </p>
                    <p>
                        <strong>Heart Rate:</strong> {patient.heartRate} bpm
                    </p>
                    <p>
                        <strong>Respiratory Rate:</strong>{' '}
                        {patient.respiratoryRate} breaths/min
                    </p>
                    <p>
                        <strong>Blood Pressure:</strong> {patient.bloodPressure}
                    </p>
                    <p>
                        <strong>Enlarged Lymph Nodes:</strong>{' '}
                        {patient.enlargedLymphNodes ? 'Yes' : 'No'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RenderPatientDetails;