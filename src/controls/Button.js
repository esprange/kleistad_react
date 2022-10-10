import React from 'react'
import { Button as MuiButton } from "@mui/material"

// const useStyles = makeStyles(theme => ({
//     root: {
//         margin: theme.spacing(0.5)
//     },
//     label: {
//         textTransform: 'none'
//     }
// }))


export default function Button(props) {

    const { text, size, color, variant, onClick, ...other } = props

    return (
        <MuiButton
            variant="contained"
            size="large"
            color="primary"
            onClick={onClick}
            {...other}
            >
            {text}
        </MuiButton>
    )
}
