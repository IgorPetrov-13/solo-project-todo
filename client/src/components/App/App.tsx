import React, { useState } from 'react';

import './App.css';
import Tasks from '../Tasks/Tasks';

function App(): JSX.Element {
  return (
    <div className="App">
      <Tasks />
    </div>
  );
}

export default App;
