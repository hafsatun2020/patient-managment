import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@mui/material';
import TreatmentPlanFormLogic from './TreatmentPlanFormLogic'; // Import the TreatmentPlanFormLogic

// Mock API functions (Replace with your actual API calls)



const mockGetTreatmentPlan = async (patientId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock treatment plan data
      const mockTreatmentPlans = {
        '1': {
          days: [
            {
              day: 1,
              inputBoxes: [
                { drug: 'Drug A', dosages: '100mg', diluentName: 'Saline', diluentDosage: '50ml/hr', duration: '1hr', administeredBy: 'Nurse John' },
                { drug: 'Drug B', dosages: '50mg', diluentName: 'D5W', diluentDosage: '100ml/hr', duration: '2hr', administeredBy: 'Nurse Jane' },
              ],
            },
            {
              day: 3,
              inputBoxes: [
                { drug: 'Drug C', dosages: '200mg', diluentName: 'Saline', diluentDosage: '75ml/hr', duration: '1.5hr', administeredBy: 'Dr Smith' },
              ],
            },
          ],
          bsa: 1.7,
          age: 24,
          ivOndansetronDose: 8.5,
          hb: 12,
          wbc: 8,
          platelets: 250,
          anc: 2,
        },
        '2': {
            days: [
              {
                day: 1,
                inputBoxes: [
                  { drug: 'Drug X', dosages: '150mg', diluentName: 'Saline', diluentDosage: '60ml/hr', duration: '1.2hr', administeredBy: 'Nurse Mary' },
                  { drug: 'Drug Y', dosages: '75mg', diluentName: 'D5W', diluentDosage: '120ml/hr', duration: '2.5hr', administeredBy: 'Nurse Bob' },
                ],
              },
            ],
            bsa: 1.5,
            age: 36,
            ivOndansetronDose: 7.5,
            hb: 11,
            wbc: 7,
            platelets: 200,
            anc: 1.5,
          },
      };

      const plan = mockTreatmentPlans[patientId] || null; // Return plan or null if not found
      resolve(plan);
    }, 500);
  });
};



// ===============================
// TreatmentPlan Component
// ===============================
const TreatmentPlan = ({ patientId, readOnly = false }) => {
  const [treatmentPlan, setTreatmentPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [drugsGiven, setDrugsGiven] = useState([]);

  // ... existing fetchTreatmentPlan logic ...
  const handleEditClick = () => {
    if (!readOnly) setIsEditing(true);
  };

  const fetchTreatmentPlan = useCallback(async (id) => {
    try {
      setLoading(true);
      const plan = await mockGetTreatmentPlan(id);
      if (plan) {
        setTreatmentPlan(plan);
        setDrugsGiven(plan.drugsGiven || []);
      } else {
        setError('No treatment plan found.');
      }
    } catch (err) {
      setError('Failed to fetch treatment plan.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
      if (patientId) {
          fetchTreatmentPlan(patientId);
      }
  }, [patientId, fetchTreatmentPlan]);

  const handleSaveTreatment = (treatmentData) => {
      console.log('Saving treatment plan:', treatmentData);
      setTreatmentPlan(treatmentData);
      setIsEditing(false);
      setDrugsGiven(treatmentData.drugsGiven);
  };

  const handleDrugGivenChange = (index, status) => {
      setDrugsGiven(prevDrugsGiven => {
          const updated = [...prevDrugsGiven];
          updated[index] = { ...updated[index], status };
          return updated;
      });
  };

  if (loading) return <div>Loading treatment plan...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!treatmentPlan) return <div>No treatment plan available for this patient.</div>;

  return (
      <div>
          <h2>Treatment Plan for Patient (ID: {patientId})</h2>
          {isEditing && !readOnly ? (
              <TreatmentPlanFormLogic
                  treatment={treatmentPlan}
                  onSaveTreatment={handleSaveTreatment}
                  isEditing={true}
                  drugsGiven={drugsGiven}
                  onDrugGivenChange={handleDrugGivenChange}
              />
          ) : (
              <>
                  <div>
                      <h3>Medications</h3>
                      {treatmentPlan.days?.map((day, dayIndex) => (
                          <div key={`day-${dayIndex}`}>
                              <h4>Day {day.day}</h4>
                              <ul>
                                  {day.inputBoxes?.map((box, boxIndex) => (
                                      <li key={`box-${boxIndex}`}>
                                          {box.drug} - {box.dosages} ({box.diluentName}, {box.diluentDosage}, {box.duration}) - Administered by: {box.administeredBy}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      ))}
                      <p>BSA: {treatmentPlan.bsa}</p>
                      <p>Age: {treatmentPlan.age} months</p>
                      <p>IV Ondansetron Dose: {treatmentPlan.ivOndansetronDose} mg</p>
                      <p>HB: {treatmentPlan.hb} g/dL</p>
                      <p>WBC: {treatmentPlan.wbc} x 10^9/L</p>
                      <p>Platelets: {treatmentPlan.platelets} x 10^9/L</p>
                      <p>ANC: {treatmentPlan.anc} x 10^9/L</p>

                      <h3>Drug Administration Status</h3>
                      {drugsGiven?.map((drug, index) => (
                          <div key={index}>
                              <p>
                                  Drug: {treatmentPlan.drugs?.split(', ')[index]} , Status: {drug.status}
                              </p>
                              {!readOnly && (
                                  <select
                                      value={drug.status}
                                      onChange={(e) => handleDrugGivenChange(index, e.target.value)}
                                  >
                                      <option value="pending">Pending</option>
                                      <option value="given">Given</option>
                                      <option value="delayed">Delayed</option>
                                      <option value="not_given">Not Given</option>
                                  </select>
                              )}
                          </div>
                      ))}
                  </div>
                 <Button onClick={handleEditClick} variant="contained">
  Edit Treatment Plan
</Button>
              </>
          )}
      </div>
  );
};

export  {TreatmentPlan};

