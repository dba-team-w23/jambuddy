import React from 'react'
import axios from 'axios'

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
console.log(jamRequests)

  return (
    jamRequests.map((request, i) => {
        return (
            <div key={i}>
                <p>{request.location}</p>
                <p>{request.status}</p>
                <p>{request.created}</p>
                <p>{request.instrumentid}</p>
                <p>{request.genreid}</p>
            </div>
        )
    })
    
  )
}
