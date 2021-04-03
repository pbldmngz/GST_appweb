import './style/App.css';
import TarjetasVista from './views/TarjetasVista';
import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
	state = {
		posts : []
	}

	changeView() {
		
	}

	postParams = {
		collection: "auditorias",
		filter: {}
	}

	componentDidMount() {
		axios.post('http://127.0.0.1:5000/', this.postParams)
			.then(res => {
				console.log(res.data);
				this.setState({
					posts: res.data
				});
			})
	}

	render() {
		return (
			<div className="App">
				<TarjetasVista tarjetas={this.state.posts} />
			</div>
		);
	}
}

export default App;
