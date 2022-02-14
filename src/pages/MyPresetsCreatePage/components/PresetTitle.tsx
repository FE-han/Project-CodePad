export default function PresetTitle(props:any){
    return (
        <div>
            <h2>Title</h2>
            <input type="text" onChange={props.handleTitleChange} value={props.titleValue} name="title"/>
        </div>
    )
}