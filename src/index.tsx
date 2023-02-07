import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ModalProvider } from 'styled-react-modal';

import reportWebVitals from './reportWebVitals';
import Router from './Router';
import { store } from './store';

ReactDOM.render(
	//<React.StrictMode>
	<HelmetProvider>
		<ModalProvider>
			<Provider store={store}>
				<Router />
				<ToastContainer closeOnClick={false} toastClassName={() => 'bg-white mb-2 shadow-lg flex items-start justify-start rounded-lg'} />
			</Provider>
		</ModalProvider>
	</HelmetProvider>,
	//</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
