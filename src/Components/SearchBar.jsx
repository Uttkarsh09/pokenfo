import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
	const history = useHistory();
	const searchTextRef = useRef();

	const searchPokemon = () => {
		const searchedPokemon = searchTextRef.current.value.toLowerCase().trim();
		if (searchedPokemon) {
			history.push(`/poke-info/${searchedPokemon}`);
		} else {
			// Add a tailwind alert component here.
			console.log("Enter a pokemon name");
		}
	};

	const searchRandomPokemon = () => {
		const randomNum = Math.floor(Math.random() * (898 - 1) + 1);
		console.log(randomNum);
		history.push(`/poke-info/${randomNum}`);
	};

	return (
		<div className="flex flex-wrap justify-center items-center">
			<input
				className="border-2 border-black rounded px-1 py-1 m-2"
				type="text"
				ref={searchTextRef}
				placeholder="Pokemon id/name"
			/>
			<div>
				<button
					className="m-1 bg-green-500 rounded px-5 py-1 font-bold"
					onClick={() => searchPokemon()}
				>
					SEARCH
				</button>
				<button
					className="m-1 bg-blue-500 rounded px-5 py-1 font-bold"
					onClick={() => searchRandomPokemon()}
				>
					RANDOM
				</button>
			</div>
		</div>
	);
};

export default SearchBar;
