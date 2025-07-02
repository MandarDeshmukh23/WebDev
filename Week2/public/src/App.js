import { useState } from 'react';
import Youtube from './Pages/Home';
import Watchlater from './Pages/watch later';
import { Routes, Route } from 'react-router-dom';

function App() {

  const [watchLaterTitles, setWatchLaterTitles] = useState([]);

  const toggleWatchLater = (title) => {
    setWatchLaterTitles((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <main className='main-content'>
      <Routes>
        <Route path='/'
         element={<Youtube
          watchLaterTitles={watchLaterTitles}
          toggleWatchLater={toggleWatchLater}
          watchLaterCount={watchLaterTitles.length}
        />} />
        <Route path='/watchlater' element={<Watchlater
          watchLaterTitles={watchLaterTitles}
          toggleWatchLater={toggleWatchLater}
          watchLaterCount={watchLaterTitles.length}
        />} />
      </Routes>
    </main>
  );
}

export default App;
