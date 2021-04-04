import './style/App.css';
import React, { Component } from 'react';
import axios from 'axios'
import Navbar from './components/Navbar'
import AreasVista from './views/AreasVista'
import AuditoriasVista from './views/AuditoriasVista'
import { Route, BrowserRouter } from 'react-router-dom'

class App extends Component {

	state = {
		posts : [
			{
				area: "DummyObject",
				_id: "1"
			}
		],
		params: {
			collection: "areas",
			filter: {}
		},
		old_params: {} //Planeo usar esto para darle funcionalidad al return
	}

	//Usa otra función para actualizar el componente que quieres
	componentDidMount = () => {
		// console.log("before.cdm.state.params: ", this.state.params)
		// console.log("before.cdm.state.posts: ", this.state.posts)
		axios.post('http://127.0.0.1:5000/', this.state.params)
			.then(res => {
				console.log("cdm.res.data", res.data);
				this.setState({
					posts: res.data
				});
				console.log("then.state.params: ", this.state.params)
				// console.log("then.state.posts: ", this.state.posts)
			})
		// console.log("after.cdm.state.params: ", this.state.params)
		// console.log("after.cdm.state.posts: ", this.state.posts)
	}

	changeParams = (params) => {
		let change = new Promise((resolve, reject) => {
			this.setState({
				params: params
			})
			resolve("OK200");
		})
		change.then(res => {
			axios.post('http://127.0.0.1:5000/', this.state.params)
				.then(res => {
					console.log("cdm.res.data", res.data);
					this.setState({
						posts: res.data
					});
					console.log("then.state.params: ", this.state.params)
					// console.log("then.state.posts: ", this.state.posts)
				})

			console.log("changeParams", params)
		})
		

		//componentDidMount()
		//this.changeView()
	}

	// componentDidUpdate(prevProps) {
	// 	// Uso tipico (no olvides de comparar las props):
	// 	if (this.state.posts !== prevProps.state.posts) {
	// 		this.fetchData(this.state.posts);
	// 	}
	// }

	// componentWillReceiveProps(nextProps) {
	// 	console.log('componentWillReceiveProps', nextProps);
	// 	if (this.props !== nextProps) {
	// 		this.setState(nextProps);
	// 	}
	// }

	routes = [
		{
			path: "/auditorias",
			component: AuditoriasVista,
			changeParams: this.changeParams,
			data: this.state.posts
		},
		{
			path: "/areas",
			component: AreasVista,
			changeParams: this.changeParams,
			data: this.state.posts
		},
		{
			path: "/",
			component: AreasVista,
			changeParams: this.changeParams,
			data: this.state.posts
		}
	]

	defaultFilter = {
		collection: "areas",
		filter: {}
	}

	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar defaultFilter={this.defaultFilter} changeParams={this.changeParams}/>
					{/* <Route exact path='/' component={AreasVista} /> */}
					{this.routes.map(({path, component: C, changeParams}) => (
						<Route
							exact path={path}
							render={
								(props) => <C {...props} 
								changeView={this.changeView} 
								changeParams={this.changeParams} 
								posts={this.state.posts} />
							}
						/>
					))}
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
