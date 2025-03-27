import { BooksProvider } from './books';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

function App() {
  return (
    <BooksProvider>
      <RouterProvider router={router} />
    </BooksProvider>
  );
}

export default App;