import {Box, Button, MobileStepper as Stepper, Step, StepLabel, Typography, Paper} from "@mui/material";
import {useState} from "react";

export function useStepper ( steps, initialValues, validateOnChange = false, validate ) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if (validateOnChange)
            validate({ [name]: value })
    }

    const resetForm = () => {
        setValues(initialValues);
        setErrors({})
    }

    return {
        steps,
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    }
}

export function StepperForm(props) {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const isStepOptional = (step) => {
        return props.steps[step].optional;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Paper elevation={2}>
            <Box padding={5}>
                <form>
                <Stepper activeStep={activeStep}>
                    {props.steps.map((step, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optioneel</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={step.label} {...stepProps}>
                                <StepLabel {...labelProps}>{step.label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {props.steps[activeStep].content}
                {activeStep === props.steps.length ? (
                    <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Alle stappen zijn doorlopen - je bent klaar met de aanmelding
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Terug
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Overslaan
                                </Button>
                            )}

                            <Button onClick={handleNext}>
                                {activeStep === props.steps.length - 1 ? 'Betalen' : 'Volgende'}
                            </Button>
                        </Box>
                    </>
                )}
                </form>
            </Box>
        </Paper>
    )

}