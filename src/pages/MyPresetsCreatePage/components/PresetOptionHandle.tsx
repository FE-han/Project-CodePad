import React from "react"

export default function PresetOptionHandle(){

    const handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        alert("세이브")
    }

    const handleCancelClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        alert("취소")
    }

    return (
        <>
            <button onClick={handleFormSubmit}>SAVE</button>
            <button onClick={handleCancelClick}>CANCEL</button>
        </>
    )
}