import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import BasicCard from './partials/BasicCard'
import Grid from '@mui/material/Grid'

const jamApi = 'https://dbajamteam.pythonanywhere.com/api/jamrequests/'
const instrumentApi = 'https://dbajamteam.pythonanywhere.com/api/instruments/'
const genreApi = 'https://dbajamteam.pythonanywhere.com/api/musicgenres/'
const levelApi = 'https://dbajamteam.pythonanywhere.com/api/experiencelevels/'
const usersApi = 'https://dbajamteam.pythonanywhere.com/api/users/'

export default function JamRequests() {
    const [jamRequests, setJamRequests] = React.useState([])
    const [instruments, setInstruments] = React.useState([])
    const [genres, setGenres] = React.useState([])
    const [levels, setLevels] = React.useState([])
    const [users, setUsers] = React.useState([])

    useEffect(() => {
    async function getData() {
      const [jamData, instrumentData, genreData, levelData, userData] = await Promise.all([
        axios.get(jamApi),
        axios.get(instrumentApi),
        axios.get(genreApi),
        axios.get(levelApi),
        axios.get(usersApi)
      ])
      setJamRequests(jamData.data)
      setInstruments(instrumentData.data)
      setGenres(genreData.data)
      setLevels(levelData.data)
      setUsers(userData.data)
    }
    getData()}, []);
    console.log(instruments)
  return (
    <Grid container spacing={3}>
        {jamRequests.map((request, i) => {
          const instr = instruments.find((instrument) => instrument.id === request.instrumentid).name
          const gen = genres.find((genre) => genre.id === request.genreid).genre
          const lev = levels.find((level) => level.id === request.experience_level)
          const userFirst = users.find((user) => user.id === request.userid).fname
          const userLast = users.find((user) => user.id === request.userid).lname
          const userName = `${userFirst} ${userLast}`

        return (
        <Grid item key={i} xs={3}>
            <BasicCard 
            request={request} 
            instrument={instr} 
            genre={gen} 
            level={lev}
            contact={userName}
            />
        </Grid>
        )
          })}
    </Grid>
    
  )
}
