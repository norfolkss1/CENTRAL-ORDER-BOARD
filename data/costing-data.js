/**
 * COSTING SEED DATA
 * Ingredient-level cost breakdown imported from costing.xlsx for the
 * dishes that appear in that file. Costs are per the unit shown (mostly
 * AED per gram/ml/each), matching the source spreadsheet exactly.
 * targetCostPct and multiplier reproduce that spreadsheet's own pricing
 * formula: Net Revenue = Total Cost / targetCostPct, Suggested Menu Price
 * = Net Revenue * multiplier. Both are editable per-dish in the app.
 */
const COSTING_TARGET_PCT = 0.28001894675398287;
const COSTING_MULTIPLIER = 1.1136353512405899;
const COSTING_DATA = {
  "tomato-soup": [
    {
      "desc": "Tomato Fr.",
      "qty": 150,
      "unit": "Gm",
      "unitCost": 0.006435
    },
    {
      "desc": "Tomato Plum Peeled Drain.2,5Kg",
      "qty": 50,
      "unit": "Gm",
      "unitCost": 0.007
    },
    {
      "desc": "Tomatoe Paste Drain.2,2Kg",
      "qty": 25,
      "unit": "Gm",
      "unitCost": 0.014545
    },
    {
      "desc": "Onion Red Fr.",
      "qty": 25,
      "unit": "Gm",
      "unitCost": 0.0031
    },
    {
      "desc": "Garlic Peeled Fr.",
      "qty": 3,
      "unit": "Gm",
      "unitCost": 0.01066
    },
    {
      "desc": "Cress Basil",
      "qty": 0.2,
      "unit": "Gm",
      "unitCost": 0.048
    },
    {
      "desc": "Table Salt 1Kg",
      "qty": 4,
      "unit": "Gm",
      "unitCost": 0.00325
    },
    {
      "desc": "Black Pepper Powder",
      "qty": 2,
      "unit": "Grm",
      "unitCost": 0.022
    },
    {
      "desc": "Celery Fr.",
      "qty": 15,
      "unit": "Gm",
      "unitCost": 0.01161
    },
    {
      "desc": "Sugar White",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.0066
    },
    {
      "desc": "Bay Leaves",
      "qty": 0.1,
      "unit": "Gm",
      "unitCost": 0.012
    },
    {
      "desc": "Cream F/Cooking 49%",
      "qty": 100,
      "unit": "ml",
      "unitCost": 0.011125
    },
    {
      "desc": "Leek Fr.",
      "qty": 15,
      "unit": "Gm",
      "unitCost": 0.01
    },
    {
      "desc": "Carrot Fr.",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.00464
    }
  ],
  "panzanella": [
    {
      "desc": "Gazpacho",
      "qty": 20,
      "unit": "gm",
      "unitCost": 0.162
    },
    {
      "desc": "Tomato Cherry Kumato Fr.",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.02047
    },
    {
      "desc": "Tomato Cherry Fr. Red Bunch",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.02047
    },
    {
      "desc": "Onion Pearl Fr.",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.0061
    },
    {
      "desc": "Garlic Peeled Fr.",
      "qty": 0.5,
      "unit": "Gm",
      "unitCost": 0.01066
    },
    {
      "desc": "Cress Basil",
      "qty": 0.2,
      "unit": "Gm",
      "unitCost": 0.048
    },
    {
      "desc": "Table Salt 1Kg",
      "qty": 4,
      "unit": "Gm",
      "unitCost": 0.00325
    },
    {
      "desc": "Black Pepper Powder",
      "qty": 2,
      "unit": "Grm",
      "unitCost": 0.022
    },
    {
      "desc": "Anchovi Cantabric Sea 50gm Tin",
      "qty": 0.5,
      "unit": "Grm",
      "unitCost": 0.121429
    },
    {
      "desc": "Caper Drain.32Oz 907Gr",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.016538
    },
    {
      "desc": "Capsicum Red Imp.",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.01545
    },
    {
      "desc": "Capsicum Yellow Imp.",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.01545
    },
    {
      "desc": "Capsicum Green",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.00666
    },
    {
      "desc": "Oil Olive Extra Virgin",
      "qty": 10,
      "unit": "ml",
      "unitCost": 0.15134
    },
    {
      "desc": "Olives Black Pitted",
      "qty": 0.2,
      "unit": "Gm",
      "unitCost": 0.033875
    },
    {
      "desc": "Crystel Bread",
      "qty": 1,
      "unit": "Each",
      "unitCost": 3.64
    },
    {
      "desc": "Micro Greens",
      "qty": 0.2,
      "unit": "Each",
      "unitCost": 4.0625
    }
  ],
  "charc-board": [
    {
      "desc": "Beef Cecina - Contra",
      "qty": 50,
      "unit": "Grm",
      "unitCost": 0.182
    },
    {
      "desc": "Beef Premium Chorizo",
      "qty": 20,
      "unit": "Grm",
      "unitCost": 0.12
    },
    {
      "desc": "Beef Premium Salchichon",
      "qty": 20,
      "unit": "Grm",
      "unitCost": 0.23
    },
    {
      "desc": "Mabchego Cheese",
      "qty": 15,
      "unit": "Grm",
      "unitCost": 0.039
    },
    {
      "desc": "Cheese Idiazabal D.O",
      "qty": 15,
      "unit": "Grm",
      "unitCost": 0.072
    },
    {
      "desc": "Grape White Seedless Fr.",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.0156
    },
    {
      "desc": "Grape Red Seedless",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.01663
    },
    {
      "desc": "Quince Jelly",
      "qty": 20,
      "unit": "Grm",
      "unitCost": 0.01
    },
    {
      "desc": "Walnut Peeled",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.044
    },
    {
      "desc": "Cashenut Whole",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.043
    },
    {
      "desc": "Apricot Dry",
      "qty": 4,
      "unit": "Gm",
      "unitCost": 0.069
    },
    {
      "desc": "Fig Dried",
      "qty": 4,
      "unit": "Gm",
      "unitCost": 0.04
    },
    {
      "desc": "Olives Green Whole",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.033875
    },
    {
      "desc": "Olives Black Pitted",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.033875
    },
    {
      "desc": "Bread Stick",
      "qty": 10,
      "unit": "gm",
      "unitCost": 0.0693
    }
  ],
  "cheese-board": [
    {
      "desc": "Cheese Brie",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.0495
    },
    {
      "desc": "Carotha Cheese",
      "qty": 25,
      "unit": "gm",
      "unitCost": 0.119
    },
    {
      "desc": "Mabchego Cheese",
      "qty": 20,
      "unit": "Grm",
      "unitCost": 0.039
    },
    {
      "desc": "Cheese Idiazabal D.O",
      "qty": 15,
      "unit": "Grm",
      "unitCost": 0.072
    },
    {
      "desc": "Grape White Seedless Fr.",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.0156
    },
    {
      "desc": "Grape Red Fr.",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.01
    },
    {
      "desc": "Quince Jelly",
      "qty": 20,
      "unit": "Grm",
      "unitCost": 0.01
    },
    {
      "desc": "Walnut Peeled",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.044
    },
    {
      "desc": "Cashenut Whole",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.043
    },
    {
      "desc": "Apricot Dry",
      "qty": 4,
      "unit": "Gm",
      "unitCost": 0.069
    },
    {
      "desc": "Fig Dried",
      "qty": 4,
      "unit": "Gm",
      "unitCost": 0.04
    },
    {
      "desc": "Olives Green Whole",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.033875
    },
    {
      "desc": "Olives Black Pitted",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.033875
    },
    {
      "desc": "Bread Stick",
      "qty": 15,
      "unit": "gm",
      "unitCost": 0.0693
    }
  ],
  "muhammara": [
    {
      "desc": "Arabic Chilly Pate",
      "qty": 15,
      "unit": "gm",
      "unitCost": 0.03
    },
    {
      "desc": "Japanese Panko",
      "qty": 25,
      "unit": "gm",
      "unitCost": 0.035
    },
    {
      "desc": "Walnut Peeled",
      "qty": 15,
      "unit": "Gm",
      "unitCost": 0.044
    },
    {
      "desc": "Table Salt 1Kg",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.00325
    },
    {
      "desc": "Black Pepper Powder",
      "qty": 2,
      "unit": "Grm",
      "unitCost": 0.022
    },
    {
      "desc": "Oil Olive Extra Virgin",
      "qty": 20,
      "unit": "ml",
      "unitCost": 0.15134
    },
    {
      "desc": "Parsley Local Kg",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.005
    },
    {
      "desc": "Bread Arabic Fr.12Cm 60Gr",
      "qty": 1,
      "unit": "Pcs",
      "unitCost": 4.75
    }
  ],
  "hot-mezze-platter": [
    {
      "desc": "Beef Kibbeh",
      "qty": 2,
      "unit": "Each",
      "unitCost": 0.75
    },
    {
      "desc": "Cheese Rakakat",
      "qty": 2,
      "unit": "gm",
      "unitCost": 0.95
    },
    {
      "desc": "Spinach Sambousek",
      "qty": 2,
      "unit": "gm",
      "unitCost": 0.95
    },
    {
      "desc": "Falafel",
      "qty": 100,
      "unit": "gm",
      "unitCost": 0.05
    },
    {
      "desc": "Mayonnaise",
      "qty": 20,
      "unit": "Gm",
      "unitCost": 0.00325
    }
  ],
  "guacamole": [
    {
      "desc": "Avocado Hass Ripe Fr.12Uni",
      "qty": 200,
      "unit": "Gm",
      "unitCost": 0.028
    },
    {
      "desc": "Lime Seedless Fr.10Uni Kg",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.01269
    },
    {
      "desc": "Onion Pearl Fr.",
      "qty": 15,
      "unit": "Gm",
      "unitCost": 0.0061
    },
    {
      "desc": "Tomato Fr.",
      "qty": 15,
      "unit": "Gm",
      "unitCost": 0.006435
    },
    {
      "desc": "Coriander Fr.",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.006
    },
    {
      "desc": "Table Salt 1Kg",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.00325
    },
    {
      "desc": "Pomegranate Fr.3Uni Kg",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.0184
    },
    {
      "desc": "Tortilla Chips",
      "qty": 60,
      "unit": "gm",
      "unitCost": 0.03167
    }
  ],
  "croquettes": [
    {
      "desc": "Croquette Potato+Cheese Froz.25Gr",
      "qty": 6,
      "unit": "Each",
      "unitCost": 1.06
    },
    {
      "desc": "Paprika Smoked Can/750Gr",
      "qty": 0.5,
      "unit": "Gm",
      "unitCost": 0.128
    },
    {
      "desc": "Mayonnaise",
      "qty": 20,
      "unit": "Gm",
      "unitCost": 0.00325
    },
    {
      "desc": "Mabchego Cheese",
      "qty": 10,
      "unit": "Grm",
      "unitCost": 0.039
    }
  ],
  "empanada": [
    {
      "desc": "Flour Corn Maseca",
      "qty": 75,
      "unit": "Gm",
      "unitCost": 0.02
    },
    {
      "desc": "Table Salt 1Kg",
      "qty": 15,
      "unit": "Gm",
      "unitCost": 0.00325
    },
    {
      "desc": "Butter Block",
      "qty": 15,
      "unit": "Gm",
      "unitCost": 0.037
    },
    {
      "desc": "Safron",
      "qty": 0.1,
      "unit": "Grm",
      "unitCost": 60.0
    },
    {
      "desc": "Mayonnaise",
      "qty": 20,
      "unit": "Gm",
      "unitCost": 0.00325
    },
    {
      "desc": "Bolognese",
      "qty": 0.6,
      "unit": "Each",
      "unitCost": 11.45
    }
  ],
  "bao-buns": [
    {
      "desc": "Bun Potato Froz.60Gr",
      "qty": 2,
      "unit": "Each",
      "unitCost": 1.796875
    },
    {
      "desc": "Chicken Tinga",
      "qty": 1,
      "unit": "Each",
      "unitCost": 7.355865
    },
    {
      "desc": "Pickle Onion",
      "qty": 10,
      "unit": "gm",
      "unitCost": 0.006
    },
    {
      "desc": "Micro Greens",
      "qty": 0.2,
      "unit": "Each",
      "unitCost": 4.0625
    }
  ],
  "dakgangjeong": [
    {
      "desc": "Chicken Thigh Boneless Skinless Froz.",
      "qty": 80,
      "unit": "Gm",
      "unitCost": 0.01675
    },
    {
      "desc": "Milk Full Fat Long Life Br/1L",
      "qty": 150,
      "unit": "ml",
      "unitCost": 0.00354
    },
    {
      "desc": "Garlic Peeled Fr.",
      "qty": 15,
      "unit": "Gm",
      "unitCost": 0.01066
    },
    {
      "desc": "Micro Greens",
      "qty": 0.2,
      "unit": "Each",
      "unitCost": 4.0625
    },
    {
      "desc": "Flour Corn Maseca",
      "qty": 30,
      "unit": "Gm",
      "unitCost": 0.02
    },
    {
      "desc": "Sunflower Oil",
      "qty": 30,
      "unit": "ml",
      "unitCost": 0.00877
    },
    {
      "desc": "Mayonnaise",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.00325
    },
    {
      "desc": "Sugar White",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.0066
    }
  ],
  "prawn-tempura": [
    {
      "desc": "Shrimp H/Less Black Tiger Froz.16/20",
      "qty": 300,
      "unit": "Gm",
      "unitCost": 0.022
    },
    {
      "desc": "Egg Fr.Tray 30Pc",
      "qty": 1,
      "unit": "Pcs",
      "unitCost": 0.694
    },
    {
      "desc": "Table Salt 1Kg",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.00325
    },
    {
      "desc": "Black Pepper Powder",
      "qty": 0.6,
      "unit": "Grm",
      "unitCost": 0.022
    },
    {
      "desc": "Sweet Chilli Sauce",
      "qty": 20,
      "unit": "Grm",
      "unitCost": 0.008919
    },
    {
      "desc": "Ginger Fr.",
      "qty": 0.3,
      "unit": "Gm",
      "unitCost": 0.00741
    },
    {
      "desc": "Ponzu Sauce",
      "qty": 20,
      "unit": "gm",
      "unitCost": 0.072222
    },
    {
      "desc": "Sunflower Oil",
      "qty": 25,
      "unit": "ml",
      "unitCost": 0.00877
    },
    {
      "desc": "Flour Patisserie T45",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.005
    },
    {
      "desc": "Japanese Panko",
      "qty": 25,
      "unit": "gm",
      "unitCost": 0.035
    }
  ],
  "calamari": [
    {
      "desc": "Squid Tube Froz.5/10",
      "qty": 80,
      "unit": "Gm",
      "unitCost": 0.015625
    },
    {
      "desc": "Egg Fr.Tray 30Pc",
      "qty": 1,
      "unit": "Pcs",
      "unitCost": 0.694
    },
    {
      "desc": "Table Salt 1Kg",
      "qty": 2,
      "unit": "Gm",
      "unitCost": 0.00325
    },
    {
      "desc": "Black Pepper Powder",
      "qty": 0.2,
      "unit": "Grm",
      "unitCost": 0.022
    },
    {
      "desc": "Sunflower Oil",
      "qty": 25,
      "unit": "ml",
      "unitCost": 0.00877
    },
    {
      "desc": "Mayonnaise",
      "qty": 20,
      "unit": "Gm",
      "unitCost": 0.00325
    },
    {
      "desc": "Flour Patisserie T45",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.005
    },
    {
      "desc": "Japanese Panko",
      "qty": 15,
      "unit": "gm",
      "unitCost": 0.035
    }
  ],
  "edamame": [
    {
      "desc": "Edamame Whole 500G",
      "qty": 60,
      "unit": "gm",
      "unitCost": 0.009
    },
    {
      "desc": "Salt Sea Maldon Pack/250Gr",
      "qty": 0.3,
      "unit": "Gm",
      "unitCost": 0.056
    }
  ],
  "bocadillo": [
    {
      "desc": "Baguette Tradition",
      "qty": 1,
      "unit": "Grm",
      "unitCost": 0.014286
    },
    {
      "desc": "Butter Block",
      "qty": 15,
      "unit": "Gm",
      "unitCost": 0.037
    },
    {
      "desc": "Tomato Sauce",
      "qty": 10,
      "unit": "Gm",
      "unitCost": 0.008
    },
    {
      "desc": "Oil Olive Extra Virgin",
      "qty": 5,
      "unit": "ml",
      "unitCost": 0.15134
    },
    {
      "desc": "Cecina Leon Fr",
      "qty": 40,
      "unit": "Grm",
      "unitCost": 0.182
    },
    {
      "desc": "Pepper Piquillo Oliv.Oil Drain/390Gr",
      "qty": 15,
      "unit": "Grm",
      "unitCost": 0.041026
    },
    {
      "desc": "Cheese Burrata Italian Fr.",
      "qty": 23,
      "unit": "Gm",
      "unitCost": 0.07114
    },
    {
      "desc": "French Fries 9Mm Froz.",
      "qty": 60,
      "unit": "Gm",
      "unitCost": 0.0092
    },
    {
      "desc": "Salt Sea Maldon Pack/250Gr",
      "qty": 0.3,
      "unit": "Gm",
      "unitCost": 0.056
    },
    {
      "desc": "Black Pepper Powder",
      "qty": 0.2,
      "unit": "Grm",
      "unitCost": 0.022
    },
    {
      "desc": "Sunflower Oil",
      "qty": 15,
      "unit": "ml",
      "unitCost": 0.00877
    },
    {
      "desc": "Tomato Sauce",
      "qty": 20,
      "unit": "Gm",
      "unitCost": 0.008
    },
    {
      "desc": "Mayonnaise",
      "qty": 20,
      "unit": "Gm",
      "unitCost": 0.00325
    }
  ],
  "cachopo": [
    {
      "desc": "Breast Chicken Skin On W/Wing",
      "qty": 1,
      "unit": "Gm",
      "unitCost": 0.032
    },
    {
      "desc": "Cecina Leon Fr",
      "qty": 25,
      "unit": "Grm",
      "unitCost": 0.182
    },
    {
      "desc": "Pepper Piquillo Oliv.Oil Drain/390Gr",
      "qty": 15,
      "unit": "Grm",
      "unitCost": 0.041026
    },
    {
      "desc": "Fontina Cheese",
      "qty": 25,
      "unit": "gm",
      "unitCost": 0.068
    },
    {
      "desc": "Capsicum Red Imp.",
      "qty": 20,
      "unit": "Gm",
      "unitCost": 0.01545
    },
    {
      "desc": "Garlic Peeled Fr.",
      "qty": 0.3,
      "unit": "Gm",
      "unitCost": 0.01066
    },
    {
      "desc": "Oil Olive Extra Virgin",
      "qty": 15,
      "unit": "ml",
      "unitCost": 0.15134
    },
    {
      "desc": "Table Salt 1Kg",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.00325
    },
    {
      "desc": "Pepper Black Grain",
      "qty": 2,
      "unit": "Gm",
      "unitCost": 0.021
    },
    {
      "desc": "Sunflower Oil",
      "qty": 40,
      "unit": "ml",
      "unitCost": 0.00877
    },
    {
      "desc": "French Fries 9Mm Froz.",
      "qty": 50,
      "unit": "Gm",
      "unitCost": 0.0092
    },
    {
      "desc": "Cabbage Wh.Fr.",
      "qty": 30,
      "unit": "Gm",
      "unitCost": 0.0016
    },
    {
      "desc": "Egg Fr.Tray 30Pc",
      "qty": 1,
      "unit": "Pcs",
      "unitCost": 0.694
    },
    {
      "desc": "Flour Patisserie T45",
      "qty": 20,
      "unit": "Gm",
      "unitCost": 0.005
    },
    {
      "desc": "Japanese Panko",
      "qty": 30,
      "unit": "gm",
      "unitCost": 0.035
    },
    {
      "desc": "Parsley Local Kg",
      "qty": 0.2,
      "unit": "Gm",
      "unitCost": 0.005
    }
  ],
  "la-mediterranea": [
    {
      "desc": "Salmon Whole Fr.",
      "qty": 200,
      "unit": "Gm",
      "unitCost": 0.044875
    },
    {
      "desc": "Frozen Raw Coarse Beef Chorizo Sausages",
      "qty": 20,
      "unit": "Grm",
      "unitCost": 0.062
    },
    {
      "desc": "Orzo Pasta",
      "qty": 50,
      "unit": "gm",
      "unitCost": 0.013
    },
    {
      "desc": "Fish Stock",
      "qty": 20,
      "unit": "mL",
      "unitCost": 0.01895
    },
    {
      "desc": "Tomato Sauce",
      "qty": 15,
      "unit": "Gm",
      "unitCost": 0.008
    },
    {
      "desc": "Chive Fr. Bag/100Gr",
      "qty": 0.3,
      "unit": "Gm",
      "unitCost": 0.0055
    },
    {
      "desc": "Oil Olive Extra Virgin",
      "qty": 25,
      "unit": "ml",
      "unitCost": 0.15134
    },
    {
      "desc": "Table Salt 1Kg",
      "qty": 5,
      "unit": "Gm",
      "unitCost": 0.00325
    },
    {
      "desc": "Butter Block",
      "qty": 15,
      "unit": "Gm",
      "unitCost": 0.037
    },
    {
      "desc": "Garlic Peeled Fr.",
      "qty": 0.7,
      "unit": "Gm",
      "unitCost": 0.01066
    },
    {
      "desc": "Rosemary Fr.Bag/50Gr",
      "qty": 0.2,
      "unit": "Gm",
      "unitCost": 0.051
    }
  ]
};



