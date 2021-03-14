import './App.css';
import SearchBar from './components/SearchBar';
import LshGraph from './components/LshGraph';
function App() {
    return (
        <div style={{display:'flex', justifyContent: 'center', alignItems:'baseline'}}>
        <SearchBar/>
        <LshGraph/>
        </div>
    );
}

export default App;
