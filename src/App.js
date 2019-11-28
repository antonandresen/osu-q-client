import React from 'react';

import Header from './components/Header';

const App = props => {
  return (
    <div>
      <Header />
      <div className='container'>{props.children}</div>
    </div>
  );
};

export default App;
