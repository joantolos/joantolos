import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
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
