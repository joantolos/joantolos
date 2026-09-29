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
    this.scene.add(this.room, this.walls, this.grid);
    this.grid.visible = false;

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(host);
    this.resize();
  }

  setDimensions(dimensions: RoomDimensions, fixtures?: RoomFixtures, floor: 'wood' | 'ceramic' = 'wood'): void {
    this.dimensions = { ...dimensions };
    this.hasFixtures = !!fixtures;
    [this.room, this.walls, this.grid].forEach(group => this.clear(group));
    const { width, depth, height, notch } = dimensions;
    this.floorBox(width, 0.14, depth, 0, -0.1, 0, 0xc4b49b);

    if (floor === 'ceramic') {
      // Neutral 40 cm ceramic tiles with 3 mm grout; tile finish/size are illustrative.
      const tileSize = 0.4;
      const grout = 0.003;
      this.floorBox(width, 0.025, depth, 0, -0.02, 0, 0xaaa79f);
      const shades = [0xd7d5ce, 0xdbd9d2, 0xd4d2cb];
      for (let column = 0; column < Math.ceil(width / tileSize); column++) {
        for (let row = 0; row < Math.ceil(depth / tileSize); row++) {
          const tileWidth = Math.min(tileSize, width - column * tileSize);
          const tileDepth = Math.min(tileSize, depth - row * tileSize);
          this.floorBox(tileWidth - grout, 0.02, tileDepth - grout,
            -width / 2 + column * tileSize + tileWidth / 2, -0.005,
            -depth / 2 + row * tileSize + tileDepth / 2, shades[(column + row * 2) % shades.length], 0.3);
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
    [this.room, this.walls, this.grid].forEach(group => this.clear(group));
    this.scene.traverse(object => {
      if (object instanceof THREE.DirectionalLight) object.shadow.dispose();
    });
    this.renderer.domElement.removeEventListener('webglcontextlost', this.contextLost);
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
