import React from "react"
import axios from 'axios';

export default function PresetOptionHandle(props: any){


    const handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        alert("세이브")
    }

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        alert("취소")
    }

    return (
        <>
            <button onClick={props.handleSubmit}>SAVE</button>
            <button onClick={handleCancelClick}>CANCEL</button>
        </>
    )
}