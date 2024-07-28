import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Admin } from './pages/admin/Admin';
import { Results } from './pages/results/Results';
import { Header } from './components/Header/Header';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { About } from './pages/about/About';

function App() {
  return (
    <div className='app'>
      <Provider store={store}>
        <Router>
          <Header/>
          <Routes>
            <Route exact path='/' Component={Home}/>
            <Route exact path='/About' Component={About}/>
            <Route exact path='/results' Component={Results}/>
            <Route exact path='/admin' Component={Admin}/>
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
