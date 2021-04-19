import React from 'react'
import {TextField, Container, Button} from "@material-ui/core"
import {useHistory} from "react-router-dom";

export default function Home({name, setName}) {
    const history = useHistory();
    return (
        <Container>
            <TextField value = {name} onChange = {(event)=>{
                setName(event.target.value);
            }} />
            <Button onClick = {()=>{
                history.push("/client");
            }}>Client</Button>

            <Button onClick= {()=>{
                history.push("/vendor");
            }}>Vendor</Button>
            
        </Container>
    )
}
