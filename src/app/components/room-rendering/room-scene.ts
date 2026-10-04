import { UNDER_BED_STORAGE, storageCount, UnderBedStorage, FurniturePlacement, OLIVIA_VITVAL_CANDIDATE, VEVELSTAD_BED, STORKLINTA_BED, JACKSON_BED, MICKE_DESK, MICKE_DRAWERS, ORFJALL_CHAIR, SMASTAD_WARDROBE, GURSKEN_WARDROBE, BedroomSelection, DEFAULT_BEDROOM_SELECTION, TUFFING_BED, KURA_BED, OliviaProductId } from './room-furniture';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface RoomDimensions { width: number; depth: number; height: number; notch?: { width: number; depth: number }; }

export interface RoomFixtures {
  window: { wall: 'left' | 'right'; offset: number; width: number; height: number; sill: number };
  outlet?: { width: number; height: number; windowOffset: number; sillGap: number };
  door: { offset?: number; width: number; height: number };
  radiator: { offset: number; width: number; height: number; depth: number };
}

/** One scene unit is one metre. This renderer owns and disposes its GPU resources. */
export class RoomScene {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(38, 1, 0.05, 100);
  private readonly controls: OrbitControls;
  private readonly resizeObserver: ResizeObserver;
  private readonly room = new THREE.Group();
  private readonly walls = new THREE.Group();
  private readonly furniture = new THREE.Group();
  private readonly grid = new THREE.Group();
  private dimensions: RoomDimensions = { width: 4, depth: 4, height: 2.7 };
  private disposed = false;
  private hasFixtures = false;
  private currentView: 'perspective' | 'top' = 'perspective';
  private readonly render = (): void => {
    if (!this.disposed) this.renderer.render(this.scene, this.camera);
  };
  private readonly contextLost = (event: Event): void => {
    event.preventDefault();
    this.onError();
  };

  constructor(private readonly host: HTMLElement, private readonly onError: () => void) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const canvas = this.renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Cutaway 3D view of the selected room');
    canvas.addEventListener('webglcontextlost', this.contextLost);
    host.appendChild(canvas);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.minDistance = 3;
    this.controls.maxDistance = 35;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.04;
    this.controls.addEventListener('change', this.render);

