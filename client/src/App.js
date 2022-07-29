import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import LandingPage from './components/Landing Page/LandingPage'
import Home from './components/Home/Home'
import Details from './components/Details/Details';
import CreateDog from './components/Created dog/CreateDog';
import NavBar from './components/NavBar/NavBar';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <NavBar path='/'component={LandingPage}/>
          <Route exact path='/' component={LandingPage}/>
          <Route  exact path='/home' component={Home}/>
          <Route exact path='/dog' component={CreateDog}/>
          <Route  exact path='/home/:id' component={Details}/>
          <Route  exact path='/about' component={About}/>
          <Route  exact path='/contact' component={Contact}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
