import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface RoomDimensions { width: number; depth: number; height: number; }

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

  setDimensions(dimensions: RoomDimensions): void {
    this.dimensions = { ...dimensions };
    [this.room, this.walls, this.grid].forEach(group => this.clear(group));
    const { width, depth, height } = dimensions;
    this.box(this.room, width + 0.16, 0.14, depth + 0.16, 0, -0.1, 0, 0xc4b49b);

    // Individual boards give the floor a sense of scale without external textures.
    const boardCount = Math.ceil(width / 0.19);
    const boardWidth = width / boardCount;
    const shades = [0xc9ac82, 0xd6bc95, 0xd2b58c, 0xcdb087, 0xd9be97];
    for (let i = 0; i < boardCount; i++) {
      const sections = 3;
      for (let j = 0; j < sections; j++) {
        this.box(this.room, boardWidth - 0.005, 0.035, depth / sections - 0.005,
          -width / 2 + boardWidth * (i + 0.5), -0.013,
          -depth / 2 + depth / sections * (j + 0.5), shades[(i * 3 + j) % shades.length]);
      }
    }

    // Back and left walls sit outside the measured interior footprint.
    this.box(this.walls, width + 0.16, height, 0.12, 0, height / 2, -depth / 2 - 0.06, 0xf3f1e9);
    this.box(this.walls, 0.12, height, depth + 0.12, -width / 2 - 0.06, height / 2, 0, 0xe0e5d9);
    this.box(this.walls, width, 0.1, 0.025, 0, 0.05, -depth / 2 + 0.013, 0xfaf9f4);
    this.box(this.walls, 0.025, 0.1, depth, -width / 2 + 0.013, 0.05, 0, 0xfaf9f4);

    const gridPoints: THREE.Vector3[] = [];
    for (let x = -width / 2; x <= width / 2 + 0.001; x += 0.5) {
      gridPoints.push(new THREE.Vector3(x, 0.012, -depth / 2), new THREE.Vector3(x, 0.012, depth / 2));
    }
    for (let z = -depth / 2; z <= depth / 2 + 0.001; z += 0.5) {
      gridPoints.push(new THREE.Vector3(-width / 2, 0.012, z), new THREE.Vector3(width / 2, 0.012, z));
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
    this.label(`${width.toFixed(1)} m`, 0, 0.08, depth / 2 + 0.65);
    this.label(`${depth.toFixed(1)} m`, width / 2 + 0.7, 0.08, 0);
    this.render();
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
    const direction = view === 'top' ? new THREE.Vector3(0, 1, 0.0001) : new THREE.Vector3(1.25, 1.1, 1.45);
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

  private box(group: THREE.Group, width: number, height: number, depth: number,
    x: number, y: number, z: number, color: number): void {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(color).convertSRGBToLinear(), roughness: 0.85 }));
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
