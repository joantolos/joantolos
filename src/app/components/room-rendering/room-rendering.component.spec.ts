import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RoomRenderingComponent } from './room-rendering.component';

describe('RoomRenderingComponent', () => {
  let component: RoomRenderingComponent;
  let auth: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    auth = jasmine.createSpyObj('AuthService', ['logout']);
    auth.logout.and.returnValue(of(false));
    router = jasmine.createSpyObj('Router', ['navigate']);
    component = new RoomRenderingComponent(new NgZone({}), auth, router);
  });

  it('switches between Olivia’s measured room and Adria’s recessed room', () => {
    expect(component.selectedRoom.name).toBe('Olivia');
    expect(component.dimensions).toEqual({ width: 2.65, depth: 2.06, height: 2.55 });
    expect(component.area).toBeCloseTo(5.459);
    expect(component.fixtures?.window.width).toBe(0.85);
    component.selectRoom(component.rooms[1]);
    expect(component.dimensions.width).toBe(3.35);
    expect(component.dimensions.depth).toBe(3.12);
    expect(component.area).toBeCloseTo(10.2342, 4);
    expect(component.fixtures?.window.wall).toBe('left');
    expect(component.fixtures?.outlet).toBeUndefined();
    expect(component.fixtures?.door.offset).toBe(0.14);
    component.selectRoom(component.rooms[0]);
    expect(component.fixtures?.door.width).toBe(0.76);
  });

  it('ends the shared session and preserves the room return URL on logout', () => {
    component.logout();
    expect(auth.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/finance/login'], {
      queryParams: { returnUrl: '/room-rendering' }
    });
  });
});
