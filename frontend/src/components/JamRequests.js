import React from 'react'
import { useEffect } from 'react'
import BasicCard from './partials/BasicCard'
import Grid from '@mui/material/Grid'

// const apiRoot = 'http://localhost:8000'
const apiRoot = 'https://sea-turtle-app-zggz6.ondigitalocean.app'

const jamApi = `${apiRoot}/api/jamrequests/`
const instrumentApi = `${apiRoot}/api/instruments/`
const genreApi = `${apiRoot}/api/musicgenres/`
const levelApi = `${apiRoot}/api/experiencelevels/`
const usersApi = `${apiRoot}/api/users/`

export default function JamRequests() {
    const [jamRequests, setJamRequests] = React.useState([])
    const [instruments, setInstruments] = React.useState([])
    const [genres, setGenres] = React.useState([])
    const [levels, setLevels] = React.useState([])
    const [users, setUsers] = React.useState([])

    useEffect(() => {
    async function getData() {
      const [jamResponse, instrumentResponse, genreResponse, levelResponse, userResponse] = await Promise.all(
        [jamApi, instrumentApi, genreApi, levelApi, usersApi].map(url =>
          fetch(url).then(res => res.json())
        )
      );
      setJamRequests(jamResponse);
      setInstruments(instrumentResponse);
      setGenres(genreResponse);
      setLevels(levelResponse);
      setUsers(userResponse);
    }
    getData()}, []);

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

