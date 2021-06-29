import React from 'react';
import Login from './component/login';
import Display from "./component/Display"
import Edit from "./component/Edit";
import 'bootstrap/dist/css/bootstrap.css';
import User from "./component/User";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route exact path='/' component={Login} />
					<Route exact path='/dis' component={Display} />
					 <Route exact path="/edit/:id" component={Edit} />	
			     <Route path="/user/:id" component={User} />
				</Switch>        
			</Router>
		</div>
	);
}

export default App;
