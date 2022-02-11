import React from "react"
import SaveIcon from '@mui/icons-material/Save';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function PresetOptionHandle(){

    const navigate = useNavigate();

    const handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        alert("세이브")
    }

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate(-1);
    }

    return (
        <>
            <div> 공개<Switch {...label} /></div>
            <button onClick={handleFormSubmit}><SaveIcon/>SAVE</button>
            <button onClick={handleCancelClick}><DeleteIcon/>CANCEL</button>
        </>
    )
}