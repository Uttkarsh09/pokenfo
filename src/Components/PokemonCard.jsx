/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useHistory } from "react-router-dom";
import { pokemonType } from "../Modules/datamaps";

const extractTypes = (types) => {
	const typeNames = [];
	types.forEach((typeInfo) => {
		typeNames.push(typeInfo.type.name);
	});
	return typeNames;
};

const PokemonCard = ({ id, name, sprites, types, weight, height }) => {
	const history = useHistory();
	const typeNames = extractTypes(types);
	const pokeImage = sprites.other["dream_world"].front_default;

	return (
		<div
			className="
      relative m-3 pt-6 px-5 pb-3 cursor-pointer
      col-span-1 bg-gray-50 border-2 border-black rounded-2xl shadow-xl
      flex flex-col items-center
    "
			onClick={() => {
				history.push(`/poke-info/${id}`);
			}}
		>
			<span className="absolute left-3 top-1 font-bold text-gray-400">
				# {id}
			</span>
			<img
				style={{ height: "150px" }}
				className="
          border-black rounded-lg
          transition duration-700
        "
				src={pokeImage}
			/>
			<p id="name" className="font-bold font-poppins mt-2">
				{name.toUpperCase()}
			</p>

			<div id="type-div" className="text-center mt-1">
				<div className="flex flex-row justify-evenly">
					{typeNames.map((type, idx) => {
						return (
							<img
								src={pokemonType[type]}
								key={idx}
								className="h-10 m-1"
								title={type.substr(0, 1).toUpperCase() + type.substr(1)}
							/>
						);
					})}
				</div>
				<p id="type">TYPE</p>
			</div>

			<div className="flex mt-3">
				<div
					id="heights-div"
					className="
					flex flex-col flex-wrap items-center py-1 px-3 border-gray-400 border-r
          "
				>
					<h4>{parseInt(height) * 10} cm</h4>
					<p>HEIGHT</p>
				</div>
				<div
					id="weights-div"
					className="
					flex flex-col flex-wrap items-center py-1 px-3 
          "
				>
					<h4>{parseInt(weight) / 10} kg</h4>
					<p className="">WEIGHT</p>
				</div>
			</div>
		</div>
	);
};

export default PokemonCard;
