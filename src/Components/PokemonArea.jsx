/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import PokemonCard from "./PokemonCard";
import { pokemonType } from "../Modules/datamaps";

const PokemonArea = () => {
	const [pokeList, setPokeList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [moreLoading, setMoreLoading] = useState(false);
	const [pokeCount, setPokeCount] = useState(1);

	const getPokeList = async () => {
		const promiseBuffer = [];
		const maxCount = pokeCount + 20 < 898 ? pokeCount + 20 : 899;

		for (let i = pokeCount; i < maxCount; i++) {
			const rawPokeInfo = fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`).then(
				(res) => {
					return res.json();
				}
			);
			promiseBuffer.push(rawPokeInfo);
		}

		await Promise.all(promiseBuffer)
			.then((data) => {
				setPokeList((last) => [...last, ...data]);
				if (setLoading) setLoading(false);
				if (setMoreLoading) setMoreLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});

		setPokeCount(maxCount);
	};

	const generateMore = async () => {
		setMoreLoading(true);
		getPokeList();
	};

	useEffect(() => {
		setLoading(true);
		getPokeList();
	}, []);

	return (
		<>
			<div className="md:hidden flex flex-wrap justify-center mx-1 mt-5">
				{Object.keys(pokemonType).map((type, id) => {
					return (
						<div
							className="border-black flex flex-wrap flex-col items-center py-1 px-2"
							key={id}
						>
							<img className="w-9" src={pokemonType[type]} alt="" />
							<p className="font-bold">{type.toUpperCase()}</p>
						</div>
					);
				})}
			</div>
			{loading ? (
				<Loading />
			) : (
				<div
					className="
            flex flex-wrap justify-center m-3
          "
				>
					{pokeList.map((pokeInfo) => {
						const { id, name, sprites, weight, height, types } = pokeInfo;

						return (
							<PokemonCard
								key={id}
								id={id}
								name={name}
								sprites={sprites}
								types={types}
								weight={weight}
								height={height}
							/>
						);
					})}
				</div>
			)}

			{moreLoading ? (
				<Loading />
			) : (
				<div className="text-center m-2">
					<button
						className="bg-red-400 text-white font-bold p-3 rounded-xl"
						onClick={() => generateMore()}
					>
						LOAD MORE
					</button>
				</div>
			)}
		</>
	);
};

export default PokemonArea;
