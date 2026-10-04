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

export type BedModel = Pick<RoomProduct, 'name' | 'dimensions' | 'mattress'>;

export interface FurniturePlacement {
  product: BedModel;
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

/** IKEA Spain product dimensions and price checked 2026-10-03. */
export const MICKE_DRAWERS = {
  name: 'MICKE', articleNumber: '902.130.78', price: 59, currency: 'EUR',
  checkedOn: '2026-10-03',
  url: 'https://www.ikea.com/es/es/p/micke-cajonera-con-ruedas-blanco-90213078/',
  dimensions: { width: 0.35, depth: 0.5, height: 0.75 }
} as const;

/** IKEA Spain product dimensions and price checked 2026-10-03. */
export const ORFJALL_CHAIR = {
  name: 'ÖRFJÄLL', articleNumber: '395.010.96', price: 79, currency: 'EUR',
  checkedOn: '2026-10-03',
  url: 'https://www.ikea.com/es/es/p/orfjall-silla-giratoria-blanco-vissle-azul-oscuro-s39501096/',
  dimensions: { width: 0.68, depth: 0.68, minHeight: 0.82, maxHeight: 0.93,
    seatWidth: 0.49, seatDepth: 0.43, minSeatHeight: 0.47, maxSeatHeight: 0.58 }
} as const;

/** IKEA Spain wardrobe selected for the space beside the bed; checked 2026-10-03. */
export const SMASTAD_WARDROBE = {
  name: 'SMÅSTAD', articleNumber: '493.908.75', price: 136, currency: 'EUR',
  checkedOn: '2026-10-03',
  url: 'https://www.ikea.com/es/es/p/smastad-armario-blanco-blanco-con-2-barras-armario-s49390875/',
  dimensions: { width: 0.6, depth: 0.42, height: 1.81 }
} as const;

/** IKEA Spain 90 × 190 cm mattress options; dimensions describe the full frame. */
export const VEVELSTAD_BED = {
  name: 'VEVELSTAD', articleNumber: '605.867.53', price: 69.99, currency: 'EUR',
  url: 'https://www.ikea.com/es/es/p/vevelstad-estructura-cama-blanco-60586753/',
  dimensions: { width: 0.96, depth: 1.97, height: 0.27, footboardHeight: 0.27 },
  mattress: { width: 0.9, depth: 1.9 }
} as const;

export const STORKLINTA_BED = {
  name: 'STORKLINTA', articleNumber: '806.182.63', price: 109, slatsPrice: 30, currency: 'EUR',
  url: 'https://www.ikea.com/es/es/p/storklinta-estructura-cama-blanco-80618263/',
  dimensions: { width: 0.99, depth: 1.99, height: 1.01, footboardHeight: 0.39 },
  mattress: { width: 0.9, depth: 1.9 }
} as const;

/** Conforama / Miroytengo Child Jackson, checked 2026-10-03. */
export const JACKSON_BED = {
  name: 'CHILD JACKSON', articleNumber: 'CONFORAMA', price: 134, currency: 'EUR',
  url: 'https://www.conforama.es/cama-juvenil-child-con-2-cajones-jackson',
  dimensions: { width: 0.98, depth: 1.94, height: 0.66, footboardHeight: 0.66 },
  mattress: { width: 0.90, depth: 1.90 }
} as const;

export type OliviaProductId = 'smastad' | 'vitval' | 'beds-micke' | 'tuffing' | 'kura';

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

/** IKEA Spain catalogue checked 2026-10-03. */
export const GURSKEN_WARDROBE = {
  name: 'GURSKEN', articleNumber: '204.863.26', price: 69.99, currency: 'EUR',
  url: 'https://www.ikea.com/es/es/p/gursken-armario-beige-claro-20486326/',
  dimensions: { width: 0.49, depth: 0.55, height: 1.86 }
} as const;

export const UNDER_BED_STORAGE = [
  { id: 'skubb-small', name: 'SKUBB small', price: 5.99, width: 0.43, depth: 0.53, height: 0.19, kind: 'fabric',
    url: 'https://www.ikea.com/es/es/p/skubb-bolsa-almacenaje-blanco-60591047/' },
  { id: 'skubb-large', name: 'SKUBB large', price: 7.99, width: 0.53, depth: 0.65, height: 0.19, kind: 'fabric',
    url: 'https://www.ikea.com/es/es/p/skubb-bolsa-almacenaje-blanco-10591059/' },
  { id: 'sockerbit', name: 'SOCKERBIT', price: 19.99, width: 0.50, depth: 0.77, height: 0.19, kind: 'plastic',
    url: 'https://www.ikea.com/es/es/p/sockerbit-caja-con-tapa-blanco-20411524/' },
  { id: 'vardo', name: 'VARDÖ', price: 29.99, width: 0.65, depth: 0.70, height: 0.18, kind: 'wheels',
    url: 'https://www.ikea.com/es/es/p/vardo-cajon-cama-blanco-00222671/' }
] as const;
export type UnderBedStorage = typeof UNDER_BED_STORAGE[number];

/** One horizontal row, with 1 cm between boxes and clearance from frame ends. */
export function storageCount(bed: BedModel, storage: UnderBedStorage): number {
  const availableLength = bed.dimensions.depth - 0.10;
  return Math.floor((availableLength + 0.01) / (storage.width + 0.01));
}

export type BedroomItemId = 'vevelstad' | 'storklinta' | 'jackson' | 'desk' | 'drawers' | 'chair' | 'smastad' | 'gursken' | UnderBedStorage['id'];
export type BedroomSelection = Record<BedroomItemId, boolean>;
export const DEFAULT_BEDROOM_SELECTION: Readonly<BedroomSelection> = {
  vevelstad: false, storklinta: true, jackson: false, desk: true, drawers: true, chair: true, smastad: true, gursken: false,
  'skubb-small': false, 'skubb-large': false, sockerbit: false, vardo: true,
};
