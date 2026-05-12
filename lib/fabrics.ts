export type Fabric = {
  slug: string;
  number: string;
  name: string;
  shortName: string;
  subtitle: string;
  blurb: string;
  longBlurb: string;
  heroImg: string;
  thumbs: string[];
  composition: string;
  weight: string;
  width: string;
  weaves: string;
  dye: string;
  stockColors: string;
  leadTime: string;
  moq: string;
  uses: string[];
  care: string;
  production: string;
  tags: string[];
  related: string[];
};

export const FABRICS: Fabric[] = [
  {
    slug: "mulberry-silk",
    number: "01",
    name: "Pure Mulberry Silk",
    shortName: "Pure Mulberry",
    subtitle: "Our flagship cloth — long-filament, high-lustre.",
    blurb:
      "Our flagship cloth. Long-filament thread reeled from grade-A mulberry cocoons, woven into a smooth, lustrous base ready for dye, print or finishing.",
    longBlurb:
      "Reeled from grade-A bivoltine cocoons and woven on our own looms. Mulberry is the silk that built Kiswa: smooth, lustrous, dye-receptive, and consistent metre after metre. Standard widths and momme weights below; custom weights and weaves available on bulk order.",
    heroImg:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605518215584-32d6f5662d77?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    ],
    composition: "100% Pure Mulberry Silk",
    weight: "19, 22 momme (custom 12–30 mm)",
    width: "114 cm (45\")",
    weaves: "Plain · Satin · Twill · Habotai",
    dye: "Reactive · Acid · Piece-dyed or yarn-dyed",
    stockColors: "32 ready shades; custom Pantone matched at 200 m+",
    leadTime: "14 days stock · 28 days custom-dye · 45 days custom-weave",
    moq: "200 m per shade",
    uses: [
      "Bridal couture base (under embellishment)",
      "Fluid evening dresses, bias-cut gowns",
      "Premium men's kurtas and bandhgalas",
      "Designer scarves and pocket squares",
      "Lingerie linings (16 mm)",
    ],
    care: "Dry-clean only or cool hand-wash with neutral pH silk detergent. Store rolled at 18–22 °C, 55% relative humidity. Protect from direct sunlight.",
    production:
      "Filament is reeled from imported A-grade cocoons, twisted to 2/20 denier on our throwing machines, and woven on Vamatex rapier looms. After loom-state inspection, the greige cloth is degummed, dyed in our reactive dye-house, calendered and finished. Every roll receives four-point inspection before packing.",
    tags: ["formalwear", "bridal", "scarves"],
    related: ["charmeuse", "crepe", "chiffon"],
  },
  {
    slug: "raw-silk",
    number: "02",
    name: "Raw Silk",
    shortName: "Raw Silk",
    subtitle: "Textured, characterful, structured — silk with body.",
    blurb:
      "A textured, characterful silk that retains the natural slubs of the spun fibre. Ideal for jackets, suits and structured kurtas where body and warmth matter.",
    longBlurb:
      "Spun from short fibres rather than reeled filament, raw silk keeps the natural slubs and uneven texture that give the cloth its hallmark character. We weave it medium-weight for jackets, sherwanis, structured kurtas and tailored separates.",
    heroImg:
      "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=1600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605518215584-32d6f5662d77?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582242335394-6f2db9be6cc1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=600&q=80",
    ],
    composition: "100% Spun Silk (Mulberry)",
    weight: "80, 100, 120 gsm",
    width: "110 cm (44\")",
    weaves: "Plain",
    dye: "Reactive · Acid · Piece-dyed",
    stockColors: "26 ready shades",
    leadTime: "14 days stock · 28 days custom-dye",
    moq: "200 m per shade",
    uses: [
      "Men's sherwanis, bandhgalas and tailored kurtas",
      "Structured women's jackets and waistcoats",
      "Cushion covers, runners and home textiles",
      "Ethnic occasion wear with embroidery",
    ],
    care: "Dry-clean only. Steam-press at low heat through a cotton press cloth. Avoid water spotting — even water marks set into the slubs and can be hard to lift.",
    production:
      "Spun from short-fibre silk, twisted on our throwing line, woven plain weave on rapier looms. The natural slub is intentional — it is the signature texture of raw silk and is not a defect.",
    tags: ["formalwear", "scarves", "upholstery"],
    related: ["dupion", "mulberry-silk", "jacquard"],
  },
  {
    slug: "chiffon",
    number: "03",
    name: "Chiffon Silk",
    shortName: "Chiffon",
    subtitle: "A whisper of silk — sheer, weightless, fluid.",
    blurb:
      "A weightless, slightly grainy sheer with a soft fall. Our chiffon is woven from fine S- and Z-twist mulberry yarn, then chemically softened for a closer drape.",
    longBlurb:
      "Woven from very fine, alternately twisted yarn, our chiffon has the soft grain that distinguishes pure-silk chiffon from polyester imitations. The cloth is light enough to drift, dense enough to dye evenly, and finishes with the slightest dry hand.",
    heroImg:
      "https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=1600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
    ],
    composition: "100% Pure Silk",
    weight: "30, 38, 45 gsm",
    width: "110 cm (44\")",
    weaves: "Plain crêpe",
    dye: "Reactive · Acid · Piece-dyed · Print",
    stockColors: "40 ready shades",
    leadTime: "14 days stock · 28 days dye-to-match",
    moq: "200 m per shade",
    uses: [
      "Dupatta & women's scarves",
      "Layered evening dresses, sleeves and overlays",
      "Bridal embellished chiffon",
      "Lightweight blouses and tunics",
    ],
    care: "Hand-wash cool, line-dry away from sunlight. Press from the reverse with a low-heat iron. Snags can be lightly worked back into the weave with a needle from the wrong side.",
    production:
      "Yarn is twisted at high TPI in alternating S and Z directions. The opposing twists create the fine grain you can feel in the cloth. Woven on dobby looms, then chemically softened.",
    tags: ["formalwear", "bridal", "scarves"],
    related: ["organza", "crepe", "mulberry-silk"],
  },
  {
    slug: "organza",
    number: "04",
    name: "Organza Silk",
    shortName: "Organza",
    subtitle: "Crisp, transparent — the cloth of bridal couture.",
    blurb:
      "A crisp, transparent silk with a paper-like body — the favourite cloth of bridal couture. Holds shape well, takes embroidery beautifully.",
    longBlurb:
      "Woven from highly twisted, tightly spun yarn, then finished with a stiffening agent for hold. Organza is what makes a princess sleeve stand up and a bridal layer hover. Available in stiff and softened finishes.",
    heroImg:
      "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?auto=format&fit=crop&w=1600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605518215584-32d6f5662d77?auto=format&fit=crop&w=600&q=80",
    ],
    composition: "100% Pure Silk",
    weight: "40, 50, 60 gsm",
    width: "110 cm (44\")",
    weaves: "Plain · Stiff & Softened finish",
    dye: "Reactive · Acid · Piece-dyed",
    stockColors: "30 ready shades + ivory bridal tones",
    leadTime: "14 days stock · 28 days custom",
    moq: "200 m per shade",
    uses: [
      "Bridal couture and lehenga overlays",
      "Embroidered dupattas",
      "Structured sleeves, pleats and ruffles",
      "Window sheers in luxury home textile",
    ],
    care: "Dry-clean only. Steam from a distance — direct iron contact at high heat will scorch the stiffening. Store flat, not folded sharply.",
    production:
      "The stiffness is achieved during finishing, not in the weave — we apply a starch-based agent that washes out gently with cool water. We can supply organza un-stiffened on request.",
    tags: ["bridal", "formalwear"],
    related: ["chiffon", "jacquard", "dupion"],
  },
  {
    slug: "crepe",
    number: "05",
    name: "Crepe Silk",
    shortName: "Crepe",
    subtitle: "Pebble surface, liquid fall, no shine.",
    blurb:
      "A pebble-textured silk with liquid drape and zero shine — the cloth of choice for fluid evening dresses, blouses and cape sleeves.",
    longBlurb:
      "The cloth that drapes like water. Crepe yarn is twisted to a higher TPI than plain silk yarn — when woven and finished, the cloth contracts slightly, producing the soft pebble grain that distinguishes true crepe from imitations.",
    heroImg:
      "https://images.unsplash.com/photo-1542838687-3c7df97a3b1d?auto=format&fit=crop&w=1600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1542838687-3c7df97a3b1d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?auto=format&fit=crop&w=600&q=80",
    ],
    composition: "100% Pure Silk",
    weight: "16, 18 momme",
    width: "114 cm (45\")",
    weaves: "Crepe",
    dye: "Reactive · Acid · Piece-dyed · Print",
    stockColors: "34 ready shades",
    leadTime: "14 days stock · 28 days dye-to-match",
    moq: "200 m per shade",
    uses: [
      "Bias-cut evening dresses and slip dresses",
      "Fluid blouses and shirt dresses",
      "Cape sleeves, draped trousers",
      "Designer scarf bases",
    ],
    care: "Dry-clean recommended. If hand-washing, use neutral pH wash and never wring — roll in a towel to extract water.",
    production:
      "High-twist crepe yarn is woven on rapier looms then degummed and finished. The cloth shrinks 5–8% during finishing, which is what creates the pebble surface.",
    tags: ["formalwear", "scarves"],
    related: ["charmeuse", "chiffon", "mulberry-silk"],
  },
  {
    slug: "charmeuse",
    number: "06",
    name: "Charmeuse Silk",
    shortName: "Charmeuse",
    subtitle: "Satin face, matte reverse, classic shine.",
    blurb:
      "A satin-faced silk with luxurious shine on the right side and matte finish on the reverse. The fluid, classic bias-cut silk.",
    longBlurb:
      "A satin-weave silk where the warp floats over four wefts, producing the lustrous “right side” that defines charmeuse. The reverse is matte and slightly textured. The fluid, classic silk for slip dresses and lining of couture jackets.",
    heroImg:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542838687-3c7df97a3b1d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605518215584-32d6f5662d77?auto=format&fit=crop&w=600&q=80",
    ],
    composition: "100% Pure Mulberry Silk",
    weight: "16, 19, 22 momme",
    width: "114 cm (45\")",
    weaves: "Satin (4-end)",
    dye: "Reactive · Acid · Piece-dyed",
    stockColors: "38 ready shades",
    leadTime: "14 days stock · 28 days custom",
    moq: "200 m per shade",
    uses: [
      "Slip dresses, lingerie, sleepwear",
      "Bias-cut evening gowns",
      "Couture jacket lining",
      "Pillowcases, eye masks (premium home)",
    ],
    care: "Dry-clean only for the deeper shades. Lights and pastels can be hand-washed cool. Iron on the matte side, not the shiny face.",
    production:
      "Woven on Vamatex rapier looms with high-density warp. The 22-momme grade uses a heavier 2/16 yarn — denser, with the most pronounced shine. The 16-momme grade is the lingerie weight.",
    tags: ["formalwear", "bridal", "lining"],
    related: ["mulberry-silk", "crepe", "dupion"],
  },
  {
    slug: "dupion",
    number: "07",
    name: "Dupion Silk",
    shortName: "Dupion",
    subtitle: "Natural slubs, restrained sheen, structured body.",
    blurb:
      "Woven from yarn spun of two cocoons together, dupion has a natural slub and a slight crispness — ideal for sherwanis, lehengas and tailored evening wear.",
    longBlurb:
      "Dupion is woven from yarn reeled from two cocoons that have nested together — the doubled filament produces the irregular slubs that are the cloth's signature. We weave dupion in plain weave with mostly tonal warp/weft, plus selected two-tone shot effects on request.",
    heroImg:
      "https://images.unsplash.com/photo-1582242335394-6f2db9be6cc1?auto=format&fit=crop&w=1600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1582242335394-6f2db9be6cc1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605518215584-32d6f5662d77?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=600&q=80",
    ],
    composition: "100% Pure Silk (twin-cocoon yarn)",
    weight: "70, 90, 110 gsm",
    width: "110 cm (44\")",
    weaves: "Plain · Slubbed · Two-tone shot",
    dye: "Reactive · Acid · Yarn-dyed",
    stockColors: "28 ready shades + shot combinations",
    leadTime: "14 days stock · 32 days custom shot",
    moq: "200 m per shade",
    uses: [
      "Sherwani, bandhgala, structured kurta",
      "Lehenga choli and bridal skirts",
      "Tailored women's jackets",
      "Drapery and luxury cushions",
    ],
    care: "Dry-clean only. The slubs hold dust — periodic gentle vacuuming through a fine mesh keeps stored bolts fresh.",
    production:
      "Two-tone “shot” effects come from yarn-dyeing warp and weft in different colours. Holding to a stated shot — say peacock blue × gold — requires precise yarn dye-lots, which is why custom shots take an extra week.",
    tags: ["formalwear", "bridal", "upholstery"],
    related: ["raw-silk", "jacquard", "charmeuse"],
  },
  {
    slug: "jacquard",
    number: "08",
    name: "Jacquard Silk",
    shortName: "Jacquard (custom)",
    subtitle: "Woven motif, not printed — a designer collaboration.",
    blurb:
      "Woven motifs — paisley, florals, geometric — produced on our 12-jack jacquard floor. Custom motifs accepted from buyer artwork.",
    longBlurb:
      "Our jacquard floor weaves the pattern into the cloth itself. Paisley, florals, geometric repeats, custom buyer artwork — all become permanent woven structure rather than surface print. Twelve-jack capacity allows complex multi-shaft motifs.",
    heroImg:
      "https://images.unsplash.com/photo-1620975014050-3f3a08293a86?auto=format&fit=crop&w=1600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1620975014050-3f3a08293a86?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582242335394-6f2db9be6cc1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=600&q=80",
    ],
    composition: "100% Silk (or silk × viscose blends)",
    weight: "110, 140, 180 gsm",
    width: "110 cm (44\")",
    weaves: "Bespoke jacquard · Damask · Brocade-style",
    dye: "Yarn-dyed (single tone or two-tone)",
    stockColors: "Stock library or custom artwork",
    leadTime: "4 weeks sample · 6–8 weeks bulk",
    moq: "500 m for custom motifs · 200 m stock",
    uses: [
      "Wedding sherwanis with motif coordination",
      "Bridal lehenga blouses",
      "Designer label brocade collections",
      "Luxury home — cushions, runners, panels",
    ],
    care: "Dry-clean only. Avoid prolonged folding along motif lines — long-stored bolts should be re-rolled every 6 months to prevent crease setting.",
    production:
      "Buyer artwork is converted into binary control instructions for the jacquard heads (CAD card-cutting). A 1.5 m strike-off sample is woven for buyer approval. On approval, the floor is set up for the production run.",
    tags: ["bridal", "upholstery"],
    related: ["dupion", "organza", "raw-silk"],
  },
];

export const getFabric = (slug: string) =>
  FABRICS.find((f) => f.slug === slug);
