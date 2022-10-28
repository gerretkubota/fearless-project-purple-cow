import './App.css';
import Counter from './Counter';

const KEY = '1ccb732e-b55a-4404-ad3f-0f99c02fe44e';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Project Purple Cow</h1>
      </header>
      <Counter apiKey={KEY} />
    </div>
  );
}

export default App;
