import SearchBar from "./SearchBar";
import PokemonArea from "./PokemonArea";

function Home() {
	return (
		<div>
			<img
				className="
					mx-auto my-6 px-5 object-contain
				"
				src="/pokenfo.png"
				alt=""
			/>
			<div className="text-center">
				<SearchBar />
			</div>
			<PokemonArea />
		</div>
	);
}

export default Home;
