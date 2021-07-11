import React from "react";
import ReactDOM from "react-dom";
import Home from "./Components/Home";
import "./index.css";
import PokemonInfo from "./Components/PokemonInfo";
import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route
					exact
					path="/poke-info/:pokemonIdentifier"
					component={PokemonInfo}
				/>
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
