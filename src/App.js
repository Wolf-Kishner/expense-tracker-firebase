import {BrowserRouter as Router,Route , Routes} from "react-router-dom";
import {Auth} from "./pages/auth/index"
import {ExpenseTracker} from "./pages/expenses/index"

//Base URL for a website is "/" We are setting up the paths I want to Display the  Authentication page by default on Startup
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="expense-tracker" element={<ExpenseTracker />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
