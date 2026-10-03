import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { UNDER_BED_STORAGE, WALL_STORAGE, storageCount, OLIVIA_LOFT_CANDIDATE, OLIVIA_VITVAL_CANDIDATE, VEVELSTAD_BED, STORKLINTA_BED, MICKE_DESK, MICKE_DRAWERS, ORFJALL_CHAIR, SMASTAD_WARDROBE, GURSKEN_WARDROBE, BedroomSelection, DEFAULT_BEDROOM_SELECTION, BedroomItemId, TUFFING_BED, KURA_BED, OliviaProductId } from './room-furniture';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoomScene, RoomDimensions, RoomFixtures } from './room-scene';

@Component({
  selector: 'app-room-rendering',
  templateUrl: './room-rendering.component.html',
  styleUrls: ['./room-rendering.component.css']
})
export class RoomRenderingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('viewport', { static: true }) viewport!: ElementRef<HTMLDivElement>;
  // Olivia's measurements are in centimetres in olivia.png, converted to metres.
  // Ceiling: 80 cm sill + 164 cm window + 11 cm above the window.
  readonly rooms = [
    { name: 'Olivia', floor: 'ceramic', dimensions: { width: 2.65, depth: 2.06, height: 2.55 },
      fixtures: { window: { wall: 'right', offset: 0.84, width: 0.85, height: 1.64, sill: 0.8 },
        outlet: { width: 0.08, height: 0.08, windowOffset: 0.04, sillGap: 0.04 },
        door: { width: 0.76, height: 2.03 },
        radiator: { offset: 0.25, width: 0.51, height: 0.37, depth: 0.1 } } },
    { name: 'Adria', floor: 'ceramic', dimensions: { width: 3.35, depth: 3.12, height: 2.55,
        notch: { width: 0.33, depth: 0.66 } },
      fixtures: { window: { wall: 'left', offset: 1.59, width: 1.38, height: 1.66, sill: 0.8 },
        door: { offset: 0.14, width: 0.76, height: 2.03 },
        radiator: { offset: 1.79, width: 1.08, height: 0.73, depth: 0.1 } } }
  ] as const;
  selectedRoom = this.rooms[0] as typeof this.rooms[number];

  get fixtures(): RoomFixtures | undefined { return this.selectedRoom.fixtures; }

  get dimensions(): RoomDimensions { return this.selectedRoom.dimensions; }
  readonly loftCandidate = OLIVIA_LOFT_CANDIDATE;
  readonly vitvalCandidate = OLIVIA_VITVAL_CANDIDATE;
  readonly kuraBed = KURA_BED;
  readonly tuffingBed = TUFFING_BED;
  readonly mickeDesk = MICKE_DESK;
  readonly mickeDrawers = MICKE_DRAWERS;
  readonly orfjallChair = ORFJALL_CHAIR;
  readonly smastadWardrobe = SMASTAD_WARDROBE;
  readonly baseBedroomItems: readonly { id: BedroomItemId; name: string; price?: number; url?: string; detail: string }[] = [
    { id: 'vevelstad', name: 'VEVELSTAD bed', price: VEVELSTAD_BED.price, url: VEVELSTAD_BED.url, detail: 'Frame 96 × 197 cm · Slats included · Mattress extra' },
    { id: 'storklinta', name: 'STORKLINTA bed + LURÖY', price: STORKLINTA_BED.price + STORKLINTA_BED.slatsPrice, url: STORKLINTA_BED.url, detail: 'Frame 99 × 199 cm · €109 frame + €30 slats · Mattress extra' },
    { id: 'desk', name: 'MICKE desk', price: MICKE_DESK.price, url: MICKE_DESK.url, detail: '73 × 50 × 75 cm' },
    { id: 'drawers', name: 'MICKE drawers', price: MICKE_DRAWERS.price, url: MICKE_DRAWERS.url, detail: '35 × 50 × 75 cm' },
    { id: 'chair', name: 'ÖRFJÄLL chair', price: ORFJALL_CHAIR.price, url: ORFJALL_CHAIR.url, detail: 'White / dark blue' },
    { id: 'smastad', name: 'SMÅSTAD wardrobe', price: SMASTAD_WARDROBE.price, url: SMASTAD_WARDROBE.url, detail: '60 × 42 × 181 cm · Handles sold separately' },
    { id: 'gursken', name: 'GURSKEN wardrobe', price: GURSKEN_WARDROBE.price, url: GURSKEN_WARDROBE.url, detail: '49 × 55 × 186 cm · Light beige' }
  ];
  get bedroomItems(): readonly { id: BedroomItemId; name: string; price?: number; url?: string; detail: string }[] {
    const bed = this.bedroomSelection.storklinta ? STORKLINTA_BED : VEVELSTAD_BED;
    return [...this.baseBedroomItems, ...UNDER_BED_STORAGE.map(storage => {
      const count = storageCount(bed, storage);
      return { id: storage.id, name: `${count} × ${storage.name}`, price: count * storage.price, url: storage.url,
        detail: `${Math.round(storage.width * 100)} × ${Math.round(storage.depth * 100)} × ${Math.round(storage.height * 100)} cm each · One row under the bed` };
    }), ...WALL_STORAGE.map(storage => ({ id: storage.id, name: storage.name, price: storage.price,
      url: storage.url, detail: storage.detail }))];
  }

  isStorageItem(id: BedroomItemId): boolean {
    return UNDER_BED_STORAGE.some(storage => storage.id === id);
  }

  isWallStorageItem(id: BedroomItemId): boolean {
    return WALL_STORAGE.some(storage => storage.id === id);
  }

  readonly bedroomSelection: BedroomSelection = { ...DEFAULT_BEDROOM_SELECTION };

  get furnitureSubtotal(): number {
    return this.oliviaLayoutPlaced ? this.bedroomItems.reduce((total, item) =>
      total + (this.bedroomSelection[item.id] ? item.price || 0 : 0), 0) : 0;
  }

  toggleBedroomItem(id: BedroomItemId): void {
    const hasBed = this.bedroomSelection.vevelstad || this.bedroomSelection.storklinta;
    if (this.isStorageItem(id) && !hasBed) return;
    this.bedroomSelection[id] = !this.bedroomSelection[id];
    if (this.bedroomSelection[id]) {
      if (id === 'vevelstad' || id === 'storklinta') {
        this.bedroomSelection[id === 'vevelstad' ? 'storklinta' : 'vevelstad'] = false;
      }
      if (this.isStorageItem(id)) {
        for (const storage of UNDER_BED_STORAGE) this.bedroomSelection[storage.id] = storage.id === id;
      }
      if (this.isWallStorageItem(id)) {
        for (const option of WALL_STORAGE) this.bedroomSelection[option.id] = option.id === id;
      }
      if (id === 'smastad') this.bedroomSelection.gursken = false;
      if (id === 'gursken') this.bedroomSelection.smastad = false;
    }
    if (!this.bedroomSelection.vevelstad && !this.bedroomSelection.storklinta) {
      for (const storage of UNDER_BED_STORAGE) this.bedroomSelection[storage.id] = false;
    }
    this.refreshFurniture();
  }

  selectedOliviaProduct: OliviaProductId = 'beds-micke';
  oliviaLayoutPlaced = true;
  upperBedVisible = true;

  toggleOliviaLayout(): void {
    this.oliviaLayoutPlaced = !this.oliviaLayoutPlaced;
    this.refreshFurniture();
  }

  toggleUpperBed(): void {
    this.upperBedVisible = !this.upperBedVisible;
    this.refreshFurniture();
  }

  selectOliviaProduct(product: OliviaProductId): void {
    this.selectedOliviaProduct = product;
    this.refreshFurniture();
  }


  private refreshFurniture(): void {
    this.zone.runOutsideAngular(() => {
      if (this.selectedRoom.name === 'Olivia') {
        this.scene?.setOliviaLayout(this.selectedOliviaProduct, this.oliviaLayoutPlaced, this.upperBedVisible, this.bedroomSelection);
      } else {
        this.scene?.setFurniture([]);
      }
    });
  }

  view: 'perspective' | 'top' = 'perspective';
  showGrid = false;
  showWalls = true;
  renderError = false;
  private scene?: RoomScene;

  constructor(private zone: NgZone, private auth: AuthService, private router: Router) {}

  get area(): number { return this.dimensions.width * this.dimensions.depth -
    (this.dimensions.notch ? this.dimensions.notch.width * this.dimensions.notch.depth : 0); }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      try {
        this.scene = new RoomScene(this.viewport.nativeElement, () => {
          this.zone.run(() => this.renderError = true);
        });
        this.scene.setDimensions(this.dimensions, this.fixtures, this.selectedRoom.floor);
        this.refreshFurniture();
        this.scene.setView(this.view);
      } catch {
        this.scene?.dispose();
        this.zone.run(() => this.renderError = true);
      }
    });
  }

  selectRoom(room: typeof this.rooms[number]): void {
    this.selectedRoom = room;
    this.zone.runOutsideAngular(() => {
      this.scene?.setDimensions(this.dimensions, this.fixtures, this.selectedRoom.floor);
      this.refreshFurniture();
      this.scene?.setView(this.view);
    });
  }

  setView(view: 'perspective' | 'top'): void {
    this.view = view;
    this.zone.runOutsideAngular(() => this.scene?.setView(view));
  }

  toggleGrid(): void {
    this.showGrid = !this.showGrid;
    this.scene?.setGridVisible(this.showGrid);
  }

  toggleWalls(): void {
    this.showWalls = !this.showWalls;
    this.scene?.setWallsVisible(this.showWalls);
  }

  resetCamera(): void { this.setView('perspective'); }

  logout(): void {
    this.auth.logout().subscribe(() => this.router.navigate(['/finance/login'], {
      queryParams: { returnUrl: '/room-rendering' }
    }));
  }

  ngOnDestroy(): void { this.scene?.dispose(); }
}
