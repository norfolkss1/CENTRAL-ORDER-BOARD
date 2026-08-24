/**
 * SEED DATA — Central Recipe Book
 * ---------------------------------------------------------------
 * Source of truth: recipe_book_CENTRAL_2.pptx (kitchen prep book).
 * Every component below is tagged `draft: false` (transcribed
 * verbatim from the PPTX — quantities and method are exactly as
 * written there) or `draft: true` (the PPTX slide was missing
 * ingredients/method; this was authored from the dish photo and
 * the à la carte menu description, at the user's request, and
 * still needs a chef to confirm/correct it).
 *
 * Allergen codes are NOT present in the PPTX (every checkbox on
 * every slide is blank in the source file). Where a matching dish
 * exists on the à la carte PDF menu, its allergen tags are copied
 * in here with allergensSource = 'unverified-menu'. Otherwise
 * allergens is an empty array with allergensSource = 'none'.
 *
 * This file only SEEDS Firestore the first time the app runs with
 * an empty `recipes` collection (see app.js). After that, Firestore
 * is the live source of truth and this file is not read again.
 * ---------------------------------------------------------------
 */

const CATEGORIES = [
  { id: "soup", label: "Soups", order: 1 },
  { id: "charcuterie", label: "Charcutería & Cheese Boards", order: 2 },
  { id: "salads", label: "Salads", order: 3 },
  { id: "mezze", label: "Mezze & Local Favorites", order: 4 },
  { id: "snacks", label: "Snacks", order: 5 },
  { id: "pastas", label: "Pastas", order: 6 },
  { id: "sandwiches", label: "Burger & Sandwiches", order: 7 },
  { id: "mains", label: "Main Course", order: 8 },
  { id: "sides", label: "Side Dishes", order: 9 },
  { id: "sweets", label: "Sweets", order: 10 },
  { id: "icecream", label: "Ice Cream & Sorbet", order: 11 },
  { id: "sauces", label: "Sauces & Bases", order: 12 },
  { id: "breakfast", label: "Breakfast Prep", order: 13 },
];

// Small helper so every recipe object has the same shape.
function R(r) {
  return {
    subcategory: "",
    image: "",
    price: null,
    prepTime: "",
    cookTime: "",
    yield: "",
    chefNotes: "",
    platingNotes: "",
    allergens: [],
    allergensSource: "none", // 'none' | 'unverified-menu' | 'kitchen-confirmed'
    archived: false,
    costing: null,
    ...r,
  };
}

