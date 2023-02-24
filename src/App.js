import './App.scss';
import { NavBar } from './Components/NavBar';
import { VideoUpload } from './Components/VideoUpload/VideoUpload';

function App() {
  return (
    <div className="App">
      <NavBar />
      <VideoUpload />
    </div>
  );
}

export default App;
