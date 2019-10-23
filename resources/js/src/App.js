import React from 'react';
import ReactDOM from 'react-dom';
//components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
      <div>
        <Header />

        <Footer />
      </div>
  );
}


export default App;

if (document.getElementById('root')) {
  console.log('weno');
  
  ReactDOM.render(<App />, document.getElementById('root'));
}