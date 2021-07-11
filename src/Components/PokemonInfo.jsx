/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import PokemonDetails from "./PokemonDetails";

const PokemonInfo = ({ match }) => {
	const [loading, setLoading] = useState(true);
	const [pokemonData, setPokemonData] = useState({});
	const extractData = (rawData) => {
		const { pokemonInfo, evolutionInfo } = rawData;
		let extractedData = {
			abilities: pokemonInfo.abilities,
			baseExperience: pokemonInfo.base_experience,
			id: pokemonInfo.id,
			height: pokemonInfo.height,
			name: pokemonInfo.name,
			sprites: pokemonInfo.sprites,
			weight: pokemonInfo.weight,
			evolutionInfo: evolutionInfo,
		};
		return extractedData;
	};

	useEffect(() => {
		async function getData() {
			const pokemonInfo = await (
				await fetch(
					`https://pokeapi.co/api/v2/pokemon/${match.params.pokemonIdentifier}`
				)
			).json();
			const speciesURL = pokemonInfo.species.url;
			const speciesInfo = await (await fetch(speciesURL)).json();
			const evolutionURL = speciesInfo.evolution_chain.url;
			const evolutionInfo = await (await fetch(evolutionURL)).json();
			const extractedData = extractData({
				pokemonInfo: pokemonInfo,
				evolutionInfo: evolutionInfo,
			});
			setPokemonData(extractedData);
			setLoading(false);
		}
		getData();
	}, [match.params.pokemonIdentifier]);

	return (
		<div>{loading ? <Loading /> : <PokemonDetails {...pokemonData} />}</div>
	);
};

export default PokemonInfo;
