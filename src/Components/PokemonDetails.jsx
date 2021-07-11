/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import Loading from "./Loading";

const getPokemonDetails = async (pokemonName) => {
	const rawInfo = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemonName}`
	);
	const jsonInfo = await rawInfo.json();
	return jsonInfo;
};

const PokemonDetails = ({
	abilities,
	baseExperience,
	id,
	height,
	name,
	sprites,
	weight,
	evolutionInfo,
}) => {
	const history = useHistory();
	const [evolutionChain, setEvolutionChain] = useState([]);
	const [loading, setLoading] = useState(true);
	let chain = evolutionInfo.chain;

	useEffect(() => {
		async function getInfo() {
			const evolutionStages = [[await getPokemonDetails(chain.species.name)]];

			chain = chain.evolves_to;
			await Promise.all(
				chain.map(async (evolution) => {
					return getPokemonDetails(evolution.species.name);
				})
			).then((evoInfo) => {
				evolutionStages.push(evoInfo);
			});
			try {
				chain = chain[0].evolves_to;
				await Promise.all(
					chain.map(async (evolution) => {
						return getPokemonDetails(evolution.species.name);
					})
				).then((evoInfo) => {
					evolutionStages.push(evoInfo);
				});
			} catch (e) {}

			setEvolutionChain(evolutionStages);
			setLoading(false);
		}
		getInfo();
	}, []);

	// Warning this is a miserable logic please refrain your self from reading the below lines
	// Please consult an expert before doing the thing mentioned below, many have tried and ended up in a bad place
	// You may get any of the following conditions after reading this :-
	// Headache, Heart Attack, Sucidal Thoughts, Thoughts of breaking up with your partner and becoming a priest for mental and spritual stability
	// You may ask what is the purpouse of life and may never find it
	const nextStageExists = [];
	try {
		for (let i = 1; i < evolutionChain.length; i++) {
			if (evolutionChain[i].length > 0) nextStageExists.push(true);
			else nextStageExists.push(false);
		}
	} catch (error) {}

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div>
					<img
						className="absolute w-7 left-5 top-5 sm:w-11 sm:top-5 sm:left-10 cursor-pointer"
						src="/back.png"
						alt=""
						onClick={() => {
							history.goBack();
						}}
					/>
					<img
						src="/pokenfo.png"
						className="h-12 object-scale-down mx-auto border-black cursor-pointer"
						alt=""
						onClick={() => {
							history.push("/");
						}}
					/>
					<div className="m-2 border-red-400 flex justify-evenly">
						<div>
							<span className="border-green-600 font-paassionOne text-5xl">
								{name.toUpperCase()}
							</span>
							<span className="text-gray-500 font-alfaSlabOne text-xl font-">
								{" "}
								#{id}
							</span>
						</div>
					</div>

					<div className="flex flex-wrap flex-col items-center my-8">
						<span className="characteristic bold">DETAILS</span>
						<div className="rounded-xl border-2 border-black flex justify-center ml-2 mr-1 sm:mx-auto md-5">
							<img
								className="w-60 border-r-2 border-black p-5"
								src={sprites.other["dream_world"].front_default}
								alt=""
							/>
							<div className="py-5 px-5 sm:px-10 border-red-500 inline-block">
								<div>
									<span className="characteristic">Height: </span>
									<span>{height * 10} cm</span>
								</div>
								<div>
									<span className="characteristic">Weight: </span>
									<span>{parseInt(weight) / 10} kg</span>
								</div>
								<div>
									<span className="characteristic">Base Experience: </span>
									<span>{baseExperience}</span>
								</div>
								<div>
									<span className="characteristic">Abilities</span>
									<ul className="list-disc">
										{abilities.map((ability, idx) => {
											return (
												<li key={idx} className="relative left-8">
													{ability.ability.name}
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-wrap flex-col items-center my-8">
						<span className="characteristic bold">EVOLUTION</span>
						<div
							id="evolution"
							className="flex flex-wrap flex-col sm:flex-row items-center justify-center border-black w-full"
						>
							{evolutionChain.map((evolutionStage, id_1) => {
								return evolutionStage.map((evolution, id_2) => {
									return (
										<Fragment key={id_2}>
											<PokemonCard {...evolution} />
											{nextStageExists[id_1] &&
												id_2 + 1 === evolutionStage.length && (
													<img
														src="/3d-forward-arrow.png"
														className="w-10 object-scale-down transform rotate-90 sm:rotate-0"
														alt=""
														hidden={evolutionChain[2].length === 0}
													/>
												)}
										</Fragment>
									);
								});
							})}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default PokemonDetails;
