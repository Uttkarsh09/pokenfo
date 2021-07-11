const path = require("path");

const pathToTypeIcons = path.join("/pokemon-data", "type-icons");
const pokemonType = {
	bug: path.join(pathToTypeIcons, "bug.png"),
	dark: path.join(pathToTypeIcons, "dark.png"),
	dragon: path.join(pathToTypeIcons, "dragon.png"),
	electric: path.join(pathToTypeIcons, "electric.png"),
	fairy: path.join(pathToTypeIcons, "fairy.png"),
	fighting: path.join(pathToTypeIcons, "fighting.png"),
	fire: path.join(pathToTypeIcons, "fire.png"),
	flying: path.join(pathToTypeIcons, "flying.png"),
	ghost: path.join(pathToTypeIcons, "ghost.png"),
	grass: path.join(pathToTypeIcons, "grass.png"),
	ground: path.join(pathToTypeIcons, "ground.png"),
	ice: path.join(pathToTypeIcons, "ice.png"),
	normal: path.join(pathToTypeIcons, "normal.png"),
	poison: path.join(pathToTypeIcons, "poison.png"),
	psychic: path.join(pathToTypeIcons, "psychic.png"),
	rock: path.join(pathToTypeIcons, "rock.png"),
	steel: path.join(pathToTypeIcons, "steel.png"),
	water: path.join(pathToTypeIcons, "water.png"),
};

export { pokemonType };
