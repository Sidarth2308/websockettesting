import { Container, Box, Typography,Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import io from "socket.io-client";


let socket;
const ENDPOINT ="http://localhost:5000/";

export default function Client({name}) {
    const [response, setResponse] = useState({
        state : false,
        vendor : "",
    })
    const [requestSent, setRequestSent] = useState(false);
    useEffect(()=>{
        socket = io(ENDPOINT);
        socket.emit("client-join", {name})
        return ()=>{
    
          return () =>{
            socket.emit("disconnect");
            socket.off();
          }
        }
      },[ENDPOINT])

    useEffect(()=>{
        socket.on("vendor-accept-request", (vendor)=>{
            console.log("Data received");
            setResponse({
                state : true,
                vendor : vendor,
            })
        })
        
    }, [])
    const sendRequest = ()=>{
       
        socket.emit("user-request", {name : name});
        setRequestSent(true);
    }
    return (
        <Container>
            {
                requestSent?(
                    <Box>
                   <Typography>List sent to vendors</Typography>
                   {
                       response.state?(
                            <Typography>Request Accepted : {response.vendor.name}</Typography>
                       ):(
                            <Typography>Waiting for response</Typography>
                       )
                   }
                   </Box>
                ):(
                    <Button onClick = {sendRequest}>Send List to Vendors</Button>
                )
            }
            
        </Container>
    )
}
