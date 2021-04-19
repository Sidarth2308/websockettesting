import { Container, Box, Typography,Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import io from "socket.io-client";


let socket;
const ENDPOINT ="http://localhost:5000/";

export default function Vendor({name}) {
    const [userRequests, setUserRequests]  = useState([]);
    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("vendor-join", {name})
        return ()=>{
    
          return () =>{
            socket.emit("disconnect");
            socket.off();
          }
        }
      },[ENDPOINT])

    useEffect(()=>{
        socket.on("user-request", (request)=>{
            setUserRequests(requests =>[...requests,request])
        })
        
    }, [])
    
    const acceptRequest = (userRequest)=>{
        socket.emit("vendor-accept-request", 
        {name : name, client : userRequest.id});
    }

    return (
        <Container>
            {
                userRequests.map((userRequest)=>{ 
                    console.log(userRequest);
                    return(
                    <Box style = {{margin : "20px"}}>
                        <Typography>Incoming User request</Typography>
                        <Typography>User name : {userRequest.name}</Typography>
                        <Typography>Items : "Show Items here"</Typography>
                        <Button onClick ={()=>{
                            acceptRequest(userRequest);
                        }}>Accept request</Button>
                    </Box>
                )})
            }
        </Container>
    )
}
