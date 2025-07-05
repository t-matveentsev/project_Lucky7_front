import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { Toaster } from 'react-hot-toast';
import { setAuthHeader } from './redux/auth/operation';
import './index.css';
import App from './components/App';
import { PersistGate } from 'redux-persist/integration/react';

const token = localStorage.getItem('token');
if (token) {
  setAuthHeader(token); // ← обовʼязково
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
  </StrictMode>
);
