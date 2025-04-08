import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { ListChecks } from 'lucide-react';

const PatientOverview = ({ patients, mockPatientData }) => {
    const [upcomingTreatments, setUpcomingTreatments] = useState([]);
    const [showPatientList, setShowPatientList] = useState(false);

    useEffect(() => {
        const getUpcomingTreatmentCycles = () => {
            const today = new Date();
            const upcoming = [];
            for (const patient of Object.values(mockPatientData)) {
                if (patient.treatmentCycles?.length > 0) {
                    for (const cycle of patient.treatmentCycles) {
                        const nextCycleDate = parseISO(cycle.date);
                        if (nextCycleDate > today) {
                            upcoming.push({
                                patientId: patient.id,
                                nextCycleDate: nextCycleDate,
                            });
                        }
                    }
                }
            }
            return upcoming.sort((a, b) => a.nextCycleDate - b.nextCycleDate);
        };
        setUpcomingTreatments(getUpcomingTreatmentCycles());
    }, [mockPatientData]);

    return (
        <div className="patient-overview">
            <h2 className="overview-title">
                <Users className="overview-icon" /> Patient Overview
            </h2>
            <div className="overview-cards">
                <div className="overview-card">
                    <h3 className="card-title">Total Patients Registered</h3>
                    <p className="card-value">{patients.length}</p>
                </div>
                <div className="overview-card">
                    <h3 className="card-title">Patients on Admission</h3>
                    <p className="card-value">{patients.filter(p => p.status === 'admitted').length}</p>
                </div>
                <div className="overview-card">
                    <h3 className="card-title">Upcoming Treatment Cycles</h3>
                    <ul className="list-disc list-inside">
                        {upcomingTreatments.length > 0 ? (
                            upcomingTreatments.map(t => (
                                <li key={t.patientId}>
                                    {mockPatientData[t.patientId]?.fullName || "Unknown"} - {format(parseISO(t.nextCycleDate), "PPP")}
                                </li>
                            ))
                        ) : (
                            <li>No upcoming treatments</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="patient-list-section">
                <h2 className="list-title">
                    <ListChecks className="list-icon" /> Patient List
                </h2>
                <div className="list-toggle">
                    <button
                        onClick={() => setShowPatientList(!showPatientList)}
                        className="list-toggle-button"
                    >
                        {showPatientList ? 'Hide Patient List' : 'Show Patient List'}
                    </button>
                </div>
                <AnimatePresence>
                    {showPatientList && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="patient-list"
                        >

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PatientOverview;