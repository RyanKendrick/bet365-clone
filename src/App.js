import './App.css';
import '../src/css/header.css'
import Header from './components/Header';
// import SportsData from './data/sports';
import SportCards from './components/Sports';
import "../src/css/sportcard.css"
// import InPlay from './components/InPlay';


function App() {

  
  return (
    <div className="App">
      < Header />
      < SportCards />
    </div>
  );
}

export default App;
