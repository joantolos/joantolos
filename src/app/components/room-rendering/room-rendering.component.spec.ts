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

  it('switches between Olivia and Adria with the fixed example measurements', () => {
    expect(component.selectedRoom.name).toBe('Olivia');
    for (const room of component.rooms) {
      component.selectRoom(room);
      expect(component.selectedRoom.name).toBe(room.name);
      expect(component.dimensions).toEqual({ width: 4, depth: 4, height: 2.7 });
      expect(component.area).toBe(16);
    }
    component.selectRoom(component.rooms[0]);
    expect(component.selectedRoom.name).toBe('Olivia');
  });

  it('ends the shared session and preserves the room return URL on logout', () => {
    component.logout();
    expect(auth.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/finance/login'], {
      queryParams: { returnUrl: '/room-rendering' }
    });
  });
});
