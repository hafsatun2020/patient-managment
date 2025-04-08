import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { styled } from '@mui/material/styles';
import TreatmentPlanFormUI from './TreatmentPlanFormUI'; // Separate UI Component

// ===============================
// Logic Component
// ===============================

const TreatmentPlanFormLogic = ({
    patientId,
    treatment,
    onSaveTreatment,
    isEditing,
    drugsGiven,
    onDrugGivenChange
}) => {
    const [showSave, setShowSave] = useState(isEditing);

    // Determine initial days value
    const initialDays = treatment?.days || [
        {
            day: 1,
            inputBoxes: [
                {
                    drug: '',
                    dosages: '',
                    diluentName: '',
                    diluentDosage: '',
                    duration: '',
                    administeredBy: '',
                },
            ],
        },
    ];


    // Validation schema using Yup
    const validationSchema = Yup.object({
        bsa: Yup.number().required('BSA is required').min(0.1, 'BSA must be greater than 0'),
        age: Yup.number().required('Age is required').integer().min(0, 'Age must be a non-negative integer'),
        hb: Yup.number().required('HB is required').min(0),
        wbc: Yup.number().required('WBC is required').min(0),
        platelets: Yup.number().required('Platelets are required').min(0),
        anc: Yup.number().required('ANC is required').min(0),
        days: Yup.array().of(
            Yup.object({
                day: Yup.number().required(),
                inputBoxes: Yup.array().of(
                    Yup.object({
                        drug: Yup.string().required('Drug name is required'),
                        dosages: Yup.string().required('Dosage is required'),
                        diluentName: Yup.string().required('Diluent Name is required'),
                        diluentDosage: Yup.string().required('Diluent Dosage is required'),
                        duration: Yup.string().required('Duration is required'),
                        administeredBy: Yup.string().required('Administered By is required'),
                    })
                )
            })
        ).required()
    });

    // Initialize formik
    const formik = useFormik({
        initialValues:  {
            bsa: treatment?.bsa || 0,
            age: treatment?.age || 0,
            hb: treatment?.hb || 0,
            wbc: treatment?.wbc || 0,
            platelets: treatment?.platelets || 0,
            anc: treatment?.anc || 0,
            days: initialDays,  // Use the determined initialDays value
            drugsGiven: treatment?.drugsGiven || []
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSaveTreatment(values);
            setShowSave(false);
        },
        enableReinitialize: true, // Ensure form updates when 'treatment' prop changes
    });

      // Update local state when 'treatment' prop changes
      useEffect(() => {
        setShowSave(isEditing); // Only show save button when isEditing is true
    }, [treatment, isEditing]);

    // Calculate IV Ondansetron Dose
    const ivOndansetronDose = formik.values.bsa ? calculateOndansetronDose(formik.values.bsa, formik.values.age) : 0;

    function calculateOndansetronDose(bsa, age) {
        const calculatedDose = bsa * 5; // 5mg/m2/dose
        let finalDose = calculatedDose;

        if (age < 6) {
            finalDose = calculatedDose * 0.5; // 50% for <6 months
        } else if (age >= 6 && age <= 12) {
            finalDose = calculatedDose * 0.75; // 75% for 6-12 months
        }
        return parseFloat(finalDose.toFixed(2));
    }

    const handleInputChange = (dayIndex, inputBoxIndex, fieldName, value) => {
        const updatedDays = formik.values.days.map((day, dIndex) => {
            if (dIndex === dayIndex) {
                const updatedInputBoxes = day.inputBoxes.map((inputBox, iIndex) => {
                    if (iIndex === inputBoxIndex) {
                        return { ...inputBox, [fieldName]: value };
                    }
                    return inputBox;
                });
                return { ...day, inputBoxes: updatedInputBoxes };
            }
            return day;
        });

        formik.setFieldValue('days', updatedDays);
        setShowSave(true);
    };

    const addInputBox = (dayIndex) => {
          const updatedDays = formik.values.days.map((day, index) => {
            if (index === dayIndex) {
                return {
                    ...day,
                    inputBoxes: [
                        ...day.inputBoxes,
                        {
                            drug: '',
                            dosages: '',
                            diluentName: '',
                            diluentDosage: '',
                            duration: '',
                            administeredBy: '',
                        },
                    ],
                };
            }
            return day;
        });
        formik.setFieldValue('days', updatedDays);
        setShowSave(true);
    };

    const removeInputBox = (dayIndex, inputBoxIndex) => {
          const updatedDays = formik.values.days.map((day, index) => {
            if (index === dayIndex) {
                return {
                    ...day,
                    inputBoxes: day.inputBoxes.filter((_, index) => index !== inputBoxIndex),
                };
            }
            return day;
        });
        formik.setFieldValue('days', updatedDays);
        setShowSave(true);
    };

    const addDay = () => {
        const newDay = {
            day: formik.values.days.length + 1,
            inputBoxes: [
                {
                    drug: '',
                    dosages: '',
                    diluentName: '',
                    diluentDosage: '',
                    duration: '',
                    administeredBy: '',
                },
            ],
        };
        formik.setFieldValue('days', [...formik.values.days, newDay]);
        setShowSave(true);
    };

    const handleDrugStatusChange = (index, status) => {
        const updatedDrugsGiven = [...drugsGiven]; // Use drugsGiven prop
        updatedDrugsGiven[index].status = status;
        onDrugGivenChange(index, status); // Notify parent
        setShowSave(true);
    };

    return (
        <TreatmentPlanFormUI
            formik={formik}
            ivOndansetronDose={ivOndansetronDose}
            days={formik.values.days}
            drugsGiven={drugsGiven}
            handleInputChange={handleInputChange}
            addInputBox={addInputBox}
            removeInputBox={removeInputBox}
            addDay={addDay}
            handleDrugStatusChange={handleDrugStatusChange}
            showSave={showSave}
            onSave={formik.handleSubmit}
            isEditing = {isEditing}
        />
    );
};

export default TreatmentPlanFormLogic;
