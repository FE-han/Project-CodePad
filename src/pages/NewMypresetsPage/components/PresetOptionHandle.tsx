import React from "react"
import axios from 'axios';

export default function PresetOptionHandle(){

    const submitBoard = async () => {
        const title = (document.getElementsByName('title')[0] as HTMLInputElement).value.trim();
        
        if(title === ''){
            return alert('제목을 입력하세요.');
        }

        const data = { title: title}
        const res = await axios('/add/board',{
            method: 'POST',
            data : data,
        })
    }

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