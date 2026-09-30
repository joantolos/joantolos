/** Catalogue snapshot from IKEA Spain; store stock is separate from national availability. */
export interface RoomProduct {
  articleNumber: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  url: string;
  checkedOn: string;
  stock: readonly { store: string; storeId: string; quantity: number; updatedAt: string }[];
  dimensions: { width: number; depth: number; height: number; footboardHeight: number };
  mattress: { width: number; depth: number };
}

export interface FurniturePlacement {
  product: RoomProduct;
  x: number;
  z: number;
  rotation?: number;
}

export const SLATTUM_BED: RoomProduct = {
  articleNumber: '805.712.51',
  name: 'SLATTUM',
  description: 'Upholstered bed frame · Vissle dark grey · 90 × 200 cm',
  price: 79.99,
  currency: 'EUR',
  url: 'https://www.ikea.com/es/es/p/slattum-estructura-cama-tapizada-vissle-gris-oscuro-80571251/',
  checkedOn: '2026-09-29',
  // Source: api.salesitem.ingka.com/availabilities/ru/es?itemNos=80571251&expand=StoresList
  // Store IDs verified against IKEA's es/es/meta-data/informera/stores-suggested-detailed.json.
  stock: [
    { store: 'Sabadell', storeId: '171', quantity: 23, updatedAt: '2026-09-28T21:10:40.000Z' },
    { store: 'Badalona', storeId: '280', quantity: 15, updatedAt: '2026-09-28T07:56:45.000Z' }
  ],
  dimensions: { width: 0.94, depth: 2.06, height: 0.85, footboardHeight: 0.4 },
  mattress: { width: 0.9, depth: 2 }
};

// Headboard 5 cm from the back wall; entire frame is left of the corner recess.
export const ADRIA_BED: FurniturePlacement = { product: SLATTUM_BED, x: 0.78, z: -0.48 };

/** IKEA Spain catalogue and store availability checked 2026-09-29.
 * Stock source: api.salesitem.ingka.com/availabilities/ru/es?itemNos=59428873
 * with expand=StoresList,ChildItems. Quantities refer to cash-and-carry stock.
 * The complete combination lists 207 cm length (the bare frame page lists 205 cm).
 * This is a catalogue candidate, not the hypothetical model rendered in the scene.
 */
export const OLIVIA_LOFT_CANDIDATE = {
  name: 'SMÅSTAD',
  articleNumber: '594.288.73',
  price: 497,
  currency: 'EUR',
  checkedOn: '2026-09-29',
  url: 'https://www.ikea.com/es/es/p/smastad-cama-alta-blanco-blanco-con-escritorio-con-3-cajones-s59428873/',
  frameUrl: 'https://www.ikea.com/es/es/p/smastad-estructura-litera-con-escritorio-blanco-50454036/',
  dimensions: { width: 2.07, depth: 1.04, height: 1.82, underBedHeight: 1.42,
    deskWidth: 1.48, deskDepth: 0.6, deskHeight: 0.73 },
  stock: [
    { store: 'Badalona', quantity: 34, updatedAt: '2026-09-28T16:42:00.000Z' },
    { store: 'Sabadell', quantity: 0, updatedAt: '2026-09-29T00:47:07.000Z' }
  ]
} as const;

/** IKEA Spain catalogue snapshot for the bed-frame-only alternative. */
export const OLIVIA_VITVAL_CANDIDATE = {
  name: 'VITVAL',
  articleNumber: '104.112.42',
  price: 259,
  currency: 'EUR',
  checkedOn: '2026-09-29',
  frameUrl: 'https://www.ikea.com/es/es/p/vitval-estructura-cama-alta-blanco-gris-claro-10411242/',
  dimensions: { width: 2.07, depth: 0.97, height: 1.95, underBedHeight: 1.51,
    depthWithLadder: 1.35 },
  stock: [
    { store: 'Badalona', quantity: 10, updatedAt: '2026-09-29T00:00:00.000Z' },
    { store: 'Sabadell', quantity: 4, updatedAt: '2026-09-29T00:00:00.000Z' }
  ]
} as const;

export const MICKE_DESK = {
  name: 'MICKE', price: 49.99, currency: 'EUR',
  url: 'https://www.ikea.com/es/es/p/micke-escritorio-blanco-30213076/',
  dimensions: { width: 0.73, depth: 0.5, height: 0.75 }
} as const;

export type OliviaProductId = 'smastad' | 'vitval' | 'slattum-micke' | 'tuffing' | 'kura';

/** IKEA dimension drawing: 132 cm overall depth including the central ladder. */
export const TUFFING_BED = {
  name: 'TUFFING', price: 139, currency: 'EUR', articleNumber: '902.994.49',
  url: 'https://www.ikea.com/es/es/p/tuffing-estructura-cama-alta-gris-oscuro-90299449/',
  dimensions: { width: 2.08, depth: 0.97, height: 1.79, underBedHeight: 1.45, depthWithLadder: 1.32 }
} as const;

/** Raised configuration; IKEA Spain article 802.538.09. */
export const KURA_BED = {
  name: 'KURA', price: 199, currency: 'EUR', articleNumber: '802.538.09',
  url: 'https://www.ikea.com/es/es/p/kura-cama-reversible-blanco-pino-80253809/',
  dimensions: { width: 2.09, depth: 0.99, height: 1.16, underBedHeight: 0.83 }
} as const;