const ESTIMATED_COSTING_DATA = {
  "lentil-soup": [
    {
      "desc": "Yellow lentils",
      "qty": 70,
      "unit": "g",
      "unitCost": 0.008
    },
    {
      "desc": "Carrot",
      "qty": 20,
      "unit": "g",
      "unitCost": 0.00464
    },
    {
      "desc": "Onion",
      "qty": 15,
      "unit": "g",
      "unitCost": 0.00483
    },
    {
      "desc": "Vegetable stock",
      "qty": 250,
      "unit": "ml",
      "unitCost": 0.004
    },
    {
      "desc": "Cumin & spices",
      "qty": 2,
      "unit": "g",
      "unitCost": 0.03
    },
    {
      "desc": "Bread basket",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.015
    }
  ],
  "chicken-soup": [
    {
      "desc": "Chicken stock",
      "qty": 280,
      "unit": "ml",
      "unitCost": 0.012
    },
    {
      "desc": "Vermicelli noodles",
      "qty": 25,
      "unit": "g",
      "unitCost": 0.008
    },
    {
      "desc": "Carrot",
      "qty": 15,
      "unit": "g",
      "unitCost": 0.00464
    },
    {
      "desc": "Celery",
      "qty": 10,
      "unit": "g",
      "unitCost": 0.01161
    }
  ],
  "mushroom-soup": [
    {
      "desc": "White mushroom",
      "qty": 90,
      "unit": "g",
      "unitCost": 0.01898
    },
    {
      "desc": "Dried porcini",
      "qty": 5,
      "unit": "g",
      "unitCost": 0.15
    },
    {
      "desc": "Cream",
      "qty": 60,
      "unit": "ml",
      "unitCost": 0.011125
    },
    {
      "desc": "Butter",
      "qty": 15,
      "unit": "g",
      "unitCost": 0.037
    },
    {
      "desc": "Vegetable stock",
      "qty": 200,
      "unit": "ml",
      "unitCost": 0.006
    }
  ],
  "nicoise": [
    {
      "desc": "Tuna loin",
      "qty": 160,
      "unit": "g",
      "unitCost": 0.068
    },
    {
      "desc": "Green beans",
      "qty": 50,
      "unit": "g",
      "unitCost": 0.014
    },
    {
      "desc": "Purple potato",
      "qty": 80,
      "unit": "g",
      "unitCost": 0.06393
    },
    {
      "desc": "Cherry tomato",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.02047
    },
    {
      "desc": "Nicoise olives",
      "qty": 20,
      "unit": "g",
      "unitCost": 0.033875
    },
    {
      "desc": "Egg",
      "qty": 1,
      "unit": "pc",
      "unitCost": 0.694
    }
  ],
  "caesar-salad": [
    {
      "desc": "Romaine lettuce",
      "qty": 150,
      "unit": "g",
      "unitCost": 0.00853
    },
    {
      "desc": "Parmesan",
      "qty": 15,
      "unit": "g",
      "unitCost": 0.065
    },
    {
      "desc": "Croutons",
      "qty": 20,
      "unit": "g",
      "unitCost": 0.012
    },
    {
      "desc": "Caesar dressing (house-made)",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.025
    }
  ],
  "eat-your-greens": [
    {
      "desc": "Avocado",
      "qty": 0.5,
      "unit": "pc",
      "unitCost": 2.33
    },
    {
      "desc": "Quinoa",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.04
    },
    {
      "desc": "Asparagus",
      "qty": 50,
      "unit": "g",
      "unitCost": 0.04657
    },
    {
      "desc": "Broccoli",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.00923
    },
    {
      "desc": "Pumpkin seed",
      "qty": 10,
      "unit": "g",
      "unitCost": 0.028
    }
  ],
  "hummus": [
    {
      "desc": "Chickpeas (dry)",
      "qty": 120,
      "unit": "g",
      "unitCost": 0.011
    },
    {
      "desc": "Tahini",
      "qty": 50,
      "unit": "g",
      "unitCost": 0.01829
    },
    {
      "desc": "Lemon juice",
      "qty": 10,
      "unit": "ml",
      "unitCost": 0.03
    },
    {
      "desc": "Olive oil",
      "qty": 15,
      "unit": "ml",
      "unitCost": 0.15134
    },
    {
      "desc": "Arabic bread",
      "qty": 60,
      "unit": "g",
      "unitCost": 0.0754
    }
  ],
  "moutabel": [
    {
      "desc": "Eggplant",
      "qty": 200,
      "unit": "g",
      "unitCost": 0.01
    },
    {
      "desc": "Tahini",
      "qty": 30,
      "unit": "g",
      "unitCost": 0.01829
    },
    {
      "desc": "Yoghurt",
      "qty": 50,
      "unit": "g",
      "unitCost": 0.00345
    },
    {
      "desc": "Arabic bread",
      "qty": 60,
      "unit": "g",
      "unitCost": 0.0754
    }
  ],
  "fattoush": [
    {
      "desc": "Romaine lettuce",
      "qty": 120,
      "unit": "g",
      "unitCost": 0.00853
    },
    {
      "desc": "Cucumber",
      "qty": 50,
      "unit": "g",
      "unitCost": 0.00602
    },
    {
      "desc": "Tomato",
      "qty": 50,
      "unit": "g",
      "unitCost": 0.006435
    },
    {
      "desc": "Radish",
      "qty": 20,
      "unit": "g",
      "unitCost": 0.01
    },
    {
      "desc": "Fried pita",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.04167
    },
    {
      "desc": "Pomegranate molasses",
      "qty": 15,
      "unit": "ml",
      "unitCost": 0.03
    }
  ],
  "falafel": [
    {
      "desc": "Dry chickpeas",
      "qty": 130,
      "unit": "g",
      "unitCost": 0.011
    },
    {
      "desc": "Fresh herbs",
      "qty": 15,
      "unit": "g",
      "unitCost": 0.03
    },
    {
      "desc": "Tahina yoghurt sauce",
      "qty": 50,
      "unit": "g",
      "unitCost": 0.0109
    },
    {
      "desc": "Frying oil",
      "qty": 30,
      "unit": "ml",
      "unitCost": 0.005588
    }
  ],
  "bolognese": [
    {
      "desc": "Beef mince",
      "qty": 130,
      "unit": "g",
      "unitCost": 0.031
    },
    {
      "desc": "Pasta (dry)",
      "qty": 120,
      "unit": "g",
      "unitCost": 0.013
    },
    {
      "desc": "Tomato sauce",
      "qty": 100,
      "unit": "g",
      "unitCost": 0.008
    },
    {
      "desc": "Mirepoix (onion/carrot/celery)",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.00681
    },
    {
      "desc": "Parmesan",
      "qty": 10,
      "unit": "g",
      "unitCost": 0.065
    }
  ],
  "pesto-3ps": [
    {
      "desc": "Pasta (dry)",
      "qty": 120,
      "unit": "g",
      "unitCost": 0.013
    },
    {
      "desc": "Basil pesto (house-made)",
      "qty": 90,
      "unit": "g",
      "unitCost": 0.02
    },
    {
      "desc": "Pine nuts",
      "qty": 10,
      "unit": "g",
      "unitCost": 0.12
    },
    {
      "desc": "Parmesan",
      "qty": 10,
      "unit": "g",
      "unitCost": 0.065
    }
  ],
  "thermidor": [
    {
      "desc": "Shrimp",
      "qty": 100,
      "unit": "g",
      "unitCost": 0.022
    },
    {
      "desc": "Potato hotdog bun",
      "qty": 1,
      "unit": "pc",
      "unitCost": 3.5
    },
    {
      "desc": "Cheese (grated)",
      "qty": 30,
      "unit": "g",
      "unitCost": 0.065
    },
    {
      "desc": "Cream/butter/flour base",
      "qty": 50,
      "unit": "g",
      "unitCost": 0.02
    }
  ],
  "mcme": [
    {
      "desc": "Wagyu beef patty",
      "qty": 180,
      "unit": "g",
      "unitCost": 0.15
    },
    {
      "desc": "Potato bun",
      "qty": 1,
      "unit": "pc",
      "unitCost": 3.5
    },
    {
      "desc": "Cheese slice",
      "qty": 20,
      "unit": "g",
      "unitCost": 0.048
    },
    {
      "desc": "Piquillo peppers",
      "qty": 20,
      "unit": "g",
      "unitCost": 0.03
    },
    {
      "desc": "Pickles",
      "qty": 15,
      "unit": "g",
      "unitCost": 0.008
    }
  ],
  "nasi-goreng": [
    {
      "desc": "Jasmine rice",
      "qty": 200,
      "unit": "g",
      "unitCost": 0.006
    },
    {
      "desc": "Chicken",
      "qty": 100,
      "unit": "g",
      "unitCost": 0.01075
    },
    {
      "desc": "Shrimp",
      "qty": 100,
      "unit": "g",
      "unitCost": 0.022
    },
    {
      "desc": "Egg",
      "qty": 1,
      "unit": "pc",
      "unitCost": 0.694
    },
    {
      "desc": "Prawn crackers",
      "qty": 15,
      "unit": "g",
      "unitCost": 0.03
    },
    {
      "desc": "Peanut sauce",
      "qty": 30,
      "unit": "g",
      "unitCost": 0.015
    }
  ],
  "mashed-potato": [
    {
      "desc": "Potato",
      "qty": 180,
      "unit": "g",
      "unitCost": 0.003285
    },
    {
      "desc": "Butter",
      "qty": 25,
      "unit": "g",
      "unitCost": 0.037
    },
    {
      "desc": "Cream",
      "qty": 30,
      "unit": "ml",
      "unitCost": 0.011125
    },
    {
      "desc": "Milk",
      "qty": 20,
      "unit": "ml",
      "unitCost": 0.00354
    }
  ],
  "padron": [
    {
      "desc": "Padr\u00f3n peppers",
      "qty": 100,
      "unit": "g",
      "unitCost": 0.050685
    },
    {
      "desc": "Olive oil",
      "qty": 15,
      "unit": "ml",
      "unitCost": 0.15134
    },
    {
      "desc": "Maldon salt",
      "qty": 2,
      "unit": "g",
      "unitCost": 0.056
    }
  ],
  "del-mar": [
    {
      "desc": "Tagliatelle (dry)",
      "qty": 120,
      "unit": "g",
      "unitCost": 0.013
    },
    {
      "desc": "Shrimp",
      "qty": 60,
      "unit": "g",
      "unitCost": 0.022
    },
    {
      "desc": "Mussels",
      "qty": 60,
      "unit": "g",
      "unitCost": 0.03
    },
    {
      "desc": "Clams",
      "qty": 60,
      "unit": "g",
      "unitCost": 0.035
    },
    {
      "desc": "Scallop",
      "qty": 50,
      "unit": "g",
      "unitCost": 0.15
    },
    {
      "desc": "Tomato sauce",
      "qty": 80,
      "unit": "g",
      "unitCost": 0.008
    },
    {
      "desc": "Garlic",
      "qty": 5,
      "unit": "g",
      "unitCost": 0.01066
    }
  ],
  "pinchos-chicken": [
    {
      "desc": "Chicken thigh",
      "qty": 150,
      "unit": "g",
      "unitCost": 0.01675
    },
    {
      "desc": "Onion",
      "qty": 30,
      "unit": "g",
      "unitCost": 0.00483
    },
    {
      "desc": "Pickles",
      "qty": 20,
      "unit": "g",
      "unitCost": 0.008
    },
    {
      "desc": "Garden salad mix",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.009
    }
  ],
  "pinchos-beef": [
    {
      "desc": "Beef sirloin",
      "qty": 150,
      "unit": "g",
      "unitCost": 0.115
    },
    {
      "desc": "Onion",
      "qty": 30,
      "unit": "g",
      "unitCost": 0.00483
    },
    {
      "desc": "Pickles",
      "qty": 20,
      "unit": "g",
      "unitCost": 0.008
    },
    {
      "desc": "Garden salad mix",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.009
    }
  ],
  "pinchos-shrimp": [
    {
      "desc": "Shrimp",
      "qty": 150,
      "unit": "g",
      "unitCost": 0.022
    },
    {
      "desc": "Onion",
      "qty": 30,
      "unit": "g",
      "unitCost": 0.00483
    },
    {
      "desc": "Pickles",
      "qty": 20,
      "unit": "g",
      "unitCost": 0.008
    },
    {
      "desc": "Garden salad mix",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.009
    }
  ],
  "sauteed-vegetables": [
    {
      "desc": "Asparagus",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.04657
    },
    {
      "desc": "Broccoli",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.00923
    },
    {
      "desc": "Carrot",
      "qty": 30,
      "unit": "g",
      "unitCost": 0.00464
    },
    {
      "desc": "Green beans",
      "qty": 30,
      "unit": "g",
      "unitCost": 0.014
    },
    {
      "desc": "Butter",
      "qty": 10,
      "unit": "g",
      "unitCost": 0.037
    }
  ],
  "mixed-side-salad": [
    {
      "desc": "Mixed lettuce leaves",
      "qty": 80,
      "unit": "g",
      "unitCost": 0.00903
    },
    {
      "desc": "Cherry tomato",
      "qty": 30,
      "unit": "g",
      "unitCost": 0.02047
    },
    {
      "desc": "Asparagus",
      "qty": 20,
      "unit": "g",
      "unitCost": 0.04657
    },
    {
      "desc": "Olive oil dressing",
      "qty": 15,
      "unit": "ml",
      "unitCost": 0.15134
    }
  ],
  "steamed-rice": [
    {
      "desc": "Basmati rice",
      "qty": 180,
      "unit": "g",
      "unitCost": 0.006
    }
  ],
  "sweet-potato-fries": [
    {
      "desc": "Sweet potato",
      "qty": 220,
      "unit": "g",
      "unitCost": 0.02177
    },
    {
      "desc": "Frying oil",
      "qty": 20,
      "unit": "ml",
      "unitCost": 0.005588
    }
  ],
  "french-fries": [
    {
      "desc": "Potato",
      "qty": 220,
      "unit": "g",
      "unitCost": 0.003285
    },
    {
      "desc": "Frying oil",
      "qty": 20,
      "unit": "ml",
      "unitCost": 0.005588
    }
  ],
  "umm-ali": [
    {
      "desc": "Puff pastry",
      "qty": 60,
      "unit": "g",
      "unitCost": 0.02
    },
    {
      "desc": "Milk",
      "qty": 150,
      "unit": "ml",
      "unitCost": 0.00354
    },
    {
      "desc": "Cream",
      "qty": 40,
      "unit": "ml",
      "unitCost": 0.011125
    },
    {
      "desc": "Sugar",
      "qty": 20,
      "unit": "g",
      "unitCost": 0.0066
    },
    {
      "desc": "Mixed nuts & raisins",
      "qty": 20,
      "unit": "g",
      "unitCost": 0.0452
    }
  ],
  "kunafa": [
    {
      "desc": "Kunafa (kataifi) dough",
      "qty": 80,
      "unit": "g",
      "unitCost": 0.015
    },
    {
      "desc": "Pistachio",
      "qty": 15,
      "unit": "g",
      "unitCost": 0.056
    },
    {
      "desc": "Sugar syrup",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.005
    },
    {
      "desc": "Cream (qishta)",
      "qty": 30,
      "unit": "g",
      "unitCost": 0.014
    },
    {
      "desc": "Rose water",
      "qty": 5,
      "unit": "ml",
      "unitCost": 0.02
    }
  ],
  "tres-leches": [
    {
      "desc": "Sponge cake base",
      "qty": 100,
      "unit": "g",
      "unitCost": 0.02
    },
    {
      "desc": "Milk",
      "qty": 60,
      "unit": "ml",
      "unitCost": 0.00354
    },
    {
      "desc": "Condensed milk",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.014
    },
    {
      "desc": "Cream",
      "qty": 50,
      "unit": "ml",
      "unitCost": 0.011125
    },
    {
      "desc": "Vanilla",
      "qty": 2,
      "unit": "g",
      "unitCost": 0.3
    }
  ],
  "guilty": [
    {
      "desc": "Dark chocolate 72%",
      "qty": 80,
      "unit": "g",
      "unitCost": 0.06
    },
    {
      "desc": "Butter",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.037
    },
    {
      "desc": "Sugar",
      "qty": 30,
      "unit": "g",
      "unitCost": 0.0066
    },
    {
      "desc": "Egg",
      "qty": 2,
      "unit": "pc",
      "unitCost": 0.694
    },
    {
      "desc": "Flour",
      "qty": 20,
      "unit": "g",
      "unitCost": 0.005
    }
  ],
  "waffle": [
    {
      "desc": "Waffle batter mix",
      "qty": 120,
      "unit": "g",
      "unitCost": 0.01
    },
    {
      "desc": "Date syrup",
      "qty": 25,
      "unit": "g",
      "unitCost": 0.02
    },
    {
      "desc": "Mixed berries",
      "qty": 50,
      "unit": "g",
      "unitCost": 0.0246
    }
  ],
  "torte-caprese": [
    {
      "desc": "Ground almond",
      "qty": 70,
      "unit": "g",
      "unitCost": 0.045
    },
    {
      "desc": "72% Venezuelan chocolate",
      "qty": 60,
      "unit": "g",
      "unitCost": 0.08
    },
    {
      "desc": "Butter",
      "qty": 40,
      "unit": "g",
      "unitCost": 0.037
    },
    {
      "desc": "Sugar",
      "qty": 30,
      "unit": "g",
      "unitCost": 0.0066
    },
    {
      "desc": "Egg",
      "qty": 2,
      "unit": "pc",
      "unitCost": 0.694
    }
  ],
  "five-a-day": [
    {
      "desc": "Seasonal mixed fruit",
      "qty": 250,
      "unit": "g",
      "unitCost": 0.012
    }
  ],
  "ice-cream": [
    {
      "desc": "Ice cream base (2 scoops)",
      "qty": 100,
      "unit": "g",
      "unitCost": 0.022
    }
  ],
  "sorbet": [
    {
      "desc": "Sorbet base (2 scoops)",
      "qty": 100,
      "unit": "g",
      "unitCost": 0.022
    }
  ]
};
if (typeof module !== "undefined") { module.exports = { COSTING_DATA, COSTING_TARGET_PCT, COSTING_MULTIPLIER, ESTIMATED_COSTING_DATA }; }
