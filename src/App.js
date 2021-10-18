import './App.css';
import '../src/css/header.css'
import Header from './components/Header';
import SportsData from './data/sports';
import SportCard from './components/Sports';
import "../src/css/sportcard.css"


function App() {


  return (
    <div className="App">
      < Header />
      <div className="sports-container">
        {SportsData?.map(({img, name}) => (
          <SportCard
            key={img}
            img={img}
            name={name} />
        ))}
      </div>
    </div>
  );
}

export default App;
