import React from 'react';
import { Link } from 'react-router-dom';
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';

//보드리스트 불러오기
const BoardListStyles = makeStyles({
    presetListStyles:{
        width:"100%",
        maxWidth:"500px",
        height:"100%", 
        display:"flex", 
        alignItems:"center", 
        flexDirection:"column", 
        justifyContent:"space-between",
        fontWeight: 'medium',
        paddingBottom: '20px',
        textAlign:'center',
        lineHeight:'50px',
      },
})

function BoardList(props){
    console.log(props.board)
    const classes = BoardListStyles();
    return(
        <Stack className={classes.presetListStyles} spacing={2} direction='column'>
            <Button component={Link} to='/newmypresets' sx={{color:'white', backgroundColor:'#8e8e8e', height:"50px", width:"500px", border:'1px solid white', fontSize:'30px'}}>+</Button> 
            {props.board.map((article)=> (
                <div style={{height:"50px", width:"500px", border:"1px solid white", color:'white', backgroundColor:'#8e8e8e'}}>제목:{article.title} 조회수:{article.views}</div>
                
            ))}
        </Stack>
    )
}

export default BoardList;
// onClick={`/mypresets/enter/${article.id}`}
