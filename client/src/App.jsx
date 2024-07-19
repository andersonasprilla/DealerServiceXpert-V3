import { Outlet } from "react-router-dom";
import { useApi } from '../src/api/useApi'; 
const App = () => {
  useApi(); // This will set up the interceptor with the correct navigate function

  return (
    <div>    
      <Outlet />
    </div>
  );
};

export default App;