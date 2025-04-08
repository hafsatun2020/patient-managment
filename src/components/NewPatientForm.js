import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import './newPatient.css'; // Import the CSS file
import { Button, TextField, Select, Grid, Box, Typography, TextareaAutosize } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { styled } from '@mui/material/styles';

// Mock API function (You should replace this with your actual API calls)
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

// Mock Patient Data (for demonstration)
const mockPatientData = {};

// Styled Components
const FormLabel = styled('label')(({ theme }) => ({
    display: 'block',
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
}));

const FormInput = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const FormTextArea = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const FormSelect = styled(Select)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

const FormButton = styled(Button)(({ theme }) => ({
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const DatePickerField = ({ label, id, selected, onSelect }) => {
    const [dateString, setDateString] = useState('');

    useEffect(() => {
        if (selected) {
            setDateString(format(selected, 'PPP'));
        } else {
            setDateString('');
        }
    }, [selected]);

    return (
        <div className="form-group">
            <FormLabel htmlFor={id}>{label}</FormLabel>
            <TextField
                id={id}
                type="text"
                readOnly
                value={dateString}
                placeholder="Pick a date"
                onClick={() => document.getElementById(`calendar-${id}`)?.click()}
                sx={{marginBottom: '16px'}}
            />
            <Button
                variant="outlined"
                onClick={(e) => {
                    e.preventDefault();
                }}
                sx={{display: 'none'}}
                id={`calendar-${id}`}

            >
                🗓️
            </Button>
             <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label={label}
                    value={selected}
                    onChange={onSelect}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            style={{ marginBottom: '10px' }}
                        />
                    )}
                />
            </LocalizationProvider>
        </div>
    );
};

const NewPatientForm = ({ onPatientAdded, onAdmitPatient }) => {
    const [newPatientData, setNewPatientData] = useState({
        fullName: '',
        gender: '',
        age: '',
        hospitalNumber: '',
        dateOfAdmission: undefined,
        address: '',
        nextOfKin: '',
        weight: '',
        height: '',
        medicalHistory: '',
        presentingComplaints: '',
        systemicReview: '',
        familyHistory: '',
        additionalRelevantHistory: '',
        bookedANC: '',
        gestationalAgeBooking: '',
        normalDelivery: '',
        specificDeliveryDetails: '',
        neonatalProblems: '',
        congenitalAnomalies: '',
        childhoodVaccines: '',
        otherVaccines: '',
        nutritionalAssessment: '',
        developmentalAssessment: '',
        regressionMilestones: '',
        childInSchool: '',
        className: '',
        performanceSatisfactory: '',
        pastIllnessesDrugHistory: '',
        interventionsCurrentIllness: '',
        patentMedicineVendors: '',
        traditionalHealer: '',
        hospitalTreatment: '',
        previousTreatmentDetails: '',
        radiationExposure: '',
        otherExposures: '',
        headCircumference: '',
        spo2: '',
        temperature: '',
        heartRate: '',
        respiratoryRate: '',
        bloodPressure: '',
        enlargedLymphNodes: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [patientFound, setPatientFound] = useState(null);
    const [searchHospitalNumber, setSearchHospitalNumber] = useState('');
    const [bsa, setBsa] = useState(null);

    const handleDateChange = useCallback((date) => {
        setNewPatientData(prevData => ({ ...prevData, dateOfAdmission: date }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPatientData(prevData => ({ ...prevData, [name]: value }));
        if (name === 'weight' || name === 'height') {
            const weight = name === 'weight' ? parseFloat(value) : parseFloat(newPatientData.weight);
            const height = name === 'height' ? parseFloat(value) : parseFloat(newPatientData.height);
            if (!isNaN(weight) && !isNaN(height)) {
                setBsa(calculateBSA(weight, height));
            } else {
                setBsa(null); // Clear BSA if weight or height is invalid
            }
        }
    };

    const handleSaveNewPatient = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const savedPatientData = await mockSaveNewPatient(newPatientData);
            setSuccess(savedPatientData.message);
            onPatientAdded(savedPatientData.patient);
            setNewPatientData({
                fullName: '',
                gender: '',
                age: '',
                hospitalNumber: '',
                dateOfAdmission: undefined,
                address: '',
                nextOfKin: '',
                weight: '',
                height: '',
                medicalHistory: '',
                presentingComplaints: '',
                systemicReview: '',
                familyHistory: '',
                additionalRelevantHistory: '',
                bookedANC: '',
                gestationalAgeBooking: '',
                normalDelivery: '',
                specificDeliveryDetails: '',
                neonatalProblems: '',
                congenitalAnomalies: '',
                childhoodVaccines: '',
                otherVaccines: '',
                nutritionalAssessment: '',
                developmentalAssessment: '',
                regressionMilestones: '',
                childInSchool: '',
                className: '',
                performanceSatisfactory: '',
                pastIllnessesDrugHistory: '',
                interventionsCurrentIllness: '',
                patentMedicineVendors: '',
                traditionalHealer: '',
                hospitalTreatment: '',
                previousTreatmentDetails: '',
                radiationExposure: '',
                otherExposures: '',
                headCircumference: '',
                spo2: '',
                temperature: '',
                heartRate: '',
                respiratoryRate: '',
                bloodPressure: '',
                enlargedLymphNodes: '',
            });
            setBsa(null); // Reset BSA after saving
        } catch (err) {
            setError(err.error || "Failed to save patient record.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearchPatient = async () => {
        setLoading(true);
        setError(null);
        setPatientFound(null);
        try {
            const patient = mockPatientData[searchHospitalNumber];
            if (patient) {
                setPatientFound(patient);
                setNewPatientData(patient);
                if (patient.weight && patient.height) {
                    setBsa(calculateBSA(patient.weight, patient.height));
                }
            } else {
                setError('Patient not found.');
            }
        } catch (err) {
            setError(err.message || 'Failed to search for patient.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdmitPatient = () => {
        if (patientFound) {
            onAdmitPatient(patientFound.id);
            setSuccess(`Patient ${patientFound.fullName} admitted.`);
            setPatientFound(null);
            setNewPatientData({
                fullName: '',
                gender: '',
                age: '',
                hospitalNumber: '',
                dateOfAdmission: undefined,
                address: '',
                nextOfKin: '',
                weight: '',
                height: '',
                medicalHistory: '',
                presentingComplaints: '',
                systemicReview: '',
                familyHistory: '',
                additionalRelevantHistory: '',
                bookedANC: '',
                gestationalAgeBooking: '',
                normalDelivery: '',
                specificDeliveryDetails: '',
                neonatalProblems: '',
                congenitalAnomalies: '',
                childhoodVaccines: '',
                otherVaccines: '',
                nutritionalAssessment: '',
                developmentalAssessment: '',
                regressionMilestones: '',
                childInSchool: '',
                className: '',
                performanceSatisfactory: '',
                pastIllnessesDrugHistory: '',
                interventionsCurrentIllness: '',
                patentMedicineVendors: '',
                traditionalHealer: '',
                hospitalTreatment: '',
                previousTreatmentDetails: '',
                radiationExposure: '',
                otherExposures: '',
                headCircumference: '',
                spo2: '',
                temperature: '',
                heartRate: '',
                respiratoryRate: '',
                bloodPressure: '',
                enlargedLymphNodes: '',
            });
            setBsa(null);
        }
    };

    const calculateBSA = (weightKg, heightCm) => {
        const heightM = heightCm / 100;
        const bsaValue = Math.sqrt(heightM * weightKg) * 1.73;
        return parseFloat(bsaValue.toFixed(2));
    };

    return (
        <div className="new-patient-form">
            <Typography variant="h2" component="h2" className="form-title">New Patient Registration</Typography>

            <Box className="mb-6">
                <Typography variant="h3" component="h3" className="text-lg font-semibold mb-2">Search for Existing Patient</Typography>
                <div className="flex gap-4">
                    <FormInput
                        type="text"
                        placeholder="Enter Hospital Number"
                        value={searchHospitalNumber}
                        onChange={(e) => setSearchHospitalNumber(e.target.value)}
                        className="w-64"
                    />
                    <FormButton
                        onClick={handleSearchPatient}
                    >
                        Search
                    </FormButton>
                </div>
            </Box>

            {patientFound && (
                <Box className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                    <Typography variant="h4" component="h4" className="font-bold">Patient Found!</Typography>
                    <Typography variant="body1">Please review the details below and click &quot;Admit Patient&quot; to admit, or edit the details to update.</Typography>
                </Box>
            )}

            <form>
                <Grid container spacing={2}>
                   {/* Input Fields */}
                   <TextField label="Full Name" id="fullName" name="fullName" value={newPatientData.fullName} onChange={handleInputChange} placeholder="Enter full name" required />
                    <Select  label="Gender" id="gender" name="gender" value={newPatientData.gender} onValueChange={(val) => setNewPatientData(prev => ({ ...prev, gender: val }))} options={[{ label: 'Male', value: 'male' }, { label: 'Female', value: 'female' }, { label: 'Other', value: 'other' }]} placeholder="Select gender" />
                    <TextField label="Age" id="age" name="age" type="number" value={newPatientData.age} onChange={handleInputChange} placeholder="Enter age" />
                    <TextField label="Hospital Number" id="hospitalNumber" name="hospitalNumber" value={newPatientData.hospitalNumber} onChange={handleInputChange} placeholder="Enter hospital number" required />
                    <DatePickerField label="Date of Admission" id="dateOfAdmission" selected={newPatientData.dateOfAdmission} onSelect={handleDateChange} />
                    <TextField label="Address" id="address" name="address" value={newPatientData.address} onChange={handleInputChange} placeholder="Enter address" />
                    <TextField label="Next of Kin" id="nextOfKin" name="nextOfKin" value={newPatientData.nextOfKin} onChange={handleInputChange} placeholder="Enter next of kin" />
                    <TextField label="Weight (kg)" id="weight" name="weight" type="number" value={newPatientData.weight} onChange={handleInputChange} placeholder="Enter weight" />
                    <TextField label="Height (cm)" id="height" name="height" type="number" value={newPatientData.height} onChange={handleInputChange} placeholder="Enter height" />
                    {bsa !== null && (
                        <Box className="form-group">
                            <FormLabel className="form-label">BSA (m²)</FormLabel>
                            <input type="text" value={bsa} readOnly className="form-input" />
                        </Box>
                    )}
                    <TextareaAutosize label="Medical History" id="medicalHistory" name="medicalHistory" value={newPatientData.medicalHistory} onChange={handleInputChange} placeholder="Enter medical history" />
                    <TextareaAutosize label="Presenting Complaints" id="presentingComplaints" name="presentingComplaints" value={newPatientData.presentingComplaints} onChange={handleInputChange} placeholder="Enter presenting complaints" />
                    <TextareaAutosize label="Systemic Review" id="systemicReview" name="systemicReview" value={newPatientData.systemicReview} onChange={handleInputChange} placeholder="Enter systemic review" />
                    <TextareaAutosize label="Family History" id="familyHistory" name="familyHistory" value={newPatientData.familyHistory} onChange={handleInputChange} placeholder="Enter family history" />
                    <TextareaAutosize label="Additional Relevant History" id="additionalRelevantHistory" name="additionalRelevantHistory" value={newPatientData.additionalRelevantHistory} onChange={handleInputChange} placeholder="Enter additional relevant history" />
                    <TextField label="Booked ANC" id="bookedANC" name="bookedANC" value={newPatientData.bookedANC} onChange={handleInputChange} placeholder="Enter booked ANC" />
                    <TextField label="Gestational Age at Booking" id="gestationalAgeBooking" name="gestationalAgeBooking" value={newPatientData.gestationalAgeBooking} onChange={handleInputChange} placeholder="Enter gestational age at booking" />
                    <TextField label="Normal Delivery" id="normalDelivery" name="normalDelivery" value={newPatientData.normalDelivery} onChange={handleInputChange} placeholder="Enter normal delivery details" />
                    <TextareaAutosize label="Specific Delivery Details" id="specificDeliveryDetails" name="specificDeliveryDetails" value={newPatientData.specificDeliveryDetails} onChange={handleInputChange} placeholder="Enter specific delivery details" />
                    <TextareaAutosize label="Neonatal Problems" id="neonatalProblems" name="neonatalProblems" value={newPatientData.neonatalProblems} onChange={handleInputChange} placeholder="Enter neonatal problems" />
                    <TextareaAutosize label="Congenital Anomalies" id="congenitalAnomalies" name="congenitalAnomalies" value={newPatientData.congenitalAnomalies} onChange={handleInputChange} placeholder="Enter congenital anomalies" />
                    <TextareaAutosize label="Childhood Vaccines" id="childhoodVaccines" name="childhoodVaccines" value={newPatientData.childhoodVaccines} onChange={handleInputChange} placeholder="Enter childhood vaccines" />
                    <TextareaAutosize label="Other Vaccines" id="otherVaccines" name="otherVaccines" value={newPatientData.otherVaccines} onChange={handleInputChange} placeholder="Enter other vaccines" />
                    <TextareaAutosize label="Nutritional Assessment" id="nutritionalAssessment" name="nutritionalAssessment" value={newPatientData.nutritionalAssessment} onChange={handleInputChange} placeholder="Enter nutritional assessment" />
                    <TextareaAutosize label="Developmental Assessment" id="developmentalAssessment" name="developmentalAssessment" value={newPatientData.developmentalAssessment} onChange={handleInputChange} placeholder="Enter developmental assessment" />
                    <TextareaAutosize label="Regression of Milestones" id="regressionMilestones" name="regressionMilestones" value={newPatientData.regressionMilestones} onChange={handleInputChange} placeholder="Enter regression of milestones" />
                    <TextField label="Child in School" id="childInSchool" name="childInSchool" value={newPatientData.childInSchool} onChange={handleInputChange} placeholder="Is the child in school?" />
                    <TextField label="Class" id="className" name="className" value={newPatientData.className} onChange={handleInputChange} placeholder="Enter class name" />
                    <TextField label="Performance Satisfactory" id="performanceSatisfactory" name="performanceSatisfactory" value={newPatientData.performanceSatisfactory} onChange={handleInputChange} placeholder="Is performance satisfactory?" />
                    <TextareaAutosize label="Past Illnesses and Drug History" id="pastIllnessesDrugHistory" name="pastIllnessesDrugHistory" value={newPatientData.pastIllnessesDrugHistory} onChange={handleInputChange} placeholder="Enter past illnesses and drug history" />
                    <TextareaAutosize label="Interventions for Current Illness" id="interventionsCurrentIllness" name="interventionsCurrentIllness" value={newPatientData.interventionsCurrentIllness} onChange={handleInputChange} placeholder="Enter interventions for current illness" />
                    <TextareaAutosize label="Patent Medicine Vendors" id="patentMedicineVendors" name="patentMedicineVendors" value={newPatientData.patentMedicineVendors} onChange={handleInputChange} placeholder="Enter patent medicine vendors details" />
                    <TextareaAutosize label="Traditional Healer" id="traditionalHealer" name="traditionalHealer" value={newPatientData.traditionalHealer} onChange={handleInputChange} placeholder="Enter traditional healer details" />
                    <TextareaAutosize label="Hospital Treatment" id="hospitalTreatment" name="hospitalTreatment" value={newPatientData.hospitalTreatment} onChange={handleInputChange} placeholder="Enter hospital treatment details" />
                    <TextareaAutosize label="Previous Treatment Details" id="previousTreatmentDetails" name="previousTreatmentDetails" value={newPatientData.previousTreatmentDetails} onChange={handleInputChange} placeholder="Enter previous treatment details" />
                    <TextareaAutosize label="Radiation Exposure" id="radiationExposure" name="radiationExposure" value={newPatientData.radiationExposure} onChange={handleInputChange} placeholder="Enter radiation exposure details" />
                    <TextareaAutosize label="Other Exposures" id="otherExposures" name="otherExposures" value={newPatientData.otherExposures} onChange={handleInputChange} placeholder="Enter other exposures" />
                    <TextField label="Head Circumference (cm)" id="headCircumference" name="headCircumference" type="number" value={newPatientData.headCircumference} onChange={handleInputChange} placeholder="Enter head circumference" />
                    <TextField label="SpO2 (%)" id="spo2" name="spo2" type="number" value={newPatientData.spo2} onChange={handleInputChange} placeholder="Enter SpO2 level" />
                    <TextField label="Temperature (°C)" id="temperature" name="temperature" type="number" value={newPatientData.temperature} onChange={handleInputChange} placeholder="Enter temperature" />
                    <TextField label="Heart Rate (bpm)" id="heartRate" name="heartRate" type="number" value={newPatientData.heartRate} onChange={handleInputChange} placeholder="Enter heart rate" />
                    <TextField label="Respiratory Rate (breaths/min)" id="respiratoryRate" name="respiratoryRate" type="number" value={newPatientData.respiratoryRate} onChange={handleInputChange} placeholder="Enter respiratory rate" />
                    <TextField label="Blood Pressure (mmHg)" id="bloodPressure" name="bloodPressure" value={newPatientData.bloodPressure} onChange={handleInputChange} placeholder="Enter blood pressure (e.g., 120/80)" />
                    <TextareaAutosize label="Enlarged Lymph Nodes" id="enlargedLymphNodes" name="enlargedLymphNodes" value={newPatientData.enlargedLymphNodes} onChange={handleInputChange} placeholder="Enter enlarged lymph nodes details" />
                </Grid>
            </form>
            <Box className="form-button-group mt-4">
                <FormButton
                    onClick={handleSaveNewPatient}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Patient'}
                </FormButton>
            </Box>
            {error && <Typography variant="body2" color="error" className="mt-4">{error}</Typography>}
            {success && <Typography variant="body2" color="success" className="mt-4">{success}</Typography>}
        </div>
    );
};

const calculateBSA = (weightKg, heightCm) => {
    const heightM = heightCm / 100;
    const bsaValue = Math.sqrt(heightM * weightKg) * 1.73;
    return parseFloat(bsaValue.toFixed(2));
};

export default NewPatientForm;
