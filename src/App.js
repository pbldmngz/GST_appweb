import './style/App.css';
import TarjetasVista from './TarjetasVista';
import MongoCon from './MongoCon.js';
import React, { Component } from 'react';

class App extends Component {
	state = {
		tarjetas: [
			{
				id: 0,
				titulo: "Morado",
				alerta: "!!",
				auditor: "Julio Iglesias",
				fecha: "20 de Marzo"
			},
			{
				id: 1,
				titulo: "Amarillo",
				alerta: "PW",
				auditor: "Peña Nieto",
				fecha: "5 de Noviembre"
			},
			{
				id: 2,
				titulo: "Rojo",
				alerta: "PW",
				auditor: "Red John",
				fecha: "6 de Junio"
			}, 
			{
				id: 6,
				titulo: "Morado",
				alerta: "!!",
				auditor: "Julio Iglesias",
				fecha: "20 de Marzo"
			},
			{
				id: 7,
				titulo: "Amarillo",
				alerta: "PW",
				auditor: "Peña Nieto",
				fecha: "5 de Noviembre"
			},
			{
				id: 8,
				titulo: "Rojo",
				alerta: "PW",
				auditor: "Red John",
				fecha: "6 de Junio"
			},
			{
				id: 3,
				area: "Area 51"
			},
			{
				id: 4,
				area: "LAN"
			},
			{
				id: 5,
				area: "LAN PARTY"
			}
		]
	}

	// mongoCall = () => {
	// 	const MongoClient = require('mongodb').MongoClient;
	// 	const uri = "mongodb+srv://gst-app:twwlLQqN2R9arQZA@gst-app.abjqw.mongodb.net/gst-web-app?retryWrites=true&w=majority";
	// 	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	// 	const collection = client.db("gst-web-app").collection("areas");
	// 	var arr = ["1", "2"];
	// 	var test;
	// 	return new Promise(function (resolve, reject) {
	// 		collection.find().toArray(arr = (err, docs) => {
	// 			if (err) {
	// 				return reject(err);
	// 			}
	// 			return docs;
	// 		}
	// 		)})
	// 	// client.connect(err => {
			
	// 	// 	collection.find().toArray(arr = (err, docs) => {
	// 	// 		if (err) throw err;
	// 	// 		console.log(docs);
	// 	// 		test = docs;
	// 	// 		collection.close();
	// 	// 	})
	// 	// 	// perform actions on the collection object
	// 	// 	client.close();
	// 	// });
	// }

	render() {
		return (
			<div className="App">
				<TarjetasVista tarjetas={this.state.tarjetas} />
				{/* <div>{this.mongoCall}</div> */}
				<MongoCon/>
			</div>
		);
	}
}

export default App;
