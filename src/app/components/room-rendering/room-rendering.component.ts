import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoomScene, RoomDimensions } from './room-scene';

@Component({
  selector: 'app-room-rendering',
  templateUrl: './room-rendering.component.html',
  styleUrls: ['./room-rendering.component.css']
})
export class RoomRenderingComponent implements AfterViewInit, OnDestroy {
  @ViewChild('viewport', { static: true }) viewport!: ElementRef<HTMLDivElement>;
  // Placeholder measurements; replace each room's values when available.
  readonly rooms = [
    { name: 'Olivia', dimensions: { width: 4, depth: 4, height: 2.7 } },
    { name: 'Adria', dimensions: { width: 4, depth: 4, height: 2.7 } }
  ] as const;
  selectedRoom = this.rooms[0] as typeof this.rooms[number];

  get dimensions(): RoomDimensions { return this.selectedRoom.dimensions; }
  view: 'perspective' | 'top' = 'perspective';
  showGrid = false;
  showWalls = true;
  renderError = false;
  private scene?: RoomScene;

  constructor(private zone: NgZone, private auth: AuthService, private router: Router) {}

  get area(): number { return this.dimensions.width * this.dimensions.depth; }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      try {
        this.scene = new RoomScene(this.viewport.nativeElement, () => {
          this.zone.run(() => this.renderError = true);
        });
        this.scene.setDimensions(this.dimensions);
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
      this.scene?.setDimensions(this.dimensions);
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
