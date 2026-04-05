import './style/app.scss';

import { store, persistor }  from './store';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './Router';
import { useEffect } from 'react';
import { loadNotifications } from './notification/notification';

function AppContent() {
	const dispatch = useDispatch();
	
	useEffect(() => {
    	dispatch(loadNotifications());

    const interval = setInterval(() => {
      dispatch(loadNotifications());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return <Router />;
}

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContent />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;