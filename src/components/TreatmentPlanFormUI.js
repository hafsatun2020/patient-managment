import React from 'react';
import { TextField, Button, Grid, Typography, Box, FormControl } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { styled } from '@mui/material/styles';

// Styled Components
const Card = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
}));

const CardHeader = styled(Box)(({ theme }) => ({
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const InputField = ({ label, id, name, value, onChange, error, helperText, type = "text", ...props }) => (
    <FormControl fullWidth>
        <TextField
            label={label}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            type={type}
            {...props}
        />
    </FormControl>
);

const TreatmentPlanFormUI = ({
    formik,
    ivOndansetronDose,
    days,
    drugsGiven,
    handleInputChange,
    addInputBox,
    removeInputBox,
    addDay,
    handleDrugStatusChange,
    showSave,
    onSave,
    isEditing
}) => {
    return (
        <form onSubmit={onSave}>
            <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
                Treatment Plan
            </Typography>

            <Card>
                <CardHeader>
                    <Typography variant="h2" component="h2">Instructions</Typography>
                </CardHeader>
                <Typography variant="body1">
                    NB: The doses below are for children whose body weight is &gt; 10kg.
                    <br />
                    If &lt; 6 months, give 50% of calculated dose by BSA.
                    <br />
                    If 6m-1yr, give 75% of calculated dose by BSA.
                    <br />
                    Ensure patient receives 2.5L/m2/day of fluid intake.
                    <br />
                    Ensure regular antiemetics are prescribed: IV ondansetron 5mg/m2/dose
                    every 8hrs (uses BSA to calculate dose automatically).
                    <br />
                    Cutoff marks: HB 80g/dL, WBC: 2 x 10^9, Platelets: 100 x 10^9, ANC: 1 x
                    10^9
                </Typography>
            </Card>

            <Grid container spacing={2} sx={{ mb: 2 }}>
                <InputField
                    label="BSA (m2)"
                    id="bsa"
                    name="bsa"
                    value={formik.values.bsa}
                    onChange={formik.handleChange}
                    error={formik.touched.bsa && Boolean(formik.errors.bsa)}
                    helperText={formik.touched.bsa && formik.errors.bsa}
                    type="number"
                    step={0.01}
                />
                <InputField
                    label="Age (months)"
                    id="age"
                    name="age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    error={formik.touched.age && Boolean(formik.errors.age)}
                    helperText={formik.touched.age && formik.errors.age}
                    type="number"
                    min={0}
                />
                <InputField
                    label="IV Ondansetron Dose (mg)"
                    id="ivOndansetron"
                    name="ivOndansetronDose"
                    value={ivOndansetronDose}
                    readOnly
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <InputField
                    label="HB (g/dL)"
                    id="hb"
                    name="hb"
                    value={formik.values.hb}
                    onChange={formik.handleChange}
                    error={formik.touched.hb && Boolean(formik.errors.hb)}
                    helperText={formik.touched.hb && formik.errors.hb}
                    type="number"
                />
                <InputField
                    label="WBC (x10^9/L)"
                    id="wbc"
                    name="wbc"
                    value={formik.values.wbc}
                    onChange={formik.handleChange}
                    error={formik.touched.wbc && Boolean(formik.errors.wbc)}
                    helperText={formik.touched.wbc && formik.errors.wbc}
                    type="number"
                />
                <InputField
                    label="Platelets (x10^9/L)"
                    id="platelets"
                    name="platelets"
                    value={formik.values.platelets}
                    onChange={formik.handleChange}
                    error={formik.touched.platelets && Boolean(formik.errors.platelets)}
                    helperText={formik.touched.platelets && formik.errors.platelets}
                    type="number"
                />
                <InputField
                    label="ANC (x10^9/L)"
                    id="anc"
                    name="anc"
                    value={formik.values.anc}
                    onChange={formik.handleChange}
                    error={formik.touched.anc && Boolean(formik.errors.anc)}
                    helperText={formik.touched.anc && formik.errors.anc}
                    type="number"
                />
            </Grid>

            {days.map((dayData, dayIndex) => (
                <Card key={dayIndex}>
                    <CardHeader>
                        <Typography variant="h3" component="h3">Day {dayData.day}</Typography>
                    </CardHeader>
                    <Box sx={{ p: 2 }}>
                        {dayData.inputBoxes.map((inputBox, inputBoxIndex) => (
                            <Box key={inputBoxIndex} sx={{ mb: 2 }}>
                                <Grid container spacing={2}>
                                    <InputField
                                        label="Drug"
                                        id={`days[${dayIndex}].inputBoxes[${inputBoxIndex}].drug`}
                                        name={`days[${dayIndex}].inputBoxes[${inputBoxIndex}].drug`}
                                        value={inputBox.drug}
                                        onChange={formik.handleChange}
                                        error={formik.touched.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.drug && Boolean(formik.errors.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.drug)}
                                        helperText={formik.touched.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.drug && formik.errors.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.drug}
                                    />
                                    <InputField
                                        label="Dosages (mg/m2)"
                                        id={`days[${dayIndex}].inputBoxes[${inputBoxIndex}].dosages`}
                                        name={`days[${dayIndex}].inputBoxes[${inputBoxIndex}].dosages`}
                                        value={inputBox.dosages}
                                        onChange={formik.handleChange}
                                        error={formik.touched.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.dosages && Boolean(formik.errors.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.dosages)}
                                        helperText={formik.touched.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.dosages && formik.errors.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.dosages}
                                    />
                                    <InputField
                                        label="Diluent Name"
                                        id={`days[${dayIndex}].inputBoxes[${inputBoxIndex}].diluentName`}
                                        name={`days[${dayIndex}].inputBoxes[${inputBoxIndex}].diluentName`}
                                        value={inputBox.diluentName}
                                        onChange={formik.handleChange}
                                         error={formik.touched.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.diluentName && Boolean(formik.errors.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.diluentName)}
                                        helperText={formik.touched.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.diluentName && formik.errors.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.diluentName}
                                    />
                                    <InputField
                                        label="Diluent Dosage (ml/m2/hr)"
                                        id={`days[${dayIndex}].inputBoxes[${inputBoxIndex}].diluentDosage`}
                                        name={`days[${dayIndex}].inputBoxes[${inputBoxIndex}].diluentDosage`}
                                        value={inputBox.diluentDosage}
                                        onChange={formik.handleChange}
                                         error={formik.touched.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.diluentDosage && Boolean(formik.errors.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.diluentDosage)}
                                        helperText={formik.touched.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.diluentDosage && formik.errors.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.diluentDosage}
                                    />
                                    <InputField
                                        label="Duration"
                                        id={`days[${dayIndex}].inputBoxes[${inputBoxIndex}].duration`}
                                        name={`days[${dayIndex}].inputBoxes[${inputBoxIndex}].duration`}
                                        value={inputBox.duration}
                                        onChange={formik.handleChange}
                                         error={formik.touched.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.duration && Boolean(formik.errors.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.duration)}
                                        helperText={formik.touched.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.duration && formik.errors.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.duration}
                                    />
                                    <InputField
                                        label="Administered By"
                                        id={`days[${dayIndex}].inputBoxes[${inputBoxIndex}].administeredBy`}
                                        name={`days[${dayIndex}].inputBoxes[${inputBoxIndex}].administeredBy`}
                                        value={inputBox.administeredBy}
                                        onChange={formik.handleChange}
                                         error={formik.touched.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.administeredBy && Boolean(formik.errors.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.administeredBy)}
                                        helperText={formik.touched.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.administeredBy && formik.errors.days?.[dayIndex]?.inputBoxes?.[inputBoxIndex]?.administeredBy}
                                    />
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => removeInputBox(dayIndex, inputBoxIndex)}
                                    >
                                        Remove
                                    </Button>
                                </Grid>
                            </Box>
                        ))}
                        <Button
                            variant="outlined"
                            onClick={() => addInputBox(dayIndex)}
                        >
                            Add Another
                        </Button>
                    </Box>
                </Card>
            ))}
            <Button
                variant="outlined"
                onClick={addDay}
            >
                Add Day
            </Button>
            {showSave && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSave} // Use onSave prop
                    disabled={!formik.isValid || !formik.dirty}
                >
                    {isEditing ? 'Update Treatment' : 'Save Treatment'}
                </Button>
            )}
        </form>
    );
};

export default TreatmentPlanFormUI;
