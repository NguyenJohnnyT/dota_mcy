import React, { useEffect, useState } from "react";

type TeamInfo = {
  team_id: number;
  rating: number;
  wins: number;
  losses: number;
  last_match_time: number;
  name: string;
  tag: string;
  logo_url: string;
};

const App: React.FC = () => {
  const [data, setData] = useState<TeamInfo[]>([]);

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
      ignore = true;
    };
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      {data &&
        data.map((team, index) => {
          return (
            <>
              <div style={{ backgroundColor: "lightgray" }}>
                <h3>{`${index + 1}: ${team.name}`}</h3>
              </div>
              <div style={{ backgroundColor: "grey" }}>
                <img src={team.logo_url} />
              </div>
            </>
          );
        })}
    </div>
  );
};

export default App;
