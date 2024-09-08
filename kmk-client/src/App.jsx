import './style/app.scss';

import { store, persistor }  from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './Router';

function App() {
	return (
  		<div className="app">
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Router/>
				</PersistGate>
			</Provider>
		</div>
	);
}

export default App;