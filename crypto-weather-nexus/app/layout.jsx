// app/layout.jsx
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}