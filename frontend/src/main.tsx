
import './utils/axiosConfig';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorCatching/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
