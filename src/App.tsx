import React from 'react';
import './App.scss';
import DrawCanvas from './components/DrawCanvas';
import ThreeAndTrack from './components/ThreeAndTrack';
import ThreeComp from './components/ThreeComp';

function App() {
  return (
    <div className={'App'}>
      {/* <DrawCanvas /> */}
      {/* <ThreeComp /> */}
      <ThreeAndTrack />
    </div>
  );
}

export default App;
