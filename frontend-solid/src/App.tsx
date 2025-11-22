import { Router, Route } from '@solidjs/router';
import MainMenu from './pages/MainMenu';
import GameScreen from './pages/GameScreen';
import './App.css';

export default function App() {
  return (
    <Router>
      <Route path="/" component={MainMenu} />
      <Route path="/game" component={GameScreen} />
    </Router>
  );
}
