import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './components/App/App';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.Suspense fallback="loading...">
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.Suspense>,
    document.getElementById('root'),
);
