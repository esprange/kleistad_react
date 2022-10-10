import React, { useState } from 'react'
import TextField from '@mui/material/TextField';

export default function DatePicker(props) {
    const { name, label, value, onChange } = props;
    return (
        <TextField
            label={label}
            type="date"
            defaultValue={value}
            sx={{ width: 220 }}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={onChange}
        />
    )
}