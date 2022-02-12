import React, { useState } from "react"

export default function PresetTitle(props:any){

    return (
        <div>
            <h2>Title</h2>
            <input onChange={props.handleTitleChange} value={props.titleValue} type="text" name="title"/>
        </div>
    )
}