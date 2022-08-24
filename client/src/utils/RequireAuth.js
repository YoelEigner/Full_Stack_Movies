import { BrowserRouter as Router, Route } from "react-router-dom";
import login from "../main/Login";
import signup from "../main/NewUser";
import { createHashHistory } from "history";
import { useSelector } from "react-redux";
import Routing from './router';

const AuthRoute = () => {
  const history = createHashHistory();
  return (
    <div>
            <Router history={history}>
              <Route exact path="/" component={login} />
              <Route exact path="/signup" component={signup}/>
              <Route path="/protected" component={Routing} />
            </Router>

      
    </div>
  );
};

export default AuthRoute;
