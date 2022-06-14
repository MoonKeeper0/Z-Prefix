import { useState, useEffect } from 'react';

const baseUrl = 'http://localhost:8081/api/';

const useFetchStatefule = (urlRoute) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(null);
  const [load, setLoad] = useState(true);
  const [returnGet, setReturnGet] = useState({});

  useEffect(() => {
      fetch(baseUrl + urlRoute)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Cannot convert response to json');
        }
      })
      .then(json => setData(json))
      .catch(e => setErr(e))
      .then(() => setLoad(false))
      .then( () => setReturnGet({data: data, err: err, load: load}))
      .finally(() => console.log(returnGet));
    }, [urlRoute]);

  return returnGet;
};

export default useFetchStatefule;