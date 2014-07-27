game.resources = [

	/**
	 * Graphics
	 */
	 // tilesets
     {name: "town_forest_tiles",  type:"image", src: "data/img/map/town_forest_tiles.png"},
     // metatiles
     {name: "metatiles32x32",  type:"image", src: "data/img/map/metatiles32x32.png"},
     // sprites
     {name: "hero", type: "image", src: "data/img/sprite/hero.png"},
     {name: "zombie", type: "image", src: "data/img/sprite/zombie.png"},

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/**
	 * Maps
 	 */
 	 {name: "area01", type: "tmx", src: "data/map/area01.tmx"},

	/**
	 * Background music
	 */
    {name: "dst-beyondtheseforests", type: "audio", src: "data/bgm/"},


	/**
	 * Sound effects
	 */
	 {name: "zombie1", type: "audio", src: "data/sfx/"},
	 {name: "zombie2", type: "audio", src: "data/sfx/"},
	 {name: "zombie3", type: "audio", src: "data/sfx/"}
];
