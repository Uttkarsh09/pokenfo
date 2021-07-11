module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		fontFamily: {
			roboto: ["Roboto"],
			poppins: ["Poppins"],
			josefinSans: ["Josefin Sans"],
			alfaSlabOne: ["Alfa Slab One"],
			sigmarOne: ["Sigmar One"],
			righteous: ["Righteous"],
			paassionOne: ["Passion One"],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
