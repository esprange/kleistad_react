// import {Box, Grid, Paper, TextField, ToggleButton, ToggleButtonGroup, FormControlLabel} from "@mui/material";
// import {useStepper, StepperForm} from "../components/useStepper";
import {useState} from "react";
import dayjs from "dayjs";
import Wizard from "../components/Wizard";

export default function WorkplaceSubscription() {
    const F1 = () => {
        return (<>
            <h2>stap</h2>
        </>)
    }
    const [subscription, setSubscription] = useState(
        {
            'gebruiker_id': 0,
            'user_email': '',
            'email_controle': '',
            'first_name': '',
            'last_name': '',
            'straat': '',
            'huisnr': '',
            'pcode': '',
            'plaats': '',
            'telnr': '',
            'abonnement_keuze': '',
            'extras': [],
            'start_datum': dayjs().format( 'YYYY-MM-DD' ),
            'opmerking': '',
            'betaal': 'ideal',
        } );
    const handleChange = event => {
        const { name, value } = event.target;
        setSubscription(prevSubscription => ({
            ...prevSubscription,
            [name]: value
        }));
        console.log( subscription )
    };
    const validate = ( property ) => {
        let keys = Object.keys( property );
        // if ( keys.includes( 'user_email' ) || keys.includes( )
    }
    const SubscriptionData = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormControlLabel control={
                    <ToggleButtonGroup
                        value={subscription.abonnement_keuze}
                        exclusive
                        name="abonnement_keuze"
                        onChange={
                            (event, value) => {
                                if (null !== value) {
                                    handleChange( event )
                                }
                            }
                        }
                    >
                        <ToggleButton value='onbeperkt'>Onbeperkt</ToggleButton>
                        <ToggleButton value='beperkt'>Beperkt</ToggleButton>
                    </ToggleButtonGroup>
                    } label='Type abonnement' labelPlacement='start'/>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label='start datum'
                        name="start_datum"
                        type="date"
                        defaultValue={subscription.start_datum}
                        sx={{width: 220}}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
        )
    }
    const PersonalData = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField label="Voornaam" name="first_name" onChange={handleChange} required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Achternaam" name="last_name" onChange={handleChange} required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="E-mail" type="email" name="user_email" onChange={handleChange} required/>
                </Grid>
                <Grid item xs={3}>
                    <TextField label="Postcode" name="pcode" onChange={handleChange}/>
                </Grid>
                <Grid item xs={3}>
                    <TextField label="Huisnummer" name="huisnr" onChange={handleChange}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Adres" name="straat" onChange={handleChange}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Plaats" name="plaats" onChange={handleChange}/>
                </Grid>
            </Grid>
        )
    }
    const steps = [
        {
            label: 'Persoonsgegevens',
            optional: false,
            content: <PersonalData/>
        },
        {
            label: 'Start datum en type abonnnement',
            optional: false,
            content: <SubscriptionData/>
        },
        {
            label: 'Opmerking',
            optional: true,
            content: <F1/>
        },
        {
            label: 'Controle',
            optional: false,
            content: <F1/>
        },
        {
            label: 'Betalen',
            optional: false,
            content: <F1/>
        }
    ];
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useStepper(steps, subscription, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            console.log(values)
            resetForm()
        }
    }

    return (
        <Paper elevation={2}>
            <Box padding={5}>
                <StepperForm onSubmit={handleSubmit} steps={steps}/>
            </Box>
        </Paper>
    )
}
