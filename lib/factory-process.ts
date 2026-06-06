export type ProcessStep = {
  step: number;
  title: string;
  description: string;
  detail: string; // extra detail for the detail page
  image: string;           // primary image
  images: string[];        // all images for this step
};

export type ProcessSection = {
  id: string;
  slug: string;
  sectionNumber: number;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  steps: ProcessStep[];
};

export const PROCESS_SECTIONS: ProcessSection[] = [
  {
    id: "yarn-preparation",
    slug: "yarn-preparation",
    sectionNumber: 1,
    title: "Yarn Preparation",
    tagline: "The foundation of every quality fabric",
    description:
      "Before a single thread enters the loom, the yarn undergoes three critical preparation stages — winding, twisting, and steaming. This section sets the tension, strength and consistency that determines the quality of every metre we produce.",
    heroImage: "/factory/step2/img2.jpeg",
    steps: [
      {
        step: 1,
        title: "Yarn Winding",
        description:
          "Raw yarn is first wound onto cones to prepare it for smooth fabric production. This step helps maintain balanced tension, clean yarn flow, and better quality during the next manufacturing stages.",
        detail:
          "Yarn winding ensures that the raw material is transferred onto production-grade cones at a controlled speed and tension. Inconsistent winding leads to uneven weaving — so this stage is monitored carefully to ensure each cone is wound to a uniform weight and density. Our winding machines handle multiple yarn types with precision.",
        image: "/factory/step1/img1.jpeg",
        images: [
          "/factory/step1/img1.jpeg",
          "/factory/step1/img2.jpeg",
          "/factory/step1/img3.jpeg",
          "/factory/step1/img4.jpeg",
        ],
      },
      {
        step: 2,
        title: "Yarn Twisting",
        description:
          "After winding, yarn is twisted to improve strength, smoothness, and durability. Proper twisting reduces thread breakage and prepares the yarn for stable weaving.",
        detail:
          "Twisting imparts the structural integrity that silk yarn needs to withstand the mechanical tension of weaving. We control the TPI (twists per inch) precisely — lighter fabrics like chiffon require a higher twist, while heavier base fabrics need a lower, more relaxed twist. The twisting machines run in parallel rows to maintain consistent output across all batches.",
        image: "/factory/step2/img1.jpeg",
        images: [
          "/factory/step2/img1.jpeg",
          "/factory/step2/img2.jpeg",
          "/factory/step2/img3.jpeg",
          "/factory/step2/img4.jpeg",
          "/factory/step2/img5.jpeg",
          "/factory/step2/img6.jpeg",
        ],
      },
      {
        step: 3,
        title: "Yarn Steaming",
        description:
          "The twisted yarn is steamed to set the twist and balance the yarn tension. This process improves softness, stability, and smooth running during weaving.",
        detail:
          "Steam setting is a critical — and often overlooked — step. Without it, twisted yarn retains internal stress that causes uneven fabric texture and loom problems. Our steaming chambers apply controlled heat and moisture to relax and lock the twist permanently. The result is stable, smooth yarn that feeds consistently into the loom without curling or breaking.",
        image: "/factory/step3/img1.jpeg",
        images: ["/factory/step3/img1.jpeg"],
      },
    ],
  },

  {
    id: "weaving-preparation",
    slug: "weaving-preparation",
    sectionNumber: 2,
    title: "Weaving Preparation",
    tagline: "Precision setup for every fabric structure",
    description:
      "With yarn prepared, the next stage organises the threads into the exact arrangement required by the fabric specification. Warping and reed drawing are precision-critical — errors here affect the width, weave density and surface appearance of the finished fabric.",
    heroImage: "/factory/step4/img1.jpeg",
    steps: [
      {
        step: 4,
        title: "Warping & Bobbin Preparation",
        description:
          "After steaming, yarn is divided for two important processes. Some yarn is prepared as warp, while some is wound onto bobbins for shuttle weaving.",
        detail:
          "Warping involves winding hundreds of parallel threads onto a beam at the exact length and tension required for the production run. Simultaneously, weft yarn is wound onto shuttles and bobbins. The warp beam dictates the fabric length; the weft determines its texture and weight. Our warping machines run at controlled speeds with automatic tension monitoring to ensure every thread in the beam is identical.",
        image: "/factory/step4/img1.jpeg",
        images: [
          "/factory/step4/img1.jpeg",
          "/factory/step4/img2.jpeg",
          "/factory/step4/img3.jpeg",
          "/factory/step4/img4.jpeg",
          "/factory/step4/img5.jpeg",
          "/factory/step4/img6.jpeg",
          "/factory/step4/img7.jpeg",
          "/factory/step4/img8.jpeg",
        ],
      },
      {
        step: 5,
        title: "Reed Drawing",
        description:
          "The warp yarn is carefully passed through the reed/comb in proper sequence. This step helps maintain correct thread spacing, fabric width, and smooth weaving.",
        detail:
          "Reed drawing — or denting — is entirely a manual skill operation. Each warp thread is individually threaded through the reed heddles in the exact sequence specified by the weave pattern. The number of threads per dent determines the fabric's pick density and width. A single threading error affects a visible streak across the entire production run. Our experienced drawers handle this process with extreme care, checking and re-checking before the loom is started.",
        image: "/factory/step5/img1.jpeg",
        images: [
          "/factory/step5/img1.jpeg",
          "/factory/step5/img2.jpeg",
          "/factory/step5/img3.jpeg",
        ],
      },
    ],
  },

  {
    id: "fabric-weaving",
    slug: "fabric-weaving",
    sectionNumber: 3,
    title: "Fabric Weaving",
    tagline: "Where yarn becomes cloth",
    description:
      "This is the heart of the factory. Our power looms interlace warp and weft threads to produce the raw fabric structure. With 10 images from this section alone, the weaving floor is the most visually compelling part of the production process.",
    heroImage: "/factory/step6/img3.jpeg",
    steps: [
      {
        step: 6,
        title: "Power Loom Weaving",
        description:
          "The prepared yarn is set on power loom machines, where warp and weft threads are interlaced to create the fabric. This is the main stage where the fabric structure is formed.",
        detail:
          "Our weaving floor operates 40+ power looms running continuously across three shifts. Each loom is configured for a specific fabric construction — plain weave for base fabrics, twill for structured silks, and satin for smooth, lustrous surfaces. The loom speed, tension, and pick density are all controlled to the specification. Senior weavers monitor each machine, watching for broken threads, skipped picks or tension inconsistencies. Every few hundred metres, a sample is cut and measured to verify GSM, width and weave quality before production continues.",
        image: "/factory/step6/img1.jpeg",
        images: [
          "/factory/step6/img1.jpeg",
          "/factory/step6/img2.jpeg",
          "/factory/step6/img3.jpeg",
          "/factory/step6/img4.jpeg",
          "/factory/step6/img5.jpeg",
          "/factory/step6/img6.jpeg",
          "/factory/step6/img7.jpeg",
          "/factory/step6/img8.jpeg",
          "/factory/step6/img9.jpeg",
          "/factory/step6/img10.jpeg",
        ],
      },
    ],
  },

  {
    id: "checking-finishing",
    slug: "checking-finishing",
    sectionNumber: 4,
    title: "Checking & Finishing",
    tagline: "Every defect caught before dispatch",
    description:
      "Grey fabric from the loom is raw — it carries processing oil, dust and surface irregularities. Three finishing stages transform it into smooth, clean, market-ready base fabric: visual checking, washing, and calendering.",
    heroImage: "/factory/step9/img2.jpeg",
    steps: [
      {
        step: 7,
        title: "Fabric Checking",
        description:
          "After weaving, the fabric is carefully checked for surface quality, weaving faults, stains, holes, thread lines, and finishing. This ensures clean and production-ready fabric.",
        detail:
          "Every roll coming off the loom is inspected on a backlit checking table. Inspectors look for broken yarns, holes, oil stains, reed marks, weaving skips and width inconsistencies. Faults are marked with coloured flags; minor repairs are made on-site. Rolls above our acceptable defect threshold are pulled from the batch and reviewed before any decision to ship. This stage is the first gate before a roll earns the right to be called finished fabric.",
        image: "/factory/step7/img1.jpeg",
        images: ["/factory/step7/img1.jpeg"],
      },
      {
        step: 8,
        title: "Fabric Washing",
        description:
          "The checked fabric is washed to remove dust, oil marks, impurities, and processing particles. Washing improves fabric cleanliness, softness, and overall feel.",
        detail:
          "Greige silk fabric carries sericin (the natural protein gum) and loom processing oils that affect its feel, absorbency and dye uptake. Our washing section uses controlled-temperature water baths with gentle detergent to remove these impurities without damaging the fibre. Fabrics are washed in batches, with water temperature and soak time adjusted per fabric type. After washing, the fabric is hydro-extracted and moved to the finishing line.",
        image: "/factory/step8/img1.jpeg",
        images: [
          "/factory/step8/img1.jpeg",
          "/factory/step8/img2.jpeg",
          "/factory/step8/img3.jpeg",
          "/factory/step8/img4.jpeg",
          "/factory/step8/img5.jpeg",
          "/factory/step8/img6.jpeg",
          "/factory/step8/img7.jpeg",
          "/factory/step8/img8.jpeg",
          "/factory/step8/img9.jpeg",
        ],
      },
      {
        step: 9,
        title: "Fabric Calendering",
        description:
          "After washing, fabric is passed through calendering rollers to improve smoothness, fall, surface finish, and overall appearance.",
        detail:
          "Calendering is the finishing press — fabric is passed between heavy heated rollers under controlled pressure and speed. The process compresses the weave structure, improves surface lustre, flattens loose fibres and sets the final hand feel. For white-base fabrics, calendering is critical because buyers need a smooth, even surface to achieve uniform dye uptake and sharp print registration. Our calendering machine allows adjustment of roller temperature, pressure and speed to produce different surface finishes on demand.",
        image: "/factory/step9/img1.jpeg",
        images: [
          "/factory/step9/img1.jpeg",
          "/factory/step9/img2.jpeg",
          "/factory/step9/img3.jpeg",
          "/factory/step9/img4.jpeg",
          "/factory/step9/img5.jpeg",
          "/factory/step9/img6.jpeg",
        ],
      },
    ],
  },

  {
    id: "packing-dispatch",
    slug: "packing-dispatch",
    sectionNumber: 5,
    title: "Measuring, Packing & Dispatch",
    tagline: "Every metre counted, every order protected",
    description:
      "The final stage before fabric leaves the factory. Accurate measurement, clean packing and careful dispatch ensure the buyer receives exactly what was ordered — in perfect condition, on time.",
    heroImage: "/factory/step10/img1.jpeg",
    steps: [
      {
        step: 10,
        title: "Fabric Measuring",
        description:
          "After calendering, the fabric is measured carefully to confirm accurate length and width before packing.",
        detail:
          "All finished fabric is measured on a length-measuring machine that records exact metres per roll. Width is measured at three points along the roll. Any roll that deviates beyond our ±2% tolerance is flagged and remeasured. Measurement data is recorded per roll number and referenced on the packing slip. This ensures buyers receive the exact quantity ordered and our quality records are verifiable.",
        image: "/factory/step10/img1.jpeg",
        images: ["/factory/step10/img1.jpeg", "/factory/step10/img2.jpeg"],
      },
      {
        step: 11,
        title: "Fabric Packing",
        description:
          "The measured fabric is properly packed with protective wrapping to keep it clean, safe, and ready for delivery.",
        detail:
          "Finished fabric is rolled onto sturdy cardboard cores and wrapped in protective polythene sheeting, then wrapped in brown craft paper. Each roll is labelled with fabric name, GSM, width, roll number and length. Rolls are grouped per order, checked against the packing list, and secured with PP strapping. For export orders, rolls are bundled in bales per container requirements. Our packing area is kept clean and dry to prevent contamination before shipping.",
        image: "/factory/step11/img1.jpeg",
        images: ["/factory/step11/img1.jpeg"],
      },
      {
        step: 12,
        title: "Fabric Dispatch",
        description:
          "After packing, the fabric is dispatched according to customer order details. Each order is handled carefully to ensure safe and timely delivery.",
        detail:
          "Packed orders are loaded onto vehicles after a final cross-check against the shipping documents. For domestic orders, fabric is dispatched on covered trucks. For export orders, bales are loaded into containers and sealed. Each shipment includes a packing list, quality certificate and measurement report. Our dispatch team coordinates directly with the buyer on shipping timelines, tracking updates and any special handling requirements.",
        image: "/factory/step12/img1.jpeg",
        images: ["/factory/step12/img1.jpeg"],
      },
    ],
  },
];

export const getSection = (slug: string) =>
  PROCESS_SECTIONS.find((s) => s.slug === slug);

// All 12 steps flat, in order
export const ALL_STEPS = PROCESS_SECTIONS.flatMap((s) => s.steps);
