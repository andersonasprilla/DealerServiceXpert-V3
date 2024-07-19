import { Outlet } from "react-router-dom";
import { useApi } from '../src/api/useApi'; 
import Hero from "./components/Hero/hero";
const App = () => {
  useApi(); // This will set up the interceptor with the correct navigate function

  return (
    <div>
      <Hero/>
      {/* <Outlet /> */}
    </div>
  );
};

export default App;