import './App.css';
import '../src/css/header.css'
import Header from './components/Header';
// import SportsData from './data/sports';
// import SportCards from './components/Sports';
import "../src/css/sportcard.css"
import "../src/css/competition.css"
// import InPlay from './components/InPlay';

import React from "react";
import {
  MarketType,
  getMarket,
  Locale,
  getSportsName
} from "@cloudbet/market-helper";
function getSport(sport, apiKey) {
  return fetch(`https://sports-api.cloudbet.com/pub/v2/odds/sports/${sport}`, {
    headers: {
      "X-Api-Key": apiKey,
      "cache-control": "max-age=600"
    }
  });
}
function getCompetition(competition, apiKey) {
  return fetch(
    `https://sports-api.cloudbet.com/pub/v2/odds/competitions/${competition}`,
    {
      headers: {
        "X-Api-Key": apiKey,
        "cache-control": "max-age=600"
      }
    }
  );
}
// const sports = ["basketball", "soccer", "tennis"];

const sports = [
  {
    name: "basketball",
    img: "./imgs/sports/basketball.svg"
  },
  {
    name: "soccer",
    img: "./imgs/sports/soccer.svg"
  },
  {
    name: "tennis",
    img: "./imgs/sports/tennis.svg"
  },
  {
    name: "american_football",
    img: "./imgs/sports/football.svg"
  },
  {
    name: "ice_hockey",
    img: "./imgs/sports/hockey.svg"
  },
  {
    name: "baseball",
    img: "./imgs/sports/baseball.svg"
  },
  {
    name: "esport_nba2k",
    img: "./imgs/sports/nba2k.svg"
  },
  {
    name: "esport_fifa",
    img: "./imgs/sports/fifa22.png"
  },
  {
    name: "league_of_legends",
    img: "./imgs/sports/lol.svg"
  },
  {
    name: "esport_valorant",
    img: "./imgs/sports/valorant.png"
  },
  
]



