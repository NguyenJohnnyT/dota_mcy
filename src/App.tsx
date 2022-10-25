import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function startFetching() {
      const data = await (
        await fetch("https://api.opendota.com/api/leagues/14268/teams")
      ).json();
      if (!ignore) {
        setData(data);
      }
    }

    startFetching();

    return () => {
      console.log(data);
      ignore = true;
    };
  }, []);

  return (
    <>
      {data &&
        data.map((team, index) => {
          return <h3>{`${index + 1}: ${JSON.stringify(team)}`}</h3>;
        })}
    </>
  );
};

export default App;
