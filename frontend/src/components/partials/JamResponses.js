import React from "react";
import { useSelector } from "react-redux";

const JamResponses = () => {
  const user = useSelector((state) => state.user);
  const [jamRequests, setJamRequests] = React.useState([]);
  const [jamResponses, setJamResponses] = React.useState([]);

  const baseURL =
    "https://sea-turtle-app-zggz6.ondigitalocean.app/api/jamrequestsforuser";
  const responsesURL =
    "https://sea-turtle-app-zggz6.ondigitalocean.app/api/jamresponsesforrequest";

  const getJamResponses = async (id) => {
    const response = await fetch(`${responsesURL}/${id}`);
    const data = await response.json();
    return data;
  };

  const getJamRequests = async () => {
    const response = await fetch(`${baseURL}/${user.user.id}`);
    const data = await response.json();
    setJamRequests(data);
  };
  React.useEffect(() => {
    getJamRequests();
  }, []);
  React.useEffect(() => {
    if (jamRequests.length > 0) {
      Promise.all(
        jamRequests.map(async (request) => {
          const responses = await getJamResponses(request.id);
          return responses;
        })
      ).then((allResponses) => {
        const uniqueResponses = allResponses.reduce((acc, current) => {
          current.forEach((response) => {
            if (!acc.some((item) => item.id === response.id)) {
              acc.push(response);
            }
          });
          return acc;
        }, []);
        setJamResponses(uniqueResponses);
      });
    }
  }, [jamRequests]);

  return (
    <div className="border-4 rounded p-5 mb-4 bg-white">
      <h2>Jam Responses</h2>
      <ul>
        {jamResponses.length > 0 ? (
          jamResponses.map((response, i) => {
            return (
              <li key={i} style={{
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '8px',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
  }}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{marginRight: '16px', width: '8rem'}}>
                    <b>{response.responder_profile.username}</b> <br/>
                    <i>{response.responder_profile.first_name + " " + response.responder_profile.last_name}</i>
                  </div>
                  <div>
                    <div style={{fontSize: '14px'}}>{response.responder_profile.email}</div>
                    <div style={{fontSize: '14px'}}>{response.responder_profile.phone}</div>
                  </div>
                </div>
                  <br/>
                <div style={{fontSize: '16px', width: '20rem', marginLeft: '16px', tmarginTop: '8px'}}>
                  {response.note}
                </div>
              </li>
            );
            console.log(response);
          })
        ) : (
          <p>No responses yet</p>
        )}
      </ul>
    </div>
  );
};

export default JamResponses;