console.log('sports[0].name', sports[0].name)
const sportMarkets = {
  basketball: [MarketType.basketball_handicap],
  soccer: [MarketType.soccer_match_odds],
  tennis: [MarketType.tennis_winner],
  ice_hockey: [MarketType.ice_hockey_1x2],
  baseball: [MarketType.baseball_run_line],
  american_football: [MarketType.american_football_handicap],
  esport_nba2k: [MarketType.esport_nba2k_1x2],
  esport_fifa: [MarketType.esport_fifa_match_odds],
  league_of_legends: [MarketType.league_of_legends_winner],
  esport_valorant: [MarketType.esport_valorant_winner],
};
console.log('sportMarkets', sportMarkets)
export default function App() {
  const [apiKey] = React.useState('eyJhbGciOiJSUzI1NiIsImtpZCI6Img4LThRX1YwZnlUVHRPY2ZXUWFBNnV2bktjcnIyN1YzcURzQ2Z4bE44MGMiLCJ0eXAiOiJKV1QifQ.eyJhY2Nlc3NfdGllciI6ImFmZmlsaWF0ZSIsImV4cCI6MTk1MDYxOTkzNSwiaWF0IjoxNjM1MjU5OTM1LCJqdGkiOiIxYmQ2ZTAzMC0zZTk4LTRkOWEtYWE4Ni0zMDU0NjRiNmNjOGMiLCJzdWIiOiI1OTA1MDQ2Mi1iYTk4LTRiZDEtYTU2ZC00N2U0ZDAxYWNhNmMiLCJ0ZW5hbnQiOiJjbG91ZGJldCIsInV1aWQiOiI1OTA1MDQ2Mi1iYTk4LTRiZDEtYTU2ZC00N2U0ZDAxYWNhNmMifQ.Bjds2SEjImayK2RQc2siY_kF-I7hYuFA9IMEFzIaVE0a_n2KMUBqMwCyd-TJAoRL68b9yNmKC1tbBmjuW5BKkufaXj5l0UPUco9LiXrN6p0oALian7K1IlLaP8Z1Dg48OTKR7mH1c7qDuMteErCSeb-D-5g-b8Ebk9zd5IjMovMJJBpCGpOHnX7seoiR866SIOcw3ynCpPiEv0bsR-ViSjQ1YrucOWAKsOD09stqpa0McTu-e6cWepU7kWLkzuQWKFJbeSes0rF-VX5yfo3gSeDfdkyWaYfuGt_dQXzZDWhT0rwcI1Ro2vTcWop8vtB5OLZvGSDSDwEgXDIvGxX7FQ');
  const [sport, setSport] = React.useState(sports[0].name);
  const [loading, setLoading] = React.useState(false);
  const [competitions, setCompetitions] = React.useState(['']);
  React.useEffect(() => {
    if (!sport || !apiKey) {
      return;
    }
    setLoading(true);
    getSport(sport, apiKey)
      .then((response) => {
        setLoading(false);
        return response.json();
      })
      .then((body) => {
        setCompetitions(body.categories.flatMap((c) => c.competitions));
      });
  }, [apiKey, sport]);

  return (
    <div className="App">
    
        <Header />
        <div class="spacer">
            &nbsp;
        </div>
        {/* Sportcards section */}
        <div className="app-content">
          <div className="sportcards-section">
            {sports.map((s) => (
        
                <button className='sportcard-container' value={s.name} onClick={(e) => setSport(e.target.value)}>
                  <img className="sport-image" src={s.img} alt=""/>
                  {getSportsName(s.name, Locale.en)}
                </button>
        
              ))}
          </div>
      
        {/* Competitions aka Leagues list */}
        <div className="competition-section">
          {loading ? (
            <Loading />
          ) : (
            competitions.map((c) => (

              
              <div>
                
                <Competition
                  competition={c}
                  apiKey={apiKey}
                  key={c.key}
                  sportKey={sport}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Competition({ competition, apiKey, sportKey }) {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const loadEvents = (key) => {
    setExpanded((e) => !e);
    if (events.length || loading) {
      return;
    }
    setLoading(true);
    getCompetition(key, apiKey)
      .then((response) => response.json())
      .then((body) => {
        setEvents(body.events);
        setLoading(false);
      });
  };
  return (
    <div className="competition">
      <div
        className="competition-title"
        onClick={() => loadEvents(competition.key)}
      >
        {competition.name}
      </div>
      {expanded && (
        <div className="event-card-section">
          {loading ? (
            <Loading />
          ) : (
            events.map((e) => (
              <div className="event-card">
                <Event event={e} key={e.id} sportKey={sportKey} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
function Event({ event, sportKey }) {
  const eventMarkets = React.useMemo(() => {
    const [markets] = getMarket(event, sportMarkets[sportKey][0]);

    return markets;
  }, [event, sportKey]);
  if (!eventMarkets || !eventMarkets.length) {
    return null;
  }
  return (
    <div>
      {/* <div className="event-title">{event.name}</div> */}
      {eventMarkets.map((m) => {
        const line = m.lines[0];
        console.log("line", line)
        if (!line) {
          return null;
        }
        return (
          <div className="selections">
            {line.map((outcome) => (
              <div className="selection">
                <div className="outcome-name">{outcome.name}</div> <br />
                <div className="odds">
                  <div>{outcome.variables.handicap}</div>
                  <div className="probability">{outcome.back.probability}</div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Loading() {
  return <div className="loading">Loading...</div>;
}







// import './App.css';
// import '../src/css/header.css'
// import Header from './components/Header';
// // import SportsData from './data/sports';
// import SportCards from './components/Sports';
// import "../src/css/sportcard.css"
// // import InPlay from './components/InPlay';


// function App() {

//   return (
//     <div className="App">
//       < Header />
//       < SportCards />
//     </div>
//   );
// }

// export default App;
