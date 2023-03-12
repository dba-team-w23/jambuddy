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
              <li key={i}>
                <b>{response.responder_username}: </b>
                {response.note}
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
