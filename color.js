var Color = {
	RED : [1, 0, 0],
	GREEN : [0, 1, 0],
	BLUE : [0, 0, 1],
	YELLOW : [1, 1, 0],
	CYAN : [0, 1, 1],
	MAGENTA : [1, 0, 1],
	CLEAR : [1, 1, 1],
	WHITE : [1, 1, 1],
	BLACK : [0, 0, 0],
	
	// These grays are useful for fine-tuning lighting color values
	// and for other areas where subtle variations of grays are needed.
	// PERCENTAGE GRAYS:
	GRAY05 : [1*0.05, 1*0.05, 1*0.05],
	Gray10 : [1*0.10, 1*0.10, 1*0.10],
	Gray15 : [1*0.15, 1*0.15, 1*0.15],
	Gray20 : [1*0.20, 1*0.20, 1*0.20],
	Gray25 : [1*0.25, 1*0.25, 1*0.25],
	Gray30 : [1*0.30, 1*0.30, 1*0.30],
	Gray35 : [1*0.35, 1*0.35, 1*0.35],
	Gray40 : [1*0.40, 1*0.40, 1*0.40],
	Gray45 : [1*0.45, 1*0.45, 1*0.45],
	Gray50 : [1*0.50, 1*0.50, 1*0.50],
	Gray55 : [1*0.55, 1*0.55, 1*0.55],
	Gray60 : [1*0.60, 1*0.60, 1*0.60],
	Gray65 : [1*0.65, 1*0.65, 1*0.65],
	Gray70 : [1*0.70, 1*0.70, 1*0.70],
	Gray75 : [1*0.75, 1*0.75, 1*0.75],
	Gray80 : [1*0.80, 1*0.80, 1*0.80],
	Gray85 : [1*0.85, 1*0.85, 1*0.85],
	Gray90 : [1*0.90, 1*0.90, 1*0.90],
	Gray95 : [1*0.95, 1*0.95, 1*0.95],

	// OTHER GRAYS
	DIMGRAY : [0.329412, 0.329412, 0.329412],
	DIMGREY : [0.329412, 0.329412, 0.329412],
	GRAY : [0.752941, 0.752941, 0.752941],
	GREY : [0.752941, 0.752941, 0.752941],
	LIGHTGRAY : [0.658824, 0.658824, 0.658824],
	LIGHTGREY : [0.658824, 0.658824, 0.658824],
	VLIGHTGRAY : [0.80, 0.80, 0.80],
	VLIGHTGREY : [0.80, 0.80, 0.80],

	AQUAMARINE : [0.439216, 0.858824, 0.576471],
	BLUEVIOLET : [0.62352, 0.372549, 0.623529],
	BROWN : [0.647059, 0.164706, 0.164706],
	CADETBLUE : [0.372549, 0.623529, 0.623529],
	CORAL : [1.0, 0.498039, 0.0],
	CORNFLOWERBLUE : [0.258824, 0.258824, 0.435294],
	DARKGREEN : [0.184314, 0.309804, 0.184314],
	DARKOLIVEGREEN : [0.309804, 0.309804, 0.184314],
	DARKORCHID : [0.6, 0.196078, 0.8],
	DARKSLATEBLUE : [0.419608, 0.137255, 0.556863],
	DARKSLATEGRAY : [0.184314, 0.309804, 0.309804],
	DARKSLATEGREY : [0.184314, 0.309804, 0.309804],
	DARKTURQUOISE : [0.439216, 0.576471, 0.858824],
	FIREBRICK : [0.556863, 0.137255, 0.137255],
	FORESTGREEN : [0.137255, 0.556863, 0.137255],
	GOLD : [0.8, 0.498039, 0.196078],
	GOLDENROD : [0.858824, 0.858824, 0.439216],
	GREENYELLOW : [0.576471, 0.858824, 0.439216],
	INDIANRED : [0.309804, 0.184314, 0.184314],
	KHAKI : [0.623529, 0.623529, 0.372549],
	LIGHTBLUE : [0.74902, 0.847059, 0.847059],
	LIGHTSTEELBLUE : [0.560784, 0.560784, 0.737255],
	LIMEGREEN : [0.196078, 0.8, 0.196078],
	MAROON : [0.556863, 0.137255, 0.419608],
	MEDIUMAQUAMARINE : [0.196078, 0.8, 0.6],
	MEDIUMBLUE : [0.196078, 0.196078, 0.8],
	MEDIUMFORESTGREEN : [0.419608, 0.556863, 0.137255],
	MEDIUMGOLDENROD : [0.917647, 0.917647, 0.678431],
	MEDIUMORCHID : [0.576471, 0.439216, 0.858824],
	MEDIUMSEAGREEN : [0.258824, 0.435294, 0.258824],
	MEDIUMSLATEBLUE : [0.498039, 1.0],
	MEDIUMSPRINGGREEN : [0.498039, 1.0],
	MEDIUMTURQUOISE : [0.439216, 0.858824, 0.858824],
	MEDIUMVIOLETRED : [0.858824, 0.439216, 0.576471],
	MIDNIGHTBLUE : [0.184314, 0.184314, 0.309804],
	NAVY : [0.137255, 0.137255, 0.556863],
	NAVYBLUE : [0.137255, 0.137255, 0.556863],
	ORANGE : [1, 0.5, 0.0],
	ORANGERED : [1.0, 0.25],
	ORCHID : [0.858824, 0.439216, 0.858824],
	PALEGREEN : [0.560784, 0.737255, 0.560784],
	PINK : [0.737255, 0.560784, 0.560784],
	PLUM : [0.917647, 0.678431, 0.917647],
	SALMON : [0.435294, 0.258824, 0.258824],
	SEAGREEN : [0.137255, 0.556863, 0.419608],
	SIENNA : [0.556863, 0.419608, 0.137255],
	SKYBLUE : [0.196078, 0.6, 0.8],
	SLATEBLUE : [, 0.498039, 1.0],
	SPRINGGREEN : [, 1.0, 0.498039],
	STEELBLUE : [0.137255, 0.419608, 0.556863],
	TAN : [0.858824, 0.576471, 0.439216],
	THISTLE : [0.847059, 0.74902, 0.847059],
	TURQUOISE : [0.678431, 0.917647, 0.917647],
	VIOLET : [0.309804, 0.184314, 0.309804],
	VIOLETRED : [0.8, 0.196078, 0.6],
	WHEAT : [0.847059, 0.847059, 0.74902],
	YELLOWGREEN : [0.6, 0.8, 0.196078],
	SUMMERSKY : [0.22, 0.69, 0.87],
	RICHBLUE : [0.35, 0.35, 0.67],
	BRASS : [0.71, 0.65, 0.26],
	COPPER : [0.72, 0.45, 0.20],
	BRONZE : [0.55, 0.47, 0.14],
	BRONZE2 : [0.65, 0.49, 0.24],
	SILVER : [0.90, 0.91, 0.98],
	BRIGHTGOLD : [0.85, 0.85, 0.10],
	OLDGOLD : [0.81, 0.71, 0.23],
	FELDSPAR : [0.82, 0.57, 0.46],
	QUARTZ : [0.85, 0.85, 0.95],
	NEONPINK : [1.00, 0.43, 0.78],
	DARKPURPLE : [0.53, 0.12, 0.47],
	NEONBLUE : [0.30, 0.30, 1.00],
	COOLCOPPER : [0.85, 0.53, 0.10],
	MANDARINORANGE : [0.89, 0.47, 0.20],
	LIGHTWOOD : [0.91, 0.76, 0.65],
	MEDIUMWOOD : [0.65, 0.50, 0.39],
	DARKWOOD : [0.52, 0.37, 0.26],
	SPICYPINK : [1.00, 0.11, 0.68],
	SEMISWEETCHOC : [0.42, 0.26, 0.15],
	BAKERSCHOC : [0.36, 0.20, 0.09],
	FLESH : [0.96, 0.80, 0.69],
	NEWTAN : [0.92, 0.78, 0.62],
	NEWMIDNIGHTBLUE : [0.00, 0.00, 0.61],
	VERYDARKBROWN : [0.35, 0.16, 0.14],
	DARKBROWN : [0.36, 0.25, 0.20],
	DARKTAN : [0.59, 0.41, 0.31],
	GREENCOPPER : [0.32, 0.49, 0.46],
	DKGREENCOPPER : [0.29, 0.46, 0.43],
	DUSTYROSE : [0.52, 0.39, 0.39],
	HUNTERSGREEN : [0.13, 0.37, 0.31],
	SCARLET : [0.55, 0.09, 0.09],

	MED_PURPLE : [0.73, 0.16, 0.96],
	LIGHT_PURPLE : [0.87, 0.58, 0.98],
	VERY_LIGHT_PURPLE : [0.94, 0.81, 0.99],
	
	RANDOM : function(){
		return [Math.random(), Math.random(), Math.random()];
	}
}