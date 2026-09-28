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

  it('updates the room and floor area using valid metre dimensions', () => {
    component.draft = { width: 5, depth: 3.5, height: 2.4 };
    component.applyDimensions();
    expect(component.dimensions).toEqual({ width: 5, depth: 3.5, height: 2.4 });
    expect(component.area).toBe(17.5);
    component.draft.width = 7;
    expect(component.dimensions.width).toBe(5);
  });

  it('keeps the rendered room intact for empty, non-finite or out-of-range input', () => {
    for (const width of [null, NaN, Infinity, -1, 0, 11]) {
      component.draft = { width: width as number, depth: 4, height: 2.7 };
      component.applyDimensions();
      expect(component.dimensions.width).toBe(4);
      expect(component.dimensionError).not.toBe('');
    }
    component.draft = { width: 4, depth: 4, height: 5 };
    component.applyDimensions();
    expect(component.dimensions.height).toBe(2.7);
  });

  it('ends the shared session and preserves the room return URL on logout', () => {
    component.logout();
    expect(auth.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/finance/login'], {
      queryParams: { returnUrl: '/room-rendering' }
    });
  });
});