const SEED_RECIPES = [
  /* ------------------------------- SOUPS ------------------------------- */
  R({
    id: "lentil-soup",
    price: 50,
    category: "soup",
    nameEn: "Lentil Soup",
    nameAr: "شوربة العدس",
    image: "images/lentil-soup.jpg",
    dishExplanation:
      "Middle Eastern soup, alternatively called shurbat al-adas. A light soup, great for starting the meal.",
    allergens: ["Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Soup",
        draft: false,
        ingredients: [
          "Yellow lentil - 1 kg", "Carrot - 250gr", "Onion – 1 big", "Garlic – 50 gr",
          "Celery – 100gr", "Leek – 100 gr", "Tomato – 100gr", "Salt",
          "Cumin powder – 1 teaspoon", "Coriander powder – 1 teaspoon",
          "Turmeric powder - 1 teaspoon", "Vegetable stock – 3L",
        ],
        method: [
          "Sauté garlic and onion on low fire till transparent, don't give color.",
          "Add spices and cook.",
          "Add tomatoes and cook further.",
          "Add the rest of the vegetables and sweat together.",
          "Add washed lentils and cover with stock.",
          "Cook till lentils are very soft, about 40 minutes.",
          "Season with salt and blend.",
        ],
      },
    ],
  }),
  R({
    id: "chicken-soup",
    price: 50,
    category: "soup",
    nameEn: "Chicken Soup",
    nameAr: "شوربة الدجاج",
    image: "images/chicken-soup.jpg",
    allergens: ["G"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Soup",
        draft: false,
        ingredients: [
          "Whole chicken - 4kg", "Water", "White onion - 500gr", "Carrot - 500gr",
          "Celery - 300gr", "Bouquet garni (peppercorn, parsley, stalk)", "Salt - 55gr",
        ],
        method: ["Boil everything on slow fire for at least 6 hours."],
      },
    ],
  }),
  R({
    id: "mushroom-soup",
    price: 50,
    category: "soup",
    nameEn: "Wild Forest Mushroom Soup",
    nameAr: "شوربة فطر",
    image: "images/mushroom-soup.jpg",
    allergens: ["D", "G"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Soup",
        draft: false,
        ingredients: [
          "Unsalted butter - 30 g", "Extra-virgin olive oil - 30 ml",
          "Shallot, finely chopped - 1 medium", "Garlic cloves, minced - 2",
          "Mushrooms, white, sliced - 500 g", "Mushroom, dry Porcini - 50 g",
          "Fresh thyme - 1 sprig", "Dry white wine - 60 ml",
          "Vegetable stock - 500 ml", "Mushroom stock - 250 ml",
          "Heavy cream - 200 ml", "Salt - 20 g", "Freshly ground black pepper - to taste",
        ],
        method: [
          "Heat butter and olive oil. Add the shallot and garlic, cooking until soft and translucent.",
          "Increase heat to medium-high and add the sliced mushrooms. Cook until they release their moisture and begin to brown, about 8-10 minutes. Add the thyme sprig.",
          "Add the stock and bring to a gentle simmer. Cook for 15-20 minutes to allow the flavors to meld.",
          "Remove the thyme sprig, then blend the soup using an immersion blender (or in batches in a high-speed blender) until smooth.",
        ],
      },
    ],
  }),
  R({
    id: "tomato-soup",
    price: 50,
    category: "soup",
    nameEn: "Tomato Soup",
    nameAr: "الطماطم",
    image: "images/tomato-soup.jpg",
    allergens: ["D", "G"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Soup",
        draft: false,
        ingredients: [
          "Tomato sauce (pomodorina) - 1.5 kg", "Shallots, finely chopped - 60 g",
          "Garlic, thinly sliced - 10 g", "Carrot - 50 g", "Celery - 40 g",
          "Olive oil - 45 ml", "Vegetable stock - 500 ml", "Fresh thyme - 2 sprigs",
          "Bay leaf - 1", "Salt - 22 g", "Black pepper - 3 g", "Basil leaves - 5 g",
          "Parmesan skin - 100 g",
        ],
        method: [
          "Heat olive oil. Add shallots, garlic, carrot and celery.",
          "Sauté 5–7 minutes until vegetables are soft, then add aromatics.",
          "Stir in the thyme sprigs and bay leaf. Cook 1 minute.",
          "Add the Pomodorina tomato sauce and the Parmesan skin.",
          "Pour in vegetable stock, stirring to combine; season with salt and pepper and bring to a gentle simmer.",
          "Simmer 30–40 minutes, stirring occasionally to prevent sticking.",
          "Remove the thyme sprigs, bay leaf and Parmesan skin.",
          "Blend with an immersion blender until smooth. Stir in fresh basil leaves and blend again.",
        ],
      },
    ],
  }),

  /* ------------------------- CHARCUTERÍA & CHEESE BOARDS ------------------------- */
  R({
    id: "charc-board",
    category: "charcuterie",
    price: 75,
    nameEn: "Charcutería Board",
    nameAr: "لوح من اللحوم الباردة",
    image: "images/charc-board.jpg",
    platingNotes: "Available for wine pairing — Red: Masia J Merlot · White: Masia J Sauvignon Blanc (AED 50/glass · AED 200/bottle).",
    allergens: ["D", "G"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Board assembly",
        draft: true,
        ingredients: [
          "Mixed Spanish León cured beef, sliced - 60g", "Manchego-style cheese - 40g",
          "Quince jelly - 20g", "Marinated olives - 15g", "Grapes - 40g", "Crackers or flatbread - 30g",
        ],
        method: [
          "Arrange the sliced cured beef in loose folds across one side of the board.",
          "Place the cheese wedge and quince jelly alongside.",
          "Fill remaining space with olives and grapes.",
          "Serve with crackers or flatbread on the side.",
        ],
      },
    ],
  }),
  R({
    id: "cheese-board",
    category: "charcuterie",
    price: 75,
    nameEn: "Cheese Board",
    nameAr: "لوح الجبن",
    image: "images/cheese-board.jpg",
    allergens: ["D", "G", "N"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Board assembly",
        draft: true,
        ingredients: [
          "Artisan cheese selection (soft, aged, blue) - 120g", "Quince jelly - 20g",
          "Mixed nuts - 20g", "Grapes - 40g", "Olives - 15g", "Crackers or flatbread - 30g",
        ],
        method: [
          "Arrange the cheeses across the board, softest to firmest.",
          "Add quince jelly, nuts, grapes and olives around the cheese.",
          "Serve with crackers or flatbread.",
        ],
      },
    ],
  }),

  /* ------------------------------- SALADS ------------------------------- */
  R({
    id: "nicoise",
    price: 75,
    category: "salads",
    nameEn: "Nicoise",
    nameAr: "سلطه النيسواز",
    image: "images/nicoise.jpg",
    allergens: ["S"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Olive Soil",
        draft: false,
        ingredients: ["Black olives - 500gr", "Flour - 40g", "Butter - 15g"],
        method: [
          "Preheat oven to 80-90°C. Spread pitted black olives evenly on a baking tray.",
          "Dry in the oven for 3 hours, checking every hour, until completely dry and crisp. Let cool.",
          "Blend into a coarse powder using a food processor.",
          "Combine olive powder with the 40g flour, stirring to distribute evenly.",
          "Add 15g cold, cubed butter and rub in with fingertips until the mixture resembles light, dry crumbs — do not overwork.",
          "For extra crispness: preheat oven to 140-150°C, spread the mixture on a tray and bake 8-10 minutes, stirring occasionally. Cool completely before using.",
        ],
      },
      {
        title: "Salad assembly",
        draft: true,
        ingredients: [
          "Fresh tuna loin - 160g (seared rare, sliced)",
          "Mixed lettuce / kale - 60g",
          "Green beans, blanched - 60g",
          "Purple potato, boiled - 80g",
          "Cherry tomatoes, halved - 40g",
          "Nicoise olives - 20g",
          "Soft poached egg - 1 pc",
          "Olive vinaigrette - 20ml",
          "Olive soil (above) - to garnish",
        ],
        method: [
          "Sear the tuna loin hard on all sides so the centre stays rare; rest, then slice.",
          "Toss lettuce, green beans, potato and tomatoes with olive vinaigrette; arrange on the plate.",
          "Top with sliced tuna, olives and the soft poached egg.",
          "Finish with a scatter of olive soil.",
        ],
      },
    ],
  }),
  R({
    id: "caesar-salad",
    price: 55,
    category: "salads",
    nameEn: "Void Caesar",
    nameAr: "فويد سيزار",
    image: "images/caesar-salad.jpg",
    allergens: ["G", "D", "S"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Caesar Dressing",
        draft: false,
        ingredients: [
          "Mayonnaise - 460g", "Parmigiano - 100g", "Lemon juice - 60g",
          "Dijon mustard - 24g", "Worcestershire sauce - 24g", "Garlic - 24g",
          "Anchovy fillets - 32g", "Black pepper - 2g", "Salt - 4g",
        ],
        method: [
          "Mash the 24g garlic and 32g anchovies together with the side of a knife until a smooth paste forms.",
          "Weigh the mayonnaise, lemon juice, mustard and Worcestershire sauce into a bowl.",
          "Add the garlic-anchovy paste and whisk until completely smooth.",
          "Fold in the Parmesan and black pepper.",
        ],
      },
      {
        title: "Salad assembly",
        draft: true,
        ingredients: [
          "Local romaine lettuce, torn - 150g",
          "Caesar dressing (above) - 40g",
          "Sourdough croutons - 20g",
          "Shaved parmesan - 10g",
          "Optional add-on: grilled chicken +20 / salmon +30 / shrimp +30",
        ],
        method: [
          "Toss the romaine with the Caesar dressing until evenly coated.",
          "Plate, top with croutons and shaved parmesan.",
          "Add grilled protein on top if requested.",
        ],
      },
    ],
  }),
  R({
    id: "eat-your-greens",
    price: 55,
    category: "salads",
    nameEn: "Eat Your Greens",
    nameAr: "سلطة الخضروات",
    image: "images/eat-your-greens.jpg",
    allergens: ["Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Lemon Dressing",
        draft: false,
        ingredients: [
          "Lemon juice - 300g", "American mustard - 90g", "Corn oil - 300g",
          "Salt - 6g", "Xanthan gum - 1g",
        ],
        method: ["Put everything in the same bowl and blend using a whisk."],
      },
      {
        title: "Salad assembly",
        draft: true,
        ingredients: [
          "Avocado, sliced - 1/2 pc", "Cooked quinoa - 60g",
          "Charred asparagus - 4 spears", "Mange tout, blanched - 40g",
          "Broccoli florets, blanched - 40g", "Pumpkin seeds, toasted - 10g",
          "Lemon dressing (above) - 20ml",
        ],
        method: [
          "Char the asparagus on a hot grill/plancha.",
          "Arrange quinoa, mange tout and broccoli on the plate.",
          "Fan the avocado and asparagus on top.",
          "Dress with the lemon dressing and finish with toasted pumpkin seeds.",
        ],
      },
    ],
  }),
  R({
    id: "panzanella",
    price: 45,
    category: "salads",
    nameEn: "Panzanella",
    nameAr: "بانزانيلا",
    image: "images/panzanella.jpg",
    allergens: ["D", "G", "S"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Gazpacho (dressing)",
        draft: false,
        ingredients: [
          "Fresh red tomato - 750g", "Cucumber - 200g", "Red pepper - 152g",
          "Garlic, small - 2 cloves", "Onion - 40g", "Bread (crystal) - 75g",
          "Jalapeño - 20g", "Tomato jus - 330g", "Apple cider vinegar - 1 small cup",
          "Sambal oelek - 8g", "Salt - 15g", "Black pepper - 10 turns",
        ],
        method: [
          "Put everything in the same bowl, mix, and refrigerate overnight.",
          "Blend on high speed, then strain, remove air, and store.",
        ],
      },
      {
        title: "Salad assembly",
        draft: true,
        ingredients: [
          "Cherry tomatoes, halved - 100g", "Nicoise olives - 15g",
          "Capsicum, diced - 30g", "Red onion, sliced thin - 15g",
          "Crunchy sourdough croutons - 40g", "Anchovy fillets - 3 pc",
          "Gazpacho dressing (above) - 40ml",
        ],
        method: [
          "Toss tomatoes, capsicum, onion and croutons with the gazpacho dressing.",
          "Plate and top with anchovy fillets.",
        ],
      },
    ],
  }),

  /* --------------------------- MEZZE / LOCAL --------------------------- */
  R({
    id: "hummus",
    price: 40,
    category: "mezze",
    nameEn: "Hummus",
    nameAr: "حمص",
    image: "images/hummus.jpg",
    allergens: ["N", "Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Hummus",
        draft: false,
        ingredients: [
          "Cooked chickpeas - 2kg", "Tahini - 480g", "Fresh lemon juice - 100g",
          "Lemon salt - 50g", "Fresh garlic - 2pc", "Confit garlic - 6pc",
          "Corn oil - 120g", "Salt - 12g", "Ice-cold water - 200g",
        ],
        method: [
          "In a food processor, blend garlic, lemon juice and salt first. Let sit 5 minutes to mellow the garlic.",
          "Add tahini and blend until creamy.",
          "Slowly drizzle in ice-cold water while blending until fluffy.",
          "Add chickpeas and process until super smooth.",
          "Stream in the oil and blend again for 2 minutes.",
        ],
      },
      {
        title: "Chickpea prep (batch note)",
        draft: false,
        ingredients: ["For 10kg chickpeas: 40g baking soda total"],
        method: [
          "Soaking: 20g baking soda (2g per 1kg chickpeas) in plenty of water. Soak overnight, at least 12 hours, then rinse thoroughly.",
          "Cooking: add another 20g baking soda (2g per 1kg) to the cooking water. Boil and simmer until soft and tender. Rinse well after cooking to remove excess soda taste.",
        ],
      },
    ],
  }),
  R({
    id: "moutabel",
    price: 40,
    category: "mezze",
    nameEn: "Moutabel",
    nameAr: "متبل",
    image: "images/moutabel.jpg",
    allergens: ["D", "V"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Moutabel",
        draft: false,
        ingredients: [
          "Eggplant, grilled & peeled - 1500g", "Tahini - 350g", "Yoghurt - 600g",
          "Garlic, chopped - 18g", "Garlic powder - 15g", "Salt - 25g",
        ],
        method: ["Put everything in the same bowl and blend using a whisk."],
      },
    ],
  }),
  R({
    id: "muhammara",
    price: 40,
    category: "mezze",
    nameEn: "Muhammara",
    nameAr: "محمرة",
    image: "images/muhammara.jpg",
    allergens: ["N", "V"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Muhammara",
        draft: false,
        ingredients: [
          "Roasted red bell peppers - 600g", "Walnuts, toasted - 250g",
          "Breadcrumbs - 80g", "Pomegranate molasses - 50g",
          "Extra virgin olive oil - 50ml", "Garlic, minced - 10g",
          "Ground cumin - 5g", "Smoked paprika - 5g",
          "Aleppo pepper or red chili flakes - 2.5g", "Salt - 5g + 5g",
          "Lemon juice - 20ml",
        ],
        method: [
          "Roast the peppers: preheat the Mibrasa; while charcoal is burning, grill peppers till skin is black, turning occasionally. Transfer to a bowl, cover, and steam for 10 minutes. Peel and remove seeds.",
          "Toast the walnuts in a dry pan over medium heat for 3-5 minutes until fragrant. Cool slightly.",
          "In a food processor, combine roasted peppers, toasted walnuts, breadcrumbs, pomegranate molasses, olive oil, garlic, cumin, paprika, Aleppo pepper, salt and lemon juice. Blend.",
        ],
      },
    ],
  }),
  R({
    id: "fattoush",
    price: 55,
    category: "mezze",
    nameEn: "Fattoush",
    nameAr: "فتوش",
    image: "images/fattoush.jpg",
    allergens: ["G", "Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Salad",
        draft: false,
        ingredients: [
          "Fried pita bread, cut into small pieces", "Romaine lettuce, chopped",
          "Cucumbers, diced", "Cherry tomatoes, halved", "Radishes, thinly sliced",
          "Green bell pepper, diced (optional)", "Fresh parsley, chopped",
          "Fresh mint leaves, chopped", "Fresh za'atar leaves", "Pomegranate molasses",
        ],
      },
      {
        title: "Method",
        draft: true,
        ingredients: [],
        method: [
          "Toss the lettuce, cucumber, tomato, radish and pepper together.",
          "Add the chopped herbs and fried pita.",
          "Dress with pomegranate molasses (and olive oil to taste) just before serving so the pita stays crisp.",
        ],
      },
    ],
  }),
  R({
    id: "falafel",
    price: 50,
    category: "mezze",
    nameEn: "Falafel",
    nameAr: "فلافل",
    image: "images/falafel.jpg",
    allergens: ["N", "V"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Tahina Yoghurt Sauce",
        draft: false,
        ingredients: [
          "Hung yoghurt - 250g", "Tahini - 125g", "Confit garlic, minced - 2",
          "Lemon juice - 35g", "Olive oil - 15g", "Salt - 4g",
        ],
        method: ["Put everything in the same bowl and blend."],
      },
      {
        title: "Falafel mix",
        draft: true,
        ingredients: [
          "Dried chickpeas, soaked 24h - 1kg", "Fresh coriander - 40g",
          "Fresh parsley - 40g", "Onion - 150g", "Garlic - 20g",
          "Ground cumin - 10g", "Ground coriander - 10g", "Baking powder - 8g",
          "Salt - 15g", "Chili flakes - to taste",
        ],
        method: [
          "Do not pre-cook the chickpeas — soak them raw for 24 hours, then drain well.",
          "Pulse chickpeas, herbs, onion and garlic in a food processor to a coarse, not smooth, paste.",
          "Mix in the spices, salt and baking powder; rest the mix chilled for at least 30 minutes.",
          "Portion and shape, then deep fry at 175°C until deep golden and crisp, about 3-4 minutes.",
          "Serve with the tahina yoghurt sauce.",
        ],
      },
    ],
  }),
  R({
    id: "hot-mezze-platter",
    price: 55,
    category: "mezze",
    nameEn: "Hot Mezze Platter",
    nameAr: "طبق المقبلات الساخنة",
    image: "images/hot-mezze-platter.jpg",
    allergens: ["D", "G", "N"],
    allergensSource: "unverified-menu",
    chefNotes:
      "Platter is composed of Kibbeh, Cheese Rakakat, Spinach Sambousek and Falafel (see Falafel recipe) — the kibbeh, rakakat and sambousek recipes are not yet in the source book and need to be added by the kitchen.",
    components: [
      {
        title: "Tahini Sauce",
        draft: false,
        ingredients: [
          "Hung yoghurt - 250g", "Tahini - 125g", "Confit garlic, minced - 2",
          "Lemon juice - 35g", "Olive oil - 15g", "Salt - 4g",
        ],
        method: ["Put everything in the same bowl and blend."],
      },
    ],
  }),

  /* ------------------------------- SNACKS ------------------------------- */
  R({
    id: "guacamole",
    price: 65,
    category: "snacks",
    nameEn: "Guacamole",
    nameAr: "جواكامولي",
    image: "images/guacamole.jpg",
    allergens: ["Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Guacamole",
        draft: false,
        ingredients: [
          "Avocado, whole - 340g (240g peeled)", "Tomato - 12g",
          "Lime juice - 8g", "Salt - 2.6g",
        ],
        method: ["Put everything in the same bowl and mash."],
      },
    ],
  }),
  R({
    id: "croquettes",
    price: 35,
    category: "snacks",
    nameEn: "Croquettes",
    nameAr: "كروكيت",
    image: "images/croquettes.jpg",
    allergens: ["D", "G", "V"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Manchego béchamel",
        draft: true,
        ingredients: [
          "Butter - 60g", "Flour - 60g", "Milk, warm - 500ml",
          "Manchego cheese, grated - 200g", "Salt - to taste", "Nutmeg - a pinch",
        ],
        method: [
          "Melt butter, whisk in flour to make a roux, cook 2 minutes without colouring.",
          "Gradually whisk in warm milk until thick and smooth.",
          "Off the heat, stir in the grated Manchego until melted; season with salt and nutmeg.",
          "Spread onto a tray, cover directly with cling film and chill until firm (ideally overnight).",
        ],
      },
      {
        title: "Panade & fry",
        draft: true,
        ingredients: [
          "Flour, for dredging", "Egg wash", "Panko breadcrumbs", "Oil, for deep frying",
          "Paprika aioli, to serve",
        ],
        method: [
          "Portion the chilled béchamel and roll into croquette shapes.",
          "Pass through flour, then egg wash, then panko.",
          "Deep fry at 180°C until golden and hot through, 2-3 minutes.",
          "Finish with grated Manchego and serve with paprika aioli.",
        ],
      },
    ],
  }),
  R({
    id: "empanada",
    price: 45,
    category: "snacks",
    nameEn: "Empanada",
    nameAr: "إمبانادا",
    image: "images/empanada.jpg",
    allergens: ["D", "G"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Dough",
        draft: false,
        ingredients: [
          "Masa flour - 1kg", "Salt - 10g", "Sugar - 10g", "Water - 1300ml", "Butter - 100g",
        ],
        method: [
          "Combine masa flour, salt and sugar.",
          "Melt the butter into the water, then work into the dry mix until a smooth dough forms.",
          "Rest the dough, covered, before portioning and rolling.",
        ],
      },
      {
        title: "Beef filling",
        draft: true,
        ingredients: [
          "Beef, minced or finely diced - 600g", "Onion, diced - 150g",
          "Garlic, minced - 15g", "Saffron - a pinch", "Smoked paprika - 5g",
          "Salt & pepper - to taste", "Saffron aioli, to serve",
        ],
        method: [
          "Sauté onion and garlic until soft, add beef and brown well.",
          "Season with saffron, paprika, salt and pepper; cook until the filling is dry enough to hold its shape. Cool before filling.",
          "Fill and fold the dough discs, seal edges, deep fry until golden.",
          "Finish with grated cheese and serve with saffron aioli.",
        ],
      },
    ],
  }),
  R({
    id: "bao-buns",
    price: 55,
    category: "snacks",
    nameEn: "Bao Buns",
    nameAr: "كعك الباو",
    image: "images/bao-buns.jpg",
    allergens: ["D", "G"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Chicken filling",
        draft: true,
        ingredients: [
          "Chicken thigh, boneless - 1kg", "Chipotle in adobo, blended - 80g",
          "Onion, sliced - 150g", "Garlic - 20g", "Chicken stock - 200ml",
          "Brown sugar - 20g", "Salt - to taste",
        ],
        method: [
          "Sear the chicken thighs, then braise with chipotle, onion, garlic, stock and sugar until tender enough to shred.",
          "Shred the chicken and reduce the braising liquid to glaze it back through.",
        ],
      },
      {
        title: "Assembly",
        draft: true,
        ingredients: [
          "Steamed bao buns - 2 pc", "Pickled red onion", "Micro coriander / cress",
        ],
        method: [
          "Steam the bao buns until warm and pillowy.",
          "Fill with the glazed chicken, top with pickled onion and micro herbs.",
        ],
      },
    ],
  }),
  R({
    id: "dakgangjeong",
    price: 50,
    category: "snacks",
    nameEn: "Dakgangjeong",
    nameAr: "داكانج جونج",
    image: "images/dakgangjeong.jpg",
    allergens: ["D", "G", "N"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Sauce",
        draft: true,
        ingredients: [
          "Gochujang - 150g", "Honey - 80g", "Soy sauce - 60ml",
          "Garlic, minced - 20g", "Ginger, minced - 10g", "Rice vinegar - 20ml",
        ],
        method: ["Whisk all ingredients together and warm gently until glossy; keep warm for service."],
      },
      {
        title: "Starch coating",
        draft: true,
        ingredients: ["Potato starch - 300g", "Corn starch - 100g", "Salt - 10g", "White pepper - 5g"],
        method: ["Combine into an even dredging mix."],
      },
      {
        title: "Marinate, fry & serve",
        draft: false,
        ingredients: [
          "Chicken thigh, cut 1x2", "Milk, to marinate", "Garlic, to marinate",
          "Roasted peanuts, crushed, to garnish", "Pickled red cabbage, to garnish",
        ],
        method: [
          "Cut chicken thigh into 1x2 pieces, marinate with milk and garlic overnight, then portion and freeze.",
          "Serving: coat chicken in the starch mix and deep fry.",
          "Once crispy and cooked, coat with the sauce (kept warm) while the chicken is cooked.",
          "Put on the plate and garnish with peanuts and pickled red cabbage.",
        ],
      },
    ],
  }),
  R({
    id: "prawn-tempura",
    price: 65,
    category: "snacks",
    nameEn: "Prawn Tempura",
    nameAr: "تمبورا الروبيان",
    image: "images/prawn-tempura.jpg",
    allergens: ["G", "S"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Tempura batter",
        draft: true,
        ingredients: [
          "Tempura flour - 200g", "Ice-cold sparkling water - 300ml", "Ice cubes - a handful",
        ],
        method: ["Whisk flour and ice-cold water together lightly, just until combined — a few lumps are fine. Keep over ice."],
      },
      {
        title: "Fry & serve",
        draft: true,
        ingredients: ["Prawns, peeled & deveined, tail on - 6 pc", "Oil, for deep frying", "Sweet chili sauce, to serve"],
        method: [
          "Dust the prawns in dry flour, then dip in the tempura batter.",
          "Deep fry at 180°C until light golden and crisp, about 2 minutes.",
          "Drain and serve immediately with sweet chili sauce.",
        ],
      },
    ],
  }),
  R({
    id: "calamari",
    price: 50,
    category: "snacks",
    nameEn: "Calamari",
    nameAr: "كالاماري",
    image: "images/calamari.jpg",
    allergens: ["G", "S"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Calamari",
        draft: true,
        ingredients: [
          "Squid, cleaned, cut into rings - 500g", "Flour, seasoned - 300g",
          "Oil, for deep frying", "Garlic aioli, to serve", "Lemon wedge, to serve",
        ],
        method: [
          "Pat the squid rings dry, dredge in seasoned flour, shaking off excess.",
          "Deep fry at 190°C until light golden and crisp, about 90 seconds — do not overcook.",
          "Drain, season with salt, serve immediately with garlic aioli and lemon.",
        ],
      },
    ],
  }),
  R({
    id: "edamame",
    price: 35,
    category: "snacks",
    nameEn: "Edamame",
    nameAr: "اداماماي",
    image: "images/edamame.jpg",
    allergens: ["Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Edamame",
        draft: true,
        ingredients: ["Edamame in pod, frozen - 250g", "Maldon salt - to finish"],
        method: [
          "Blanch edamame in well-salted boiling water for 3-4 minutes.",
          "Drain well and toss with Maldon salt. Serve hot.",
        ],
      },
    ],
  }),

  R({
    id: "padron",
    category: "snacks",
    price: 35,
    nameEn: "Padrón",
    nameAr: "بادرون",
    image: "images/padron.jpg",
    allergens: ["Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Padrón peppers",
        draft: true,
        ingredients: ["Padrón peppers - 100g", "Olive oil - 15ml", "Maldon salt, to finish"],
        method: [
          "Heat a splash of olive oil in a hot pan or plancha until almost smoking.",
          "Add the whole peppers and blister on all sides, tossing frequently, 3-4 minutes.",
          "Remove, drain excess oil, and finish with a generous scatter of Maldon salt.",
          "Serve immediately while blistered and hot.",
        ],
      },
    ],
  }),

  /* ------------------------------- PASTAS ------------------------------- */
  R({
    id: "bolognese",
    price: 110,
    category: "pastas",
    nameEn: "Bolognese",
    nameAr: "بولونيز",
    image: "images/bolognese.jpg",
    chefNotes: "Batch recipe as written in the prep book — scale down for service as needed.",
    allergens: ["D", "G"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Ragu (batch)",
        draft: false,
        ingredients: [
          "Beef mince - 30 kg", "Oil - 300ml", "Carrot - 1kg", "Celery - 1kg",
          "Onion - 1kg", "Garlic - 500g", "Peeled tomato - 4kg", "Tomato paste - 2kg",
          "Oregano - 100g", "Fresh rosemary - 100g", "Salt - 300g", "Pepper - 100g",
          "Stock - 4L", "Bay leaves - 8pc",
        ],
      },
      {
        title: "Tomato sauce (batch)",
        draft: false,
        ingredients: [
          "Peeled tomatoes - 10 tins", "Tomato paste - 1.5kg", "Olive oil - 300ml",
          "Garlic - 300g", "Onion - 650g", "Salt - 300g", "Sugar - 500g",
          "Black pepper - 25g", "Oregano - 25g", "Fresh basil leaves - 85g",
        ],
      },
      {
        title: "Method",
        draft: true,
        ingredients: [],
        method: [
          "Sweat the diced carrot, celery, onion and garlic in oil until soft.",
          "Add the beef mince and brown thoroughly.",
          "Stir in tomato paste, cook out for a few minutes, then add peeled tomatoes, stock, herbs and bay leaves.",
          "Simmer gently until rich and reduced, seasoning to taste. Finish with the tomato sauce to loosen as needed.",
        ],
      },
    ],
  }),
  R({
    id: "pesto-3ps",
    price: 95,
    category: "pastas",
    nameEn: "3 P's (Pesto, Pine Nuts, Parmesan)",
    nameAr: "3 ب",
    image: "images/pesto-3ps.jpg",
    allergens: ["D", "G", "N"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Basil Pesto",
        draft: false,
        ingredients: [
          "Basil leaves - 500g", "Olive oil - 250g", "Parmesan - 200g",
          "Pine nuts - 100g", "Garlic - 7g", "Salt - 15g",
        ],
        method: ["Put everything in the same bowl and blend."],
      },
      {
        title: "Pasta assembly",
        draft: true,
        ingredients: ["Penne (or pasta of choice), cooked - 300g", "Basil pesto (above) - 90g", "Toasted pine nuts, to finish", "Shaved parmesan, to finish"],
        method: ["Toss hot cooked pasta with the pesto, loosening with a splash of pasta water. Plate and finish with pine nuts and shaved parmesan."],
      },
    ],
  }),

  R({
    id: "del-mar",
    category: "pastas",
    price: 165,
    nameEn: "Del Mar",
    nameAr: "دي مار",
    image: "images/del-mar.jpg",
    allergens: ["D", "G", "S"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Seafood ragu & pasta",
        draft: true,
        ingredients: [
          "Tagliatelle (or pasta of choice) - 120g", "Shrimp, peeled - 4-5 pc",
          "Mussels, cleaned - 4-5 pc", "Clams, cleaned - 4-5 pc", "Scallop - 2-3 pc",
          "Tomato sauce - 100g", "Garlic, sliced - 5g", "Olive oil - 15ml", "Fresh chives, to finish",
        ],
        method: [
          "Sauté garlic in olive oil until fragrant.",
          "Add mussels and clams with a splash of water, cover and steam until they open.",
          "Add shrimp and scallop, cook briefly, then stir in the tomato sauce and simmer.",
          "Toss with cooked pasta, adding pasta water to loosen if needed.",
          "Plate with the shellfish arranged on top and finish with chives.",
        ],
      },
    ],
  }),

  /* --------------------------- BURGER & SANDWICHES --------------------------- */
  R({
    id: "thermidor",
    price: 75,
    category: "sandwiches",
    nameEn: "Thermidor — Californian Creamy Shrimp Hotdog",
    nameAr: "ثيرميدور",
    image: "images/thermidor.jpg",
    allergens: ["D", "G", "S"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Creamy shrimp filling",
        draft: true,
        ingredients: [
          "Shrimp, poached & chopped - 300g", "Mayonnaise - 100g", "Dijon mustard - 15g",
          "Butter - 30g", "Flour - 20g", "Milk - 100ml", "Grated cheese - 60g",
          "Fresh dill, chopped - to taste", "Lemon juice - to taste",
        ],
        method: [
          "Poach the shrimp gently, cool, and chop.",
          "Make a light béchamel with butter, flour and milk; fold in mayonnaise, mustard and grated cheese.",
          "Fold the chopped shrimp through the sauce; season with lemon juice and dill.",
        ],
      },
      {
        title: "Assembly",
        draft: true,
        ingredients: ["Potato hotdog bun - 1 pc", "Grated cheese, to gratin", "Fresh dill, to finish"],
        method: [
          "Split the potato bun, fill generously with the shrimp thermidor mix.",
          "Top with grated cheese and gratin under the salamander until bubbling and golden.",
          "Finish with fresh dill.",
        ],
      },
    ],
  }),
  R({
    id: "bocadillo",
    price: 70,
    category: "sandwiches",
    nameEn: "Bocadillo",
    nameAr: "بوكا ديلو",
    image: "images/bocadillo.jpg",
    allergens: ["D", "G"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Bocadillo",
        draft: true,
        ingredients: [
          "Baguette - 1 pc", "Aged dry Spanish beef (cecina), sliced - 60g",
          "Manchego cheese, sliced - 40g", "Marinated piquillo peppers - 30g",
          "Tomato, sliced - 2 slices", "Burrata - 40g", "Olive oil, to finish",
        ],
        method: [
          "Split and lightly toast the baguette.",
          "Layer tomato, burrata, cecina, Manchego and marinated peppers.",
          "Drizzle with olive oil, close, press lightly and slice to serve.",
        ],
      },
    ],
  }),
  R({
    id: "mcme",
    price: 95,
    category: "sandwiches",
    nameEn: "McME",
    nameAr: "ماك مي",
    image: "images/mcme.jpg",
    allergens: ["D", "G"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Patty & assembly",
        draft: true,
        ingredients: [
          "Wagyu beef patty - 180g", "Potato bun - 1 pc", "Cheese slice - 1 pc",
          "Piquillo peppers, marinated - 20g", "Tomato, sliced - 2 slices",
          "Cucumber pickles, sliced - 4 slices", "Lettuce - 1 leaf", "Burger sauce - to taste",
        ],
        method: [
          "Grill the Wagyu patty to order, melting the cheese over it in the final minute.",
          "Toast the potato bun.",
          "Build: sauce, lettuce, tomato, patty with cheese, piquillo peppers, pickles, top bun.",
        ],
      },
    ],
  }),

  /* ------------------------------- MAIN COURSE ------------------------------- */
  R({
    id: "cachopo",
    price: 115,
    category: "mains",
    nameEn: "Cachopo",
    nameAr: "كاتشوبو",
    chefNotes: "No reference photo available in the source book for this dish.",
    allergens: ["D", "G"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Cachopo",
        draft: true,
        ingredients: [
          "Chicken breast, butterflied - 1 pc", "Beef cecina, sliced - 40g",
          "Manchego / cheese, sliced - 40g", "Piquillo peppers, sliced - 20g",
          "Flour, egg wash, breadcrumbs, for panade", "Oil, for frying",
          "Potato fries, to serve",
        ],
        method: [
          "Butterfly and flatten the chicken breast; layer cecina, cheese and piquillo peppers inside, then fold closed.",
          "Pass through flour, egg wash and breadcrumbs.",
          "Shallow or deep fry until golden and cooked through.",
          "Rest briefly, slice, and serve with potato fries.",
        ],
      },
    ],
  }),
  R({
    id: "beef-jus",
    price: null,
    category: "sauces",
    nameEn: "Veal / Beef Jus",
    nameAr: "",
    image: "images/beef-jus.jpg",
    allergens: [],
    allergensSource: "none",
    components: [
      {
        title: "Veal Jus",
        draft: false,
        ingredients: [
          "Celery - 3kg", "Carrot - 5kg", "Leek - 2kg", "Garlic - 500g",
          "Brown onion - 7.5kg", "Tomato paste - 700g", "Red wine - 1.5L",
        ],
        method: [
          "Roast the mirepoix (celery, carrot, leek, onion, garlic) until deeply caramelised.",
          "Stir in tomato paste and cook out.",
          "Deglaze with red wine and reduce.",
          "Add veal/beef stock and simmer to a sauce consistency, skimming regularly. Strain before use.",
        ],
      },
    ],
  }),
  R({
    id: "mashed-potato",
    price: 30,
    category: "mains",
    nameEn: "Mashed Potato",
    nameAr: "بطاطس مهروسة",
    chefNotes: "No reference photo available in the source book for this dish.",
    allergens: ["D", "V"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Mashed Potato",
        draft: true,
        ingredients: [
          "Potatoes, peeled - 1kg", "Butter - 150g", "Cream - 150ml", "Milk - 100ml", "Salt - to taste",
        ],
        method: [
          "Boil the potatoes from cold, salted water until tender.",
          "Drain well and pass through a ricer while hot.",
          "Beat in warm butter, cream and milk until smooth. Season with salt.",
        ],
      },
    ],
  }),
  R({
    id: "la-mediterranea",
    price: 145,
    category: "mains",
    nameEn: "La Mediterranea",
    nameAr: "لا ميديتيرانيا",
    image: "images/la-mediterranea.jpg",
    allergens: ["D", "G", "S"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Orzo",
        draft: true,
        ingredients: [
          "Orzo pasta - 250g", "Beef chorizo, diced - 100g", "Onion, diced - 60g",
          "Garlic - 15g", "Tomato, diced - 150g", "Fish or chicken stock - 400ml",
          "Olive oil - 30ml", "Salt & pepper - to taste",
        ],
        method: [
          "Sweat onion, garlic and chorizo in olive oil until the chorizo releases its oil.",
          "Add the orzo and tomato, toast briefly, then add stock gradually, stirring risotto-style until al dente and creamy.",
        ],
      },
      {
        title: "Salmon & plating",
        draft: true,
        ingredients: ["Salmon fillet, skin on - 200g", "Olive oil, salt", "Fresh herbs, to finish"],
        method: [
          "Pan-sear the salmon skin-side down until crisp, then finish skin-side up to the desired doneness.",
          "Spoon the orzo onto the plate, top with the salmon, and finish with fresh herbs.",
        ],
      },
    ],
  }),
  R({
    id: "nasi-goreng",
    price: 180,
    category: "mains",
    nameEn: "Nasi Goreng",
    nameAr: "ناسي جورينج",
    image: "images/nasi-goreng.jpg",
    allergens: ["D", "N", "S", "Soy"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Fried rice",
        draft: true,
        ingredients: [
          "Cooked jasmine rice, chilled - 400g", "Chicken, diced - 100g",
          "Shrimp, peeled - 100g", "Garlic, minced - 15g", "Shallot, minced - 20g",
          "Kecap manis - 40ml", "Sambal - 20g", "Soy sauce - 15ml", "Egg - 1 pc",
        ],
        method: [
          "Stir-fry garlic and shallot, add chicken and shrimp and cook through.",
          "Add the cold rice, breaking up clumps, and fry over high heat.",
          "Season with kecap manis, sambal and soy sauce until well coloured and fragrant.",
        ],
      },
      {
        title: "Garnish & plating",
        draft: true,
        ingredients: [
          "Fried egg, sunny side up - 1 pc", "Chicken satay skewer - 1 pc",
          "Prawn crackers - 3-4 pc", "Peanut sauce - 30g",
          "Pickled cauliflower, carrot and cucumber, to garnish",
        ],
        method: [
          "Mound the fried rice on the plate, top with the fried egg.",
          "Arrange the satay skewer, prawn crackers and pickles alongside.",
          "Serve peanut sauce on the side.",
        ],
      },
    ],
  }),

  R({
    id: "pinchos-chicken",
    category: "mains",
    price: 110,
    nameEn: "Pinchos Chicken",
    nameAr: "بينشوس دجاج",
    image: "images/pinchos-chicken.jpg",
    allergens: ["D"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Chicken skewers",
        draft: true,
        ingredients: [
          "Chicken thigh, cubed - 180g", "Marinade — oil, garlic, paprika, lemon",
          "Garden salad mix - 60g", "Sliced onion - 20g", "Pickles - 20g",
        ],
        method: [
          "Marinate the chicken cubes for at least 2 hours.",
          "Thread onto skewers and grill over high heat, turning until charred and cooked through.",
          "Plate with a garden salad, sliced onion and pickles alongside.",
        ],
      },
    ],
  }),
  R({
    id: "pinchos-beef",
    category: "mains",
    price: 135,
    nameEn: "Pinchos Beef",
    nameAr: "بينشوس لحم بقري",
    image: "images/pinchos-beef.jpg",
    allergens: ["D"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Beef skewers",
        draft: true,
        ingredients: [
          "Beef sirloin, cubed - 180g", "Marinade — oil, garlic, herbs",
          "Garden salad mix - 60g", "Sliced onion - 20g", "Pickles - 20g",
        ],
        method: [
          "Marinate the beef cubes briefly with oil, garlic and herbs.",
          "Thread onto skewers and grill to the desired doneness, turning for even charring.",
          "Rest briefly, then plate with garden salad, onion and pickles.",
        ],
      },
    ],
  }),
  R({
    id: "pinchos-shrimp",
    category: "mains",
    price: 150,
    nameEn: "Pinchos Shrimp",
    nameAr: "بينشوس جمبري",
    image: "images/pinchos-shrimp.jpg",
    allergens: ["D", "S"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Shrimp skewers",
        draft: true,
        ingredients: [
          "Shrimp, peeled & deveined - 180g", "Marinade — oil, garlic, chili, lemon",
          "Garden salad mix - 60g", "Sliced onion - 20g", "Pickles - 20g",
        ],
        method: [
          "Marinate the shrimp briefly.",
          "Thread onto skewers and grill over high heat until just cooked through, about 1-2 minutes per side.",
          "Plate with garden salad, onion and pickles alongside.",
        ],
      },
    ],
  }),

  /* ------------------------------- SIDE DISHES ------------------------------- */
  R({
    id: "sauteed-vegetables",
    category: "sides",
    price: 30,
    nameEn: "Sautéed Vegetables",
    nameAr: "خضروات مقلية",
    image: "images/sauteed-vegetables.jpg",
    allergens: ["Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Sautéed vegetables",
        draft: true,
        ingredients: ["Asparagus - 40g", "Broccoli - 40g", "Carrot - 30g", "Green beans - 30g", "Butter or olive oil - 10g"],
        method: [
          "Blanch the vegetables briefly in salted boiling water.",
          "Sauté in butter or olive oil over high heat until tender-crisp.",
          "Season and serve immediately.",
        ],
      },
    ],
  }),
  R({
    id: "mixed-side-salad",
    category: "sides",
    price: 30,
    nameEn: "Mixed Side Salad",
    nameAr: "سلطة مختلطة",
    image: "images/mixed-side-salad.jpg",
    allergens: ["Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Mixed salad",
        draft: true,
        ingredients: ["Mixed lettuce leaves - 80g", "Cherry tomato - 30g", "Asparagus - 20g", "Olive oil dressing - 15ml"],
        method: [
          "Toss the lettuce, tomato and asparagus together.",
          "Dress lightly with olive oil vinaigrette just before serving.",
        ],
      },
    ],
  }),
  R({
    id: "steamed-rice",
    category: "sides",
    price: 30,
    nameEn: "Steamed Rice",
    nameAr: "أرز مطهو على البخار",
    image: "images/steamed-rice.jpg",
    allergens: ["Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Steamed rice",
        draft: true,
        ingredients: ["Basmati rice - 180g", "Water or stock - 260ml", "Salt, a pinch"],
        method: [
          "Rinse the rice until the water runs clear.",
          "Cook by absorption or steamer until tender and fluffy.",
          "Fluff with a fork before serving.",
        ],
      },
    ],
  }),
  R({
    id: "sweet-potato-fries",
    category: "sides",
    price: 30,
    nameEn: "Sweet Potato Fries",
    nameAr: "بطاطا حلوة مقلية",
    image: "images/sweet-potato-fries.jpg",
    allergens: ["Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Sweet potato fries",
        draft: true,
        ingredients: ["Sweet potato, cut into fries - 220g", "Frying oil", "Salt, to taste"],
        method: [
          "Cut sweet potato into even fries.",
          "Deep fry at 170-180°C until golden and cooked through, about 4-5 minutes.",
          "Drain, season with salt, and serve immediately.",
        ],
      },
    ],
  }),
  R({
    id: "french-fries",
    category: "sides",
    price: 30,
    nameEn: "French Fries",
    nameAr: "بطاطس مقلية",
    image: "images/french-fries.jpg",
    allergens: ["Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "French fries",
        draft: true,
        ingredients: ["Potato, cut into fries - 220g", "Frying oil", "Salt, to taste"],
        method: [
          "Cut potatoes into even fries and rinse to remove excess starch.",
          "Blanch-fry at 150°C until soft, then finish-fry at 180°C until golden and crisp.",
          "Drain, season with salt, and serve immediately.",
        ],
      },
    ],
  }),

  /* ------------------------------- SWEETS ------------------------------- */
  R({
    id: "umm-ali",
    category: "sweets",
    price: 45,
    nameEn: "Umm Ali",
    nameAr: "أم علي",
    image: "images/umm-ali.jpg",
    allergens: ["D", "G", "N", "V"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Umm Ali",
        draft: true,
        ingredients: [
          "Puff pastry, baked & torn - 60g", "Milk - 150ml", "Cream - 40ml", "Sugar - 20g",
          "Mixed nuts & raisins - 20g", "Coconut flakes, to garnish",
        ],
        method: [
          "Layer the torn puff pastry in an oven dish with nuts and raisins.",
          "Warm the milk, cream and sugar together, then pour over the pastry.",
          "Bake until bubbling and golden on top, then finish under the salamander for extra colour.",
          "Garnish with toasted coconut and serve warm.",
        ],
      },
    ],
  }),
  R({
    id: "kunafa",
    category: "sweets",
    price: 45,
    nameEn: "Kunafa",
    nameAr: "كنافة",
    image: "images/kunafa.jpg",
    allergens: ["D", "G", "N", "V"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Kunafa",
        draft: true,
        ingredients: [
          "Kunafa (kataifi) dough - 80g", "Butter, melted - 20g", "Pistachio, crushed - 15g",
          "Sugar syrup - 40g", "Cream (qishta) - 30g", "Rose water, a few drops",
        ],
        method: [
          "Toss the shredded kunafa dough with melted butter.",
          "Press into a mould with a layer of cream in the centre, then top with more dough.",
          "Bake or pan-fry until golden and crisp.",
          "Unmould, soak with sugar syrup, and finish with crushed pistachio and rose water.",
        ],
      },
    ],
  }),
  R({
    id: "tres-leches",
    category: "sweets",
    price: 45,
    nameEn: "Tres Leches",
    nameAr: "تري ليتشي",
    image: "images/tres-leches.jpg",
    allergens: ["D", "G", "N", "V"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Tres Leches cake",
        draft: true,
        ingredients: [
          "Sponge cake base - 100g", "Whole milk - 60ml", "Evaporated milk - 40ml",
          "Condensed milk - 40g", "Cream, whipped - 50ml", "Vanilla, to taste", "Cinnamon or crumble, to garnish",
        ],
        method: [
          "Bake a light sponge cake and let it cool.",
          "Whisk together the three milks and soak generously into the cake.",
          "Chill until fully absorbed.",
          "Top with whipped cream and finish with a light dusting of cinnamon or crumble.",
        ],
      },
    ],
  }),
  R({
    id: "guilty",
    category: "sweets",
    price: 60,
    nameEn: "Guilty",
    nameAr: "جيلتي",
    image: "images/guilty.jpg",
    allergens: ["D", "G", "N", "V"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Chocolate fondant",
        draft: true,
        ingredients: [
          "Dark chocolate 72% - 80g", "Butter - 40g", "Sugar - 30g", "Eggs - 2 pc",
          "Flour - 20g", "Icing sugar, to dust",
        ],
        method: [
          "Melt the chocolate and butter together.",
          "Whisk the eggs and sugar until pale, then fold into the chocolate mixture.",
          "Fold in the flour gently.",
          "Pour into buttered moulds and bake at high heat until the edges are set but the centre stays molten, about 8-10 minutes.",
          "Unmould, dust with icing sugar, and serve immediately.",
        ],
      },
    ],
  }),
  R({
    id: "waffle",
    category: "sweets",
    price: 50,
    nameEn: "Waffle",
    nameAr: "وافل",
    image: "images/waffle.jpg",
    allergens: ["D", "G", "N", "V"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Waffle",
        draft: true,
        ingredients: ["Waffle batter mix - 120g", "Date syrup - 25g", "Mixed berries - 50g", "Whipped cream, to finish"],
        method: [
          "Cook the batter in a hot waffle iron until golden and crisp.",
          "Plate and drizzle generously with date syrup.",
          "Top with mixed berries and a swirl of whipped cream.",
        ],
      },
    ],
  }),
  R({
    id: "torte-caprese",
    category: "sweets",
    price: 50,
    nameEn: "Torte Caprese (Gluten-Free)",
    nameAr: "تورتا كابريسي",
    image: "images/torte-caprese.jpg",
    allergens: ["D", "N", "V"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Torte Caprese",
        draft: true,
        ingredients: [
          "Ground almond - 70g", "72% Venezuelan chocolate - 60g", "Butter - 40g",
          "Sugar - 30g", "Eggs - 2 pc", "Vanilla, to taste",
        ],
        method: [
          "Melt the chocolate and butter together.",
          "Whisk eggs and sugar until pale and thick.",
          "Fold in the melted chocolate, ground almond and vanilla.",
          "Bake in a lined tin until just set with a slightly fudgy centre.",
          "Cool before slicing; serve with cream and berries.",
        ],
      },
    ],
  }),
  R({
    id: "five-a-day",
    category: "sweets",
    price: 50,
    nameEn: "Five A Day",
    nameAr: "فايف أ داي",
    image: "images/five-a-day.jpg",
    allergens: ["Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Seasonal fruit platter",
        draft: true,
        ingredients: ["Seasonal mixed fruit (melon, pineapple, dragon fruit, passionfruit, grapes) - 250g"],
        method: [
          "Cut the fruit into clean, uniform pieces.",
          "Arrange decoratively on a chilled plate.",
          "Serve immediately for freshness.",
        ],
      },
    ],
  }),

  /* ------------------------------- ICE CREAM & SORBET ------------------------------- */
  R({
    id: "ice-cream",
    category: "icecream",
    price: 25,
    nameEn: "Ice Cream",
    nameAr: "الآيس كريم",
    image: "images/ice-cream.jpg",
    platingNotes: "Flavors: Chocolate, Vanilla, Strawberry, Pistachio, Dates. 2 scoops AED 25 · 3 scoops AED 35.",
    allergens: ["D", "V"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Ice cream service",
        draft: true,
        ingredients: ["Ice cream, flavor of choice - 2-3 scoops", "Optional garnish (nuts, crumble, sauce)"],
        method: [
          "Scoop the chosen flavor(s) into a chilled bowl.",
          "Finish with the appropriate garnish for that flavor and serve immediately.",
        ],
      },
    ],
  }),
  R({
    id: "sorbet",
    category: "icecream",
    price: 25,
    nameEn: "Sorbet",
    nameAr: "شربات",
    image: "images/sorbet.jpg",
    platingNotes: "Flavors: Raspberry, Mango, Piña Colada. 2 scoops AED 25 · 3 scoops AED 35.",
    allergens: ["Vg"],
    allergensSource: "unverified-menu",
    components: [
      {
        title: "Sorbet service",
        draft: true,
        ingredients: ["Sorbet, flavor of choice - 2-3 scoops", "Optional fresh fruit garnish"],
        method: [
          "Scoop the chosen sorbet flavor(s) into a chilled bowl.",
          "Garnish with fresh fruit and serve immediately.",
        ],
      },
    ],
  }),

  /* ------------------------------- BREAKFAST PREP ------------------------------- */
  R({
    id: "breakfast-poached-egg",
    price: null,
    category: "breakfast",
    nameEn: "Poached Egg (breakfast prep)",
    nameAr: "",
    allergens: [],
    allergensSource: "none",
    components: [
      {
        title: "Poached Egg",
        draft: false,
        ingredients: ["Eggs"],
        method: [
          "Keep eggs at room temperature for 30 minutes.",
          "Steam at 63°C for 45 minutes.",
        ],
      },
    ],
  }),
  R({
    id: "breakfast-falafel-waffle",
    price: null,
    category: "breakfast",
    nameEn: "Falafel Waffle (breakfast prep)",
    nameAr: "",
    allergens: ["G", "N"],
    allergensSource: "none",
    components: [
      {
        title: "Falafel Waffle",
        draft: false,
        ingredients: ["Waffle mixture - 500g", "Falafels, frozen - 4pc", "Persillade", "Salt - a pinch"],
        method: [],
      },
    ],
  }),
  R({
    id: "breakfast-hash-brown",
    price: null,
    category: "breakfast",
    nameEn: "Hash Brown (breakfast prep)",
    nameAr: "",
    allergens: [],
    allergensSource: "none",
    components: [
      {
        title: "Hash Brown",
        draft: true,
        ingredients: ["Potatoes, grated - 1kg", "Salt - 10g", "White pepper - 3g", "Clarified butter / oil, for frying"],
        method: [
          "Grate the potatoes, rinse in cold water to remove excess starch, then squeeze thoroughly dry.",
          "Season with salt and pepper, portion and press into shape.",
          "Pan-fry in clarified butter or oil until deep golden and crisp on both sides.",
        ],
      },
    ],
  }),
];

if (typeof module !== "undefined") {
  module.exports = { CATEGORIES, SEED_RECIPES };
}
