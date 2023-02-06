import React from 'react'
import axios from 'axios'
import BasicCard from './partials/BasicCard'
import Grid from '@mui/material/Grid'

const baseURL = 'https://dbajamteam.pythonanywhere.com/api/jamrequests/'

export default function JamRequests() {
    const [jamRequests, setJamRequests] = React.useState([])

    const getData = async () => {
        const {data} = await axios.get(baseURL);
        setJamRequests(data);
    }
    
    React.useEffect(() => {
        getData();
        }, []);

  return (
    <Grid container spacing={3}>
        {jamRequests.map((request, i) => {
        return (
        <Grid item key={i} xs={3}>
            <BasicCard request={request} />
        </Grid>
        )
          })}
    </Grid>
    
  )
}