    this.scene.add(new THREE.HemisphereLight(0xf7fbff, 0xaea28a, 0.7));
    const sunlight = new THREE.DirectionalLight(0xfff1d6, 0.7);
    sunlight.position.set(3, 9, 5);
    sunlight.castShadow = true;
    sunlight.shadow.mapSize.set(2048, 2048);
    sunlight.shadow.camera.left = -12;
    sunlight.shadow.camera.right = 12;
    sunlight.shadow.camera.top = 12;
    sunlight.shadow.camera.bottom = -12;
    sunlight.shadow.normalBias = 0.025;
    this.scene.add(sunlight);
    this.scene.add(this.room, this.walls, this.grid, this.furniture);
    this.grid.visible = false;

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(host);
    this.resize();
  }

  setDimensions(dimensions: RoomDimensions, fixtures?: RoomFixtures, floor: 'wood' | 'ceramic' = 'wood'): void {
    this.dimensions = { ...dimensions };
    this.hasFixtures = !!fixtures;
    [this.room, this.walls, this.grid, this.furniture].forEach(group => this.clear(group));
    const { width, depth, height, notch } = dimensions;
    this.floorBox(width, 0.14, depth, 0, -0.1, 0, floor === 'ceramic' ? 0x555856 : 0xc4b49b);

    if (floor === 'ceramic') {
      // Granite-look 40 cm tiles with darker grout and subtle stone variation.
      const tileSize = 0.4;
      const grout = 0.006;
      this.floorBox(width, 0.025, depth, 0, -0.02, 0, 0x4a4d4c);
      const shades = [0x777a77, 0x686c6a, 0x858783, 0x707371];
      for (let column = 0; column < Math.ceil(width / tileSize); column++) {
        for (let row = 0; row < Math.ceil(depth / tileSize); row++) {
          const tileWidth = Math.min(tileSize, width - column * tileSize);
          const tileDepth = Math.min(tileSize, depth - row * tileSize);
          this.floorBox(tileWidth - grout, 0.02, tileDepth - grout,
            -width / 2 + column * tileSize + tileWidth / 2, -0.005,
            -depth / 2 + row * tileSize + tileDepth / 2, shades[(column * 3 + row * 2) % shades.length], 0.72);
        }
      }
    } else {
      // Individual boards give the floor a sense of scale without external textures.
      const boardCount = Math.ceil(width / 0.19);
      const boardWidth = width / boardCount;
      const shades = [0xc9ac82, 0xd6bc95, 0xd2b58c, 0xcdb087, 0xd9be97];
      for (let i = 0; i < boardCount; i++) {
        const sections = 3;
        for (let j = 0; j < sections; j++) {
          this.floorBox(boardWidth - 0.005, 0.035, depth / sections - 0.005,
            -width / 2 + boardWidth * (i + 0.5), -0.013,
            -depth / 2 + depth / sections * (j + 0.5), shades[(i * 3 + j) % shades.length]);
        }
      }
    }

    // Walls follow the interior outline, including the back-right recess.
    const backWidth = width - (notch?.width || 0);
    this.box(this.walls, backWidth + 0.12, height, 0.12,
      -(notch?.width || 0) / 2, height / 2, -depth / 2 - 0.06, 0xf3f1e9);
    this.box(this.walls, backWidth, 0.1, 0.025,
      -(notch?.width || 0) / 2, 0.05, -depth / 2 + 0.013, 0xfaf9f4);
    if (fixtures?.window.wall !== 'left') {
      this.box(this.walls, 0.12, height, depth + 0.12, -width / 2 - 0.06, height / 2, 0, 0xe0e5d9);
    }
    this.box(this.walls, 0.025, 0.1, depth, -width / 2 + 0.013, 0.05, 0, 0xfaf9f4);
    if (notch) {
      const cornerX = width / 2 - notch.width;
      const cornerZ = -depth / 2 + notch.depth;
      this.box(this.walls, 0.12, height, notch.depth + 0.12,
        cornerX + 0.06, height / 2, -depth / 2 + notch.depth / 2, 0xf3f1e9);
      this.box(this.walls, notch.width, height, 0.12,
        width / 2 - notch.width / 2, height / 2, cornerZ - 0.06, 0xf3f1e9);
      this.box(this.walls, 0.025, 0.1, notch.depth,
        cornerX - 0.013, 0.05, -depth / 2 + notch.depth / 2, 0xfaf9f4);
      this.box(this.walls, notch.width, 0.1, 0.025,
        width / 2 - notch.width / 2, 0.05, cornerZ + 0.013, 0xfaf9f4);
    }

    if (fixtures) this.addFixtures(dimensions, fixtures);

    const gridPoints: THREE.Vector3[] = [];
    for (let x = -width / 2; x <= width / 2 + 0.001; x += 0.5) {
      gridPoints.push(new THREE.Vector3(x, 0.012, -depth / 2 + (notch && x > width / 2 - notch.width ? notch.depth : 0)), new THREE.Vector3(x, 0.012, depth / 2));
    }
    for (let z = -depth / 2; z <= depth / 2 + 0.001; z += 0.5) {
      gridPoints.push(new THREE.Vector3(-width / 2, 0.012, z), new THREE.Vector3(width / 2 - (notch && z < -depth / 2 + notch.depth ? notch.width : 0), 0.012, z));
    }
    this.grid.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(gridPoints),
      new THREE.LineBasicMaterial({ color: 0x577763, transparent: true, opacity: 0.45 })));

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x7b8771 });
    const d = 0.38;
    const points = [
      [-width / 2, 0, depth / 2 + d], [width / 2, 0, depth / 2 + d],
      [-width / 2, 0, depth / 2 + d - 0.08], [-width / 2, 0, depth / 2 + d + 0.08],
      [width / 2, 0, depth / 2 + d - 0.08], [width / 2, 0, depth / 2 + d + 0.08],
      [width / 2 + d, 0, -depth / 2], [width / 2 + d, 0, depth / 2],
      [width / 2 + d - 0.08, 0, -depth / 2], [width / 2 + d + 0.08, 0, -depth / 2],
      [width / 2 + d - 0.08, 0, depth / 2], [width / 2 + d + 0.08, 0, depth / 2]
    ].map(([x, y, z]) => new THREE.Vector3(x, y, z));
    this.room.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points), lineMaterial));
    this.label(`${width.toFixed(2)} m`, 0, 0.08, depth / 2 + 0.65);
    this.label(`${depth.toFixed(2)} m`, width / 2 + 0.7, 0.08, 0);
    this.render();
  }

  private addFixtures({ width, depth, height }: RoomDimensions, fixtures: RoomFixtures): void {
    const window = fixtures.window;
    // Rotating the right-wall model also reverses elevation offsets for the left wall.
    const windowWall = new THREE.Group();
    if (window.wall === 'left') windowWall.rotation.y = Math.PI;
    this.walls.add(windowWall);
    const start = -depth / 2 + window.offset;
    const end = start + window.width;
    const x = width / 2 + 0.06;
    const wall = 0xf3f1e9;
    const frame = 0xfaf9f4;
    // Four wall sections leave a real opening around the window.
    this.box(windowWall, 0.12, height, window.offset, x, height / 2, -depth / 2 + window.offset / 2, wall);
    const remaining = depth - window.offset - window.width;
    this.box(windowWall, 0.12, height, remaining, x, height / 2, end + remaining / 2, wall);
    this.box(windowWall, 0.12, window.sill, window.width, x, window.sill / 2, (start + end) / 2, wall);
    const above = height - window.sill - window.height;
    this.box(windowWall, 0.12, above, window.width, x, height - above / 2, (start + end) / 2, wall);
    for (const z of [start + 0.025, end - 0.025]) {
      this.box(windowWall, 0.14, window.height, 0.05, x, window.sill + window.height / 2, z, frame);
    }
    for (const y of [window.sill + 0.025, window.sill + window.height - 0.025]) {
      this.box(windowWall, 0.14, 0.05, window.width, x, y, (start + end) / 2, frame);
    }
    const glass = new THREE.Mesh(new THREE.BoxGeometry(0.012, window.height - 0.1, window.width - 0.1),
      new THREE.MeshStandardMaterial({ color: 0xa9d9ed, transparent: true, opacity: 0.3, roughness: 0.15 }));
    glass.position.set(x, window.sill + window.height / 2, (start + end) / 2);
    windowWall.add(glass);
    this.box(windowWall, 0.23, 0.035, window.width + 0.08, x - 0.04, window.sill, (start + end) / 2, frame);

    // 8 × 8 cm wall outlet, 4 cm from the window's left edge in elevation.
    // The 4 cm gap below the sill was confirmed by the user.
    const outlet = fixtures.outlet;
    if (outlet) {
      const outletZ = start + outlet.windowOffset + outlet.width / 2;
      const outletY = window.sill - outlet.sillGap - outlet.height / 2;
      this.box(windowWall, 0.012, outlet.height, outlet.width,
        width / 2 - 0.006, outletY, outletZ, 0xfafafa, 0.35);
      const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.003, 24),
        new THREE.MeshStandardMaterial({ color: 0xd6d6d2, roughness: 0.4 }));
      socket.rotation.z = Math.PI / 2;
      socket.position.set(width / 2 - 0.014, outletY, outletZ);
      windowWall.add(socket);
      for (const offset of [-0.0095, 0.0095]) {
        const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.002, 12),
          new THREE.MeshStandardMaterial({ color: 0x343434 }));
        hole.rotation.z = Math.PI / 2;
        hole.position.set(width / 2 - 0.016, outletY, outletZ + offset);
        windowWall.add(hole);
      }
    }

    // Door on the cutaway front wall, hinged at the left corner and open inward.
    // The plan specifies its width and swing, but not its height.
    const door = fixtures.door;
    const doorX = -width / 2 + (door.offset || 0);
    const hinge = new THREE.Group();
    hinge.position.set(doorX, 0, depth / 2);
    hinge.rotation.y = Math.PI / 4;
    this.room.add(hinge);
    this.box(hinge, door.width, door.height, 0.035, door.width / 2, door.height / 2, 0, 0xd8c09b);
    this.box(hinge, 0.1, 0.025, 0.065, door.width - 0.1, 1, -0.035, 0x777b7c);
    for (const jambX of [doorX, doorX + door.width]) {
      this.box(this.walls, 0.045, door.height + 0.045, 0.1, jambX, (door.height + 0.045) / 2, depth / 2, frame);
    }
    this.box(this.walls, door.width + 0.09, 0.045, 0.1,
      doorX + door.width / 2, door.height + 0.0225, depth / 2, frame);
    const arc: THREE.Vector3[] = [];
    for (let i = 0; i < 32; i++) {
      for (const angle of [i / 32 * Math.PI / 2, (i + 1) / 32 * Math.PI / 2]) {
        arc.push(new THREE.Vector3(doorX + door.width * Math.cos(angle), 0.025,
          depth / 2 - door.width * Math.sin(angle)));
      }
    }
    this.room.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(arc),
      new THREE.LineBasicMaterial({ color: 0x7b8771 })));

    // Left elevation starts at the front corner; radiator rests at floor level.
    const radiator = fixtures.radiator;
    const radiatorZ = depth / 2 - radiator.offset - radiator.width / 2;
    this.box(this.room, radiator.depth, radiator.height, radiator.width,
      -width / 2 + radiator.depth / 2 + 0.025, radiator.height / 2, radiatorZ, 0xe9e9e5);
    for (let i = 0; i < 9; i++) {
      this.box(this.room, 0.018, radiator.height - 0.04, 0.025,
        -width / 2 + radiator.depth + 0.03, radiator.height / 2,
        radiatorZ - radiator.width / 2 + 0.04 + i * (radiator.width - 0.08) / 8, 0xffffff);
    }
  }

  setFurniture(placements: readonly FurniturePlacement[]): void {
    this.clear(this.furniture);
    for (const placement of placements) {
      const bed = new THREE.Group();
      bed.name = placement.product.name;
      bed.position.set(placement.x, 0, placement.z);
      bed.rotation.y = placement.rotation || 0;
      this.furniture.add(bed);
      const { width, depth, height, footboardHeight } = placement.product.dimensions;
      const upholstery = 0x55565a;
      // Product dimensions are exact; upholstery details and bedding are illustrative.
      for (const x of [-width / 2 + 0.05, width / 2 - 0.05]) {
        for (const z of [-depth / 2 + 0.08, depth / 2 - 0.08]) {
          this.box(bed, 0.035, 0.2, 0.035, x, 0.1, z, 0x252729);
        }
      }
      this.box(bed, width, height - 0.16, 0.045, 0, (height + 0.16) / 2,
        -depth / 2 + 0.0225, upholstery);
      this.box(bed, width, 0.2, 0.035, 0, footboardHeight - 0.1,
        depth / 2 - 0.0175, upholstery);
      for (const x of [-width / 2 + 0.01, width / 2 - 0.01]) {
        this.box(bed, 0.02, 0.2, depth - 0.08, x, 0.3, 0, upholstery);
      }
      const mattress = placement.product.mattress;
      this.box(bed, mattress.width, 0.16, mattress.depth, 0, 0.43, 0.01, 0xf5f2e9);
      this.box(bed, mattress.width + 0.01, 0.04, mattress.depth * 0.675,
        0, 0.525, mattress.depth * 0.155, 0x8eaaa2);
      this.box(bed, 0.62, 0.1, 0.38, 0, 0.56, -mattress.depth / 2 + 0.28, 0xfaf8f2);
    }
    this.render();
  }

  setOliviaLayout(product: OliviaProductId, visible: boolean, upperBedVisible: boolean,
    selection: Readonly<BedroomSelection> = DEFAULT_BEDROOM_SELECTION): void {
    this.clear(this.furniture);
    if (!visible) { this.render(); return; }
    if (product === 'beds-micke') {
      this.setBedroomLayout(selection);
      this.render();
      return;
    }
    if (product === 'kura') {
      this.setKuraLayout(upperBedVisible);
      this.render();
      return;
    }
    if (product === 'tuffing') {
      this.setTuffingLayout(upperBedVisible);
      this.render();
      return;
    }
    if (product === 'vitval') {
      this.setVitvalLayout(upperBedVisible);
      this.render();
      return;
    }
    this.setSmastadLayout(upperBedVisible);
    this.render();
  }

  /** KURA raised configuration, matched to IKEA's white/pine product photo. */
  private setKuraLayout(upperBedVisible: boolean): void {
    const { width, depth, height, underBedHeight } = KURA_BED.dimensions;
    const wood = 0xd8bb8d;
    const white = 0xf2f0e8;
    const x = -0.225;
    const z = -this.dimensions.depth / 2 + 0.03 + depth / 2;
    const left = x - width / 2;
    const right = x + width / 2;
    const back = z - depth / 2;
    const front = z + depth / 2;
    const post = 0.045;
    const upper = new THREE.Group();
    upper.name = 'KURA raised bed';
    upper.visible = upperBedVisible;
    this.furniture.add(upper);
    // Corner uprights and floor rails remain visible when looking underneath.
    for (const px of [left + post / 2, right - post / 2]) {
      for (const pz of [back + post / 2, front - post / 2]) {
        this.box(this.furniture, post, underBedHeight, post, px, underBedHeight / 2, pz, wood);
        this.box(upper, post, height - underBedHeight, post, px, (height + underBedHeight) / 2, pz, wood);
      }
      this.box(this.furniture, post, post, depth, px, post / 2, z, wood);
    }
    for (const pz of [back + post / 2, front - post / 2]) {
      this.box(this.furniture, width, post, post, x, post / 2, pz, wood);
    }
    // The left end is panelled down to floor level; other lower sides are open.
    this.box(this.furniture, 0.012, underBedHeight - 2 * post, depth - 2 * post,
      left + post / 2, underBedHeight / 2, z, white);
    // Integrated vertical ladder on the front-left, within the bed footprint.
    const ladderRight = left + 0.4;
    this.box(this.furniture, post, underBedHeight, post,
      ladderRight, underBedHeight / 2, front - post / 2, wood);
    this.box(upper, post, height - underBedHeight, post,
      ladderRight, (height + underBedHeight) / 2, front - post / 2, wood);
    for (const y of [0.29, 0.57]) {
      this.box(this.furniture, 0.4, post, 0.06, left + 0.2, y, front - 0.03, wood);
    }
    this.box(upper, width, 0.045, depth, x, underBedHeight + 0.0225, z, wood);
    // White inset guards framed in pine; leave the ladder entrance open.
    const guardHeight = height - underBedHeight;
    for (const [start, end, pz] of [[left, right, back + post / 2], [ladderRight, right, front - post / 2]]) {
      this.box(upper, end - start, guardHeight - 2 * post, 0.012,
        (start + end) / 2, (height + underBedHeight) / 2, pz, white);
      for (const y of [underBedHeight + post / 2, height - post / 2]) {
        this.box(upper, end - start, post, post, (start + end) / 2, y, pz, wood);
      }
    }
    for (const px of [left + post / 2, right - post / 2]) {
      this.box(upper, 0.012, guardHeight - 2 * post, depth - 2 * post,
        px, (height + underBedHeight) / 2, z, white);
      for (const y of [underBedHeight + post / 2, height - post / 2]) {
        this.box(upper, post, post, depth, px, y, z, wood);
      }
    }
  }

  private setBedroomLayout(selection: Readonly<BedroomSelection>): void {
    const bed = selection.vevelstad ? VEVELSTAD_BED : selection.storklinta ? STORKLINTA_BED : selection.jackson ? JACKSON_BED : undefined;
    if (bed) {
      this.addSingleBed(bed);
      const storage = UNDER_BED_STORAGE.find(option => selection[option.id]);
      if (storage) this.addUnderBedStorage(bed, storage);
    }
    if (selection.desk) this.addMickeDesk(0.9, 0.75);
    if (selection.drawers) {
      this.addMickeDrawers(0.9 - MICKE_DESK.dimensions.width / 2 - MICKE_DRAWERS.dimensions.width / 2, 0.75);
    }
    if (selection.chair) this.addOrfjallChair(0.91, 0.30);
    // Alternative wardrobes share the back-right corner and face into the room (+Z).
    const wardrobe = selection.gursken ? GURSKEN_WARDROBE : selection.smastad ? SMASTAD_WARDROBE : undefined;
    if (wardrobe) {
      const x = this.dimensions.width / 2 - 0.03 - wardrobe.dimensions.width / 2;
      const z = -this.dimensions.depth / 2 + 0.03 + wardrobe.dimensions.depth / 2;
      if (selection.gursken) this.addGurskenWardrobe(x, z);
      else this.addSmastadWardrobe(x, z);
    }
  }

  private addUnderBedStorage(bed: typeof VEVELSTAD_BED | typeof STORKLINTA_BED | typeof JACKSON_BED, storage: UnderBedStorage): void {
    const row = new THREE.Group();
    row.name = `${storage.name} storage row`;
    this.furniture.add(row);
    const count = storageCount(bed, storage);
    const span = count * storage.width + (count - 1) * 0.01;
    const bedX = -this.dimensions.width / 2 + 0.01 + bed.dimensions.depth / 2;
    const front = -this.dimensions.depth / 2 + 0.03 + bed.dimensions.width - 0.05;
    for (let i = 0; i < count; i++) {
      const box = new THREE.Group();
      box.name = `${storage.name} ${i + 1}`;
      box.position.set(bedX - span / 2 + storage.width / 2 + i * (storage.width + 0.01), 0,
        front - storage.depth / 2);
      row.add(box);
      const { width, depth, height } = storage;
      const base = storage.kind === 'wheels' ? 0.035 : 0;
      const white = storage.kind === 'fabric' ? 0xe6e3dc : 0xf2f0e8;
      if (base) {
        for (const x of [-width / 2 + 0.04, width / 2 - 0.04]) {
          for (const z of [-depth / 2 + 0.04, depth / 2 - 0.04]) {
            const wheel = new THREE.Mesh(new THREE.CylinderGeometry(base / 2, base / 2, 0.022, 12),
              new THREE.MeshStandardMaterial({ color: 0x454847 }));
            wheel.rotation.z = Math.PI / 2;
            wheel.position.set(x, base / 2, z);
            wheel.castShadow = true;
            box.add(wheel);
          }
        }
      }
      this.box(box, width - 0.006, height - base - 0.012, depth - 0.006,
        0, base + (height - base - 0.012) / 2, 0, white);
      this.box(box, width, 0.012, depth, 0, height - 0.006, 0,
        storage.kind === 'wheels' ? 0xc8c5bd : white);
      // Front-facing fabric pull / recessed grip remains inside the quoted footprint.
      this.box(box, 0.09, 0.022, 0.002, 0, base + (height - base) * 0.65,
        depth / 2 - 0.002, storage.kind === 'fabric' ? 0xb0ada5 : 0x777971);
    }
  }

  private addSingleBed(product: typeof VEVELSTAD_BED | typeof STORKLINTA_BED | typeof JACKSON_BED): void {
    const bed = new THREE.Group();
    bed.name = product.name;
    const { width, depth, height, footboardHeight } = product.dimensions;
    // 1 cm at the headboard leaves 2 cm between STORKLINTA and SMÅSTAD
    // with the wardrobe 3 cm from the opposite wall: 1 + 199 + 2 + 60 + 3 = 265 cm.
    bed.position.set(-this.dimensions.width / 2 + 0.01 + depth / 2,
      0, -this.dimensions.depth / 2 + 0.03 + width / 2);
    bed.rotation.y = Math.PI / 2;
    this.furniture.add(bed);
    const white = 0xf2f0e8;
    const metal = product.name === 'VEVELSTAD';
    const panel = metal ? 0.035 : 0.04;
    const baseHeight = metal ? 0.27 : 0.30;
    for (const px of [-width / 2 + panel / 2, width / 2 - panel / 2]) {
      for (const pz of [-depth / 2 + panel / 2, depth / 2 - panel / 2]) {
        this.box(bed, panel, 0.20, panel, px, 0.10, pz, white);
      }
      this.box(bed, panel, metal ? 0.07 : 0.19, depth - 2 * panel,
        px, metal ? 0.235 : 0.295, 0, white);
    }
    for (const [pz, top] of [[-depth / 2 + panel / 2, height], [depth / 2 - panel / 2, footboardHeight]]) {
      this.box(bed, width, top - 0.20, panel, 0, (top + 0.20) / 2, pz, white);
    }
    if (product.name === 'CHILD JACKSON') {
      // The Conforama frame includes two white drawers reaching the floor.
      // They sit along the long side, each occupying half of the 189 cm span.
      const drawerHeight = 0.21;
      const drawerWidth = width / 2 - 0.012;
      const drawerDepth = 0.42;
      for (const x of [-width / 4, width / 4]) {
        this.box(bed, drawerWidth, drawerHeight, drawerDepth,
          x, drawerHeight / 2, depth / 2 - drawerDepth / 2, 0xf2f0e8);
        this.box(bed, drawerWidth - 0.03, 0.014, 0.012,
          x, drawerHeight * 0.56, depth / 2 + 0.006, 0x777971);
      }
    }
    for (let i = 0; i < 15; i++) {
      this.box(bed, product.mattress.width, 0.015, 0.055,
        0, baseHeight - 0.0075, -0.90 + i * 1.8 / 14, 0xd8bb8d);
    }
    // Illustrative 16 cm mattress and bedding, within the catalogue frame footprint.
    this.box(bed, 0.9, 0.16, 1.9, 0, baseHeight + 0.08, 0, 0xf5f2e9);
    this.box(bed, 0.91, 0.04, 1.25, 0, baseHeight + 0.18, 0.30, 0x8eaaa2);
    this.box(bed, 0.62, 0.10, 0.38, 0, baseHeight + 0.21, -0.65, 0xfaf8f2);
  }

  private addGurskenWardrobe(x: number, z: number): void {
    const wardrobe = new THREE.Group();
    wardrobe.name = 'GURSKEN wardrobe';
    wardrobe.position.set(x, 0, z);
    this.furniture.add(wardrobe);
    const { width, depth, height } = GURSKEN_WARDROBE.dimensions;
    const beige = 0xd8d1bf;
    const panel = 0.018;
    const plinth = 0.07;
    for (const px of [-width / 2 + panel / 2, width / 2 - panel / 2]) {
      this.box(wardrobe, panel, height, depth, px, height / 2, 0, beige);
    }
    for (const y of [plinth + panel / 2, height - panel / 2]) {
      this.box(wardrobe, width - 2 * panel, panel, depth, 0, y, 0, beige);
    }
    this.box(wardrobe, width - 2 * panel, height, panel, 0, height / 2, -depth / 2 + panel / 2, beige);
    this.box(wardrobe, width - 2 * panel, plinth, panel, 0, plinth / 2, depth / 2 - 0.04, beige);
    this.box(wardrobe, width - 2 * panel - 0.003, height - plinth - 2 * panel,
      panel, 0, (height + plinth) / 2, depth / 2 - panel / 2, beige);
    // Single door with a small dark pull; details are illustrative.
    this.box(wardrobe, 0.018, 0.055, 0.018, -width / 2 + 0.06, 0.95, depth / 2 + 0.009, 0x45443f);
  }

  private addSmastadWardrobe(x: number, z: number): void {
    const wardrobe = new THREE.Group();
    wardrobe.name = 'SMÅSTAD wardrobe';
    wardrobe.position.set(x, 0, z);
    this.furniture.add(wardrobe);
    const { width, depth, height } = SMASTAD_WARDROBE.dimensions;
    const white = 0xf2f0e8;
    const panel = 0.018;
    const feetHeight = 0.01;
    const bodyHeight = height - feetHeight;
    // Overall dimensions include the doors and adjustable feet.
    for (const px of [-width / 2 + 0.04, width / 2 - 0.04]) {
      for (const pz of [-depth / 2 + 0.04, depth / 2 - 0.04]) {
        this.box(wardrobe, 0.035, feetHeight, 0.035, px, feetHeight / 2, pz, 0x707570);
      }
    }
    for (const px of [-width / 2 + panel / 2, width / 2 - panel / 2]) {
      this.box(wardrobe, panel, bodyHeight, depth - panel,
        px, feetHeight + bodyHeight / 2, -panel / 2, white);
    }
    for (const y of [feetHeight + panel / 2, height - panel / 2]) {
      this.box(wardrobe, width - 2 * panel, panel, depth - panel, 0, y, -panel / 2, white);
    }
    this.box(wardrobe, width - 2 * panel, bodyHeight - 2 * panel, panel,
      0, feetHeight + bodyHeight / 2, -depth / 2 + panel / 2, white);
    // Two pairs of 30 × 90 cm door fronts. Handles are sold separately.
    for (const px of [-width / 4, width / 4]) {
      for (const y of [feetHeight + bodyHeight / 4, feetHeight + 3 * bodyHeight / 4]) {
        this.box(wardrobe, width / 2 - 0.003, bodyHeight / 2 - 0.003, panel,
          px, y, depth / 2 - panel / 2, white);
      }
    }
  }

  private addOrfjallChair(x: number, z: number): void {
    const chair = new THREE.Group();
    chair.name = 'ÖRFJÄLL chair';
    chair.position.set(x, 0, z);
    this.furniture.add(chair);
    const { width, seatWidth, seatDepth, minHeight, minSeatHeight } = ORFJALL_CHAIR.dimensions;
    const white = 0xf2f0e8;
    const blue = 0x263d59;
    // Lowest seat setting. Upholstery and frame details are illustrative.
    const tube = (from: THREE.Vector3, to: THREE.Vector3, radius: number, color: number): void => {
      const direction = to.clone().sub(from);
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), 16),
        new THREE.MeshStandardMaterial({ color: new THREE.Color(color).convertSRGBToLinear(), roughness: 0.7 }));
      mesh.position.copy(from).add(to).multiplyScalar(0.5);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
      mesh.castShadow = mesh.receiveShadow = true;
      chair.add(mesh);
    };
    tube(new THREE.Vector3(0, 0.09, 0), new THREE.Vector3(0, minSeatHeight - 0.045, 0), 0.026, white);
    // Five radial legs with paired castors, inside the 68 cm base footprint.
    const radius = width / 2 - 0.035;
    for (let i = 0; i < 5; i++) {
      const angle = i * Math.PI * 2 / 5;
      const px = Math.sin(angle) * radius;
      const pz = Math.cos(angle) * radius;
      tube(new THREE.Vector3(0, 0.12, 0), new THREE.Vector3(px, 0.075, pz), 0.018, white);
      const axle = new THREE.Vector3(Math.cos(angle), 0, -Math.sin(angle));
      const center = new THREE.Vector3(px, 0.035, pz);
      tube(center.clone().addScaledVector(axle, -0.023), center.clone().addScaledVector(axle, 0.023), 0.035, white);
    }
    for (const px of [-0.15, 0.15]) {
      tube(new THREE.Vector3(px, minSeatHeight - 0.04, -0.15),
        new THREE.Vector3(px, minHeight - 0.10, -seatDepth / 2), 0.012, white);
    }
    // Rounded upholstered seat and separate backrest.
    const cushion = (w: number, h: number, thickness: number): THREE.Mesh => {
      const shape = new THREE.Shape();
      const r = 0.035;
      shape.moveTo(-w / 2 + r, -h / 2);
      shape.lineTo(w / 2 - r, -h / 2);
      shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
      shape.lineTo(w / 2, h / 2 - r);
      shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
      shape.lineTo(-w / 2 + r, h / 2);
      shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
      shape.lineTo(-w / 2, -h / 2 + r);
      shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
      const geometry = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false, steps: 1, curveSegments: 8 });
      geometry.translate(0, 0, -thickness / 2);
      const mesh = new THREE.Mesh(geometry,
        new THREE.MeshStandardMaterial({ color: new THREE.Color(blue).convertSRGBToLinear(), roughness: 1 }));
      mesh.castShadow = mesh.receiveShadow = true;
      chair.add(mesh);
      return mesh;
    };
    const seat = cushion(seatWidth, seatDepth, 0.05);
    seat.rotation.x = -Math.PI / 2;
    seat.position.y = minSeatHeight - 0.025;
    const back = cushion(seatWidth - 0.04, 0.25, 0.045);
    back.position.set(0, minHeight - 0.125, -seatDepth / 2 + 0.0225);
  }

  private addMickeDrawers(x: number, z: number): void {
    const drawers = new THREE.Group();
    drawers.name = 'MICKE drawers';
    drawers.position.set(x, 0, z);
    this.furniture.add(drawers);
    const { width, depth, height } = MICKE_DRAWERS.dimensions;
    const white = 0xf2f0e8;
    const panel = 0.018;
    const wheelHeight = 0.05;
    // Overall dimensions include the castors; drawer fronts face the bed (-Z).
    for (const px of [-width / 2 + 0.045, width / 2 - 0.045]) {
      for (const pz of [-depth / 2 + 0.055, depth / 2 - 0.055]) {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.025, 16),
          new THREE.MeshStandardMaterial({ color: 0x363839 }));
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(px, wheelHeight / 2, pz);
        wheel.castShadow = true;
        drawers.add(wheel);
      }
    }
    this.box(drawers, width, panel, depth, 0, height - panel / 2, 0, white);
    this.box(drawers, width, panel, depth, 0, wheelHeight + panel / 2, 0, white);
    for (const px of [-width / 2 + panel / 2, width / 2 - panel / 2]) {
      this.box(drawers, panel, height - wheelHeight - 2 * panel, depth,
        px, (height + wheelHeight) / 2, 0, white);
    }
    this.box(drawers, width - 2 * panel, height - wheelHeight - 2 * panel, panel,
      0, (height + wheelHeight) / 2, depth / 2 - panel / 2, white);
    // Three shallow drawers over a deeper bottom drawer; details are illustrative.
    const bottom = wheelHeight + panel;
    const available = height - panel - bottom;
    let y = bottom;
    for (const proportion of [0.4, 0.2, 0.2, 0.2]) {
      const drawerHeight = available * proportion;
      this.box(drawers, width - 2 * panel - 0.004, drawerHeight - 0.004, panel,
        0, y + drawerHeight / 2, -depth / 2 + panel / 2, white);
      this.box(drawers, 0.1, 0.012, 0.004,
        0, y + drawerHeight - 0.014, -depth / 2, 0x454847);
      y += drawerHeight;
    }
  }

  private addMickeDesk(x: number, z: number, rotation = 0): void {
    const desk = new THREE.Group();
    desk.name = 'MICKE';
    desk.position.set(x, 0, z);
    desk.rotation.y = rotation;
    this.furniture.add(desk);
    const { width, depth, height } = MICKE_DESK.dimensions;
    const white = 0xf2f0e8;
    this.box(desk, width, 0.035, depth, 0, height - 0.0175, 0, white);
    this.box(desk, 0.035, height - 0.035, depth, -width / 2 + 0.0175, (height - 0.035) / 2, 0, white);
    for (const z of [-depth / 2 + 0.02, depth / 2 - 0.02]) {
      this.box(desk, 0.025, height - 0.035, 0.025, width / 2 - 0.02, (height - 0.035) / 2, z, white);
    }
    this.box(desk, 0.025, 0.025, depth, width / 2 - 0.02, 0.0125, 0, white);
    this.box(desk, width - 0.07, 0.09, 0.025, 0, 0.675, -depth / 2 + 0.0125, white);
    this.box(desk, 0.12, 0.012, 0.005, 0, 0.713, -depth / 2 - 0.0025, 0x707570);
    this.box(desk, width - 0.07, 0.12, 0.025, 0, 0.65, depth / 2 - 0.0125, white);
  }

  /** Simplified SMÅSTAD candidate; metres. Carcass sits inside the 207 × 104 cm footprint; pulls project 2.5 cm. */
  private setSmastadLayout(upperBedVisible: boolean): void {
    const frame = 0xd4bb96;
    const white = 0xf2f0e8;
    const bedWidth = 2.07;
    const bedDepth = 1.04;
    const bedX = -0.225;
    const bedZ = -0.48;
    const bedLeft = bedX - bedWidth / 2;
    const bedRight = bedX + bedWidth / 2;
    const bedBack = bedZ - bedDepth / 2;
    const bedFront = bedZ + bedDepth / 2;
    const upper = new THREE.Group();
    upper.visible = upperBedVisible;
    this.furniture.add(upper);
    // SMÅSTAD footprint 207 × 104 cm, placed 3 cm from the back wall.
    for (const x of [bedLeft + 0.035, bedRight - 0.035]) {
      for (const z of [bedBack + 0.035, bedFront - 0.035]) {
        this.box(this.furniture, 0.07, 1.42, 0.07, x, 0.71, z, frame);
        this.box(upper, 0.07, 0.4, 0.07, x, 1.62, z, frame);
      }
    }
    this.box(upper, bedWidth, 0.1, bedDepth, bedX, 1.42, bedZ, frame);
    this.box(upper, 2, 0.12, 0.9, bedX, 1.53, bedZ, white);
    this.box(upper, 1.35, 0.025, 0.91, bedX + 0.3, 1.605, bedZ, 0xbba6bf);
    this.box(upper, 0.38, 0.08, 0.62, bedLeft + 0.3, 1.63, bedZ, white);
    // Illustrative guardrails; the front rail stops short of the right end to leave the
    // ladder opening, and the ladder below is aligned to exactly that gap.
    const railWidth = 1.65;
    const railX = bedX - 0.225;
    for (const y of [1.67, 1.79]) {
      this.box(upper, bedWidth, 0.06, 0.045, bedX, y, bedBack + 0.02, frame);
      this.box(upper, railWidth, 0.06, 0.045, railX, y, bedFront - 0.02, frame);
      for (const x of [bedLeft + 0.02, bedRight - 0.02]) this.box(upper, 0.045, 0.06, bedDepth, x, y, bedZ, frame);
    }

    // Reference arrangement of combination 594.288.73: the desk runs along the back wall
    // from the left end, its 3-drawer chest underneath at that end, the storage tower fills
    // the right end behind the ladder, and the ladder is flat on the front face.
    const deskWidth = 1.48;
    const deskDepth = 0.6;
    const deskX = bedLeft + deskWidth / 2;
    const deskZ = bedBack + deskDepth / 2;
    const chestWidth = 0.6;
    const chestDepth = 0.58;
    const chestX = bedLeft + chestWidth / 2;
    const chestZ = bedBack + chestDepth / 2;
    const chestHeight = 0.69;
    // The 148 × 60 cm desk top is carried by the chest at its left end and legs at its right.
    this.box(this.furniture, deskWidth, 0.04, deskDepth, deskX, 0.73, deskZ, frame);
    for (const z of [deskZ - deskDepth / 2 + 0.04, deskZ + deskDepth / 2 - 0.04]) {
      this.box(this.furniture, 0.04, 0.7, 0.04, bedLeft + deskWidth - 0.04, 0.35, z, white);
    }
    // Three drawers; the fronts face the room and their handles are sold separately.
    this.box(this.furniture, chestWidth, chestHeight, chestDepth, chestX, chestHeight / 2, chestZ, white);
    for (let i = 0; i < 3; i++) {
      this.box(this.furniture, chestWidth - 0.03, 0.2, 0.02,
        chestX, 0.115 + i * 0.23, chestZ + chestDepth / 2 + 0.01, frame);
    }

    // The storage runs along the entire right-hand bed end. Its door, bottom
    // drawer and adjacent open shelves all face +X: Olivia's window wall.
    // Build a hollow carcass so shelves read as openings rather than trim on a block.
    const towerLeft = bedLeft + deskWidth;
    const towerWidth = bedRight - towerLeft;
    const panel = 0.025;
    const towerBack = bedBack + 0.02;
    const towerFront = bedFront - 0.075;
    const towerDepth = towerFront - towerBack;
    const towerX = towerLeft + towerWidth / 2;
    const towerZ = (towerBack + towerFront) / 2;
    const wardrobeDepth = 0.56;
    const dividerZ = towerBack + wardrobeDepth;
    const wardrobeZ = (towerBack + dividerZ) / 2;
    const shelfDepth = towerFront - dividerZ;
    const shelfZ = (dividerZ + towerFront) / 2;
    const storage = new THREE.Group();
    storage.name = 'smastad-window-facing-storage';
    this.furniture.add(storage);
    this.box(storage, panel, 1.42, towerDepth,
      towerLeft + panel / 2, 0.71, towerZ, white);
    for (const z of [towerBack + panel / 2, dividerZ, towerFront - panel / 2]) {
      this.box(storage, towerWidth, 1.42, panel, towerX, 0.71, z, white);
    }
    for (const y of [0.035, 1.395]) {
      this.box(storage, towerWidth, panel, towerDepth, towerX, y, towerZ, white);
    }
    // Fronts sit outside the carcass on the window-facing end, never on +Z
    // (the ladder/room face). Leave a visible reveal between the door and drawer.
    const frontX = bedRight - panel / 2;
    this.box(storage, panel, 1.02, wardrobeDepth - 0.04,
      frontX, 0.875, wardrobeZ, white);
    this.box(storage, panel, 0.29, wardrobeDepth - 0.04,
      frontX, 0.195, wardrobeZ, white);
    // Small contrasting pulls make the opening direction unambiguous.
    this.box(storage, 0.025, 0.09, 0.025,
      bedRight + 0.0125, 0.87, dividerZ - 0.08, 0x87917e);
    this.box(storage, 0.025, 0.025, 0.12,
      bedRight + 0.0125, 0.29, wardrobeZ, 0x87917e);
    for (const y of [0.38, 0.73, 1.08]) {
      this.box(storage, towerWidth - panel, panel, shelfDepth - panel,
        towerX + panel / 2, y, shelfZ, white);
    }

    // Fixed ladder on the front face, filling the guardrail opening at the right end.
    const ladderLeft = railX + railWidth / 2;
    const ladderRight = bedRight - 0.02;
    const ladderWidth = ladderRight - ladderLeft;
    const ladderX = (ladderLeft + ladderRight) / 2;
    const ladderZ = bedFront - 0.04;
    for (const x of [ladderLeft + 0.03, ladderRight - 0.03]) {
      this.box(this.furniture, 0.06, 1.48, 0.06, x, 0.74, ladderZ, frame);
    }
    for (let y = 0.22; y < 1.42; y += 0.27) {
      this.box(this.furniture, ladderWidth - 0.1, 0.05, 0.05, ladderX, y, ladderZ, frame);
    }

    // One chair in the knee space between the chest and the desk's right leg.
    const chairX = (bedLeft + chestWidth + bedLeft + deskWidth) / 2;
    const chairZ = deskZ + deskDepth / 2 + 0.25;
    this.box(this.furniture, 0.4, 0.05, 0.4, chairX, 0.44, chairZ, 0x8eaaa2);
    this.box(this.furniture, 0.4, 0.35, 0.04, chairX, 0.635, chairZ + 0.2, 0x8eaaa2);
  }

  /** VITVAL frame only. IKEA footprint: 207 × 97 cm, 135 cm including ladder. */
  private setVitvalLayout(upperBedVisible: boolean): void {
    const frame = 0xf2f0e8;
    const fabric = 0xa9adaa;
    const dimensions = OLIVIA_VITVAL_CANDIDATE.dimensions;
    const bedWidth = dimensions.width;
    const bedDepth = dimensions.depth;
    const bedX = -0.225;
    const bedZ = -0.48;
    const bedLeft = bedX - bedWidth / 2;
    const bedRight = bedX + bedWidth / 2;
    const bedBack = bedZ - bedDepth / 2;
    const bedFront = bedZ + bedDepth / 2;
    const radius = 0.0225;
    const upper = new THREE.Group();
    upper.visible = upperBedVisible;
    this.furniture.add(upper);
    const tube = (group: THREE.Group, from: THREE.Vector3, to: THREE.Vector3) => {
      const direction = to.clone().sub(from);
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), 12),
        new THREE.MeshStandardMaterial({ color: frame, roughness: 0.65 }));
      mesh.position.copy(from).add(to).multiplyScalar(0.5);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    };
    for (const x of [bedLeft + radius, bedRight - radius]) {
      for (const z of [bedBack + radius, bedFront - radius]) {
        tube(this.furniture, new THREE.Vector3(x, 0, z), new THREE.Vector3(x, 1.51, z));
        tube(upper, new THREE.Vector3(x, 1.51, z), new THREE.Vector3(x, 1.95, z));
      }
      for (const y of [0.55, 0.95]) {
        this.box(this.furniture, 0.035, 0.06, bedDepth - 0.045, x, y, bedZ, frame);
      }
    }
    this.box(upper, bedWidth, 0.06, bedDepth, bedX, 1.54, bedZ, frame);
    // Front entrance is near the right end, with a short guard beyond it.
    const ladderRight = bedRight - 0.38;
    const ladderLeft = ladderRight - 0.4;
    for (const [left, right] of [[bedLeft, ladderLeft], [ladderRight, bedRight]]) {
      this.box(upper, right - left, 0.34, 0.025, (left + right) / 2, 1.755, bedFront - radius, fabric);
    }
    this.box(upper, bedWidth, 0.34, 0.025, bedX, 1.755, bedBack + radius, fabric);
    for (const x of [bedLeft + radius, bedRight - radius]) {
      this.box(upper, 0.025, 0.34, bedDepth - 0.045, x, 1.755, bedZ, fabric);
    }
    // Match the published outermost ladder footprint, including tube radius.
    // The lower rails slope outwards; the handrails rise vertically at the opening.
    // The exact bend/step positions are illustrative, not dimensioned by IKEA.
    const topZ = bedFront - radius;
    const footZ = bedBack + dimensions.depthWithLadder - radius;
    const footY = radius;
    const ladderTop = dimensions.underBedHeight;
    const ladder = new THREE.Group();
    ladder.name = 'vitval-sloping-ladder';
    this.furniture.add(ladder);
    for (const x of [ladderLeft, ladderRight]) {
      tube(ladder, new THREE.Vector3(x, footY, footZ), new THREE.Vector3(x, ladderTop, topZ));
      tube(upper, new THREE.Vector3(x, ladderTop, topZ), new THREE.Vector3(x, 1.95, topZ));
    }
    for (const y of [0.28, 0.58, 0.88, 1.18, 1.48]) {
      const z = footZ + (topZ - footZ) * (y - footY) / (ladderTop - footY);
      tube(ladder, new THREE.Vector3(ladderLeft, y, z), new THREE.Vector3(ladderRight, y, z));
    }
  }

  /** TUFFING frame and separate MICKE; ladder footprint from IKEA dimension drawing. */
  private setTuffingLayout(upperBedVisible: boolean): void {
    const frame = 0x4b4e50;
    const fabric = 0x727574;
    const dimensions = TUFFING_BED.dimensions;
    const bedWidth = dimensions.width;
    const bedDepth = dimensions.depth;
    const bedX = -0.225;
    const bedZ = -0.48;
    const bedLeft = bedX - bedWidth / 2;
    const bedRight = bedX + bedWidth / 2;
    const bedBack = bedZ - bedDepth / 2;
    const bedFront = bedZ + bedDepth / 2;
    const radius = 0.0225;
    const upper = new THREE.Group();
    upper.visible = upperBedVisible;
    this.furniture.add(upper);
    const tube = (group: THREE.Group, from: THREE.Vector3, to: THREE.Vector3) => {
      const direction = to.clone().sub(from);
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, direction.length(), 12),
        new THREE.MeshStandardMaterial({ color: frame, roughness: 0.65 }));
      mesh.position.copy(from).add(to).multiplyScalar(0.5);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    };
    for (const x of [bedLeft + radius, bedRight - radius]) {
      for (const z of [bedBack + radius, bedFront - radius]) {
        tube(this.furniture, new THREE.Vector3(x, 0, z), new THREE.Vector3(x, 1.45, z));
        tube(upper, new THREE.Vector3(x, 1.45, z), new THREE.Vector3(x, 1.79, z));
      }
      for (const y of [0.55, 0.95]) {
        this.box(this.furniture, 0.035, 0.06, bedDepth - 0.045, x, y, bedZ, frame);
      }
    }
    this.box(upper, bedWidth, 0.06, bedDepth, bedX, 1.48, bedZ, frame);
    // Central entrance, with equal guard panels on either side.
    const ladderRight = bedX + 0.2;
    const ladderLeft = ladderRight - 0.4;
    for (const [left, right] of [[bedLeft, ladderLeft], [ladderRight, bedRight]]) {
      this.box(upper, right - left, 0.28, 0.025, (left + right) / 2, 1.64, bedFront - radius, fabric);
    }
    this.box(upper, bedWidth, 0.28, 0.025, bedX, 1.64, bedBack + radius, fabric);
    for (const x of [bedLeft + radius, bedRight - radius]) {
      this.box(upper, 0.025, 0.28, bedDepth - 0.045, x, 1.64, bedZ, fabric);
    }
    // Match the published outermost ladder footprint, including tube radius.
    // Sloping central ladder; guard posts above belong to the upper frame.
    // The exact bend/step positions are illustrative, not dimensioned by IKEA.
    const topZ = bedFront - radius;
    const footZ = bedBack + dimensions.depthWithLadder - radius;
    const footY = radius;
    const ladderTop = dimensions.underBedHeight;
    const ladder = new THREE.Group();
    ladder.name = 'tuffing-central-ladder';
    this.furniture.add(ladder);
    for (const x of [ladderLeft, ladderRight]) {
      tube(ladder, new THREE.Vector3(x, footY, footZ), new THREE.Vector3(x, ladderTop, topZ));
      tube(upper, new THREE.Vector3(x, ladderTop, topZ), new THREE.Vector3(x, 1.79, topZ));
    }
    for (const y of [0.25, 0.55, 0.85, 1.15]) {
      const z = footZ + (topZ - footZ) * (y - footY) / (ladderTop - footY);
      tube(ladder, new THREE.Vector3(ladderLeft, y, z), new THREE.Vector3(ladderRight, y, z));
    }
    // Desk faces out into the room; its 73 cm width fits beside the central ladder.
    this.addMickeDesk(bedRight - 0.43, bedBack + 0.32, Math.PI);
  }

  setView(view: 'perspective' | 'top'): void {
    this.currentView = view;
    const { width, depth, height } = this.dimensions;
    // Fit the room and dimension guides in both the horizontal and vertical FOV.
    const halfFov = THREE.MathUtils.degToRad(this.camera.fov / 2);
    const limitingFov = Math.min(halfFov, Math.atan(Math.tan(halfFov) * this.camera.aspect));
    const radius = Math.hypot(width + 1.4, depth + 1.4, view === 'top' ? 0 : height) / 2;
    const distance = radius / Math.sin(limitingFov);
    this.controls.maxDistance = Math.max(35, distance * 2);
    this.controls.target.set(0, view === 'top' ? 0 : height * 0.35, 0);
    const direction = view === 'top' ? new THREE.Vector3(0, 1, 0.0001) : new THREE.Vector3(this.dimensions.notch ? 0.65 : this.hasFixtures ? -0.35 : 1.25, this.hasFixtures ? 2.3 : 1.1, 1.45);
    this.camera.position.copy(direction.normalize().multiplyScalar(distance).add(this.controls.target));
    this.controls.enableRotate = view !== 'top';
    this.controls.update();
    this.render();
  }

  setGridVisible(visible: boolean): void { this.grid.visible = visible; this.render(); }
  setWallsVisible(visible: boolean): void { this.walls.visible = visible; this.render(); }

  private resize(): void {
    const { clientWidth: width, clientHeight: height } = this.host;
    if (!width || !height || this.disposed) return;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.setView(this.currentView);
  }

  /** Clip floor pieces against the back-right recess, including tiles crossing its edges. */
  private floorBox(width: number, height: number, depth: number,
    x: number, y: number, z: number, color: number, roughness = 0.85): void {
    const notch = this.dimensions.notch;
    const left = x - width / 2;
    const right = x + width / 2;
    const back = z - depth / 2;
    const front = z + depth / 2;
    const cutX = this.dimensions.width / 2 - (notch?.width || 0);
    const cutZ = -this.dimensions.depth / 2 + (notch?.depth || 0);
    if (!notch || right <= cutX || back >= cutZ) {
      this.box(this.room, width, height, depth, x, y, z, color, roughness);
      return;
    }
    if (left < cutX) {
      this.box(this.room, cutX - left, height, depth, (left + cutX) / 2, y, z, color, roughness);
    }
    if (front > cutZ) {
      const clippedLeft = Math.max(left, cutX);
      this.box(this.room, right - clippedLeft, height, front - cutZ,
        (clippedLeft + right) / 2, y, (cutZ + front) / 2, color, roughness);
    }
  }

  private box(group: THREE.Group, width: number, height: number, depth: number,
    x: number, y: number, z: number, color: number, roughness = 0.85): void {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(color).convertSRGBToLinear(), roughness }));
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  private label(text: string, x: number, y: number, z: number): void {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 96;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#53614f';
    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 128, 48);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), depthTest: false }));
    sprite.position.set(x, y, z);
    sprite.scale.set(0.8, 0.3, 1);
    this.room.add(sprite);
  }

  private clear(group: THREE.Group): void {
    group.traverse(object => {
      if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Sprite) {
        if ('geometry' in object) object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach(material => {
          if (material instanceof THREE.SpriteMaterial) material.map?.dispose();
          material.dispose();
        });
      }
    });
    group.clear();
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.resizeObserver.disconnect();
    this.controls.removeEventListener('change', this.render);
    this.controls.dispose();
    [this.room, this.walls, this.grid, this.furniture].forEach(group => this.clear(group));
    this.scene.traverse(object => {
      if (object instanceof THREE.DirectionalLight) object.shadow.dispose();
    });
    this.renderer.domElement.removeEventListener('webglcontextlost', this.contextLost);
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
