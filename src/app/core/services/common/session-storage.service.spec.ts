import { TestBed } from '@angular/core/testing';
import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setItem', () => {
    it('should save an item to sessionStorage', () => {
      const key = 'testKey';
      const value = { data: 'testValue' };
      spyOn(sessionStorage, 'setItem');

      service.setItem(key, value);

      const serializedValue = JSON.stringify(value);
      expect(sessionStorage.setItem).toHaveBeenCalledWith(key, serializedValue);
    });

    it('should not save an item when key or value is null or undefined', () => {
      service.setItem(null as any, null);
      service.setItem('testKey1', null);
      service.setItem(undefined as any, undefined);
      service.setItem('testKey2', undefined);

      expect(sessionStorage.length).toBe(0);
      sessionStorage.clear();
    });

    it('should log an error when saving item to sessionStorage fails', () => {
      const key = 'testKey';
      const value = { data: 'testValue' };
      spyOn(sessionStorage, 'setItem').and.throwError('setItem failed!');
      spyOn(console, 'error');

      service.setItem(key, value);

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('getItem', () => {
    it('should retrieve an item from sessionStorage', () => {
      const key = 'testKey';
      const value = { data: 'testValue' };
      const serializedValue = JSON.stringify(value);
      spyOn(sessionStorage, 'getItem').and.returnValue(serializedValue);

      const retrievedValue = service.getItem(key);

      expect(retrievedValue).toEqual(value);
    });

    it('should return null if sessionStorage does not contain the key', () => {
      expect(service.getItem('nonExistentKey')).toBeNull();
    });

    it('should return null when key is null or undefined', () => {
      expect(service.getItem(null as any)).toBeNull();
      expect(service.getItem(undefined as any)).toBeNull();
    });

    it('should return null and log an error when receiving invalid JSON from sessionStorage', () => {
      const key = 'testKey';
      spyOn(sessionStorage, 'getItem').and.returnValue('Invalid JSON');
      spyOn(console, 'error');

      const retrievedValue = service.getItem(key);

      expect(retrievedValue).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });

    it('should return null and log an error when retrieving an item from sessionStorage fails', () => {
      const key = 'testKey';
      spyOn(sessionStorage, 'getItem').and.throwError('getItem failed!');
      spyOn(console, 'error');

      const retrievedValue = service.getItem(key);

      expect(retrievedValue).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('removeItem', () => {
    it('should remove an item from sessionStorage', () => {
      const key = 'testKey';
      spyOn(sessionStorage, 'removeItem');

      service.removeItem(key);

      expect(sessionStorage.removeItem).toHaveBeenCalledWith(key);
    });

    it('should handle removal of non-existent key without throwing errors', () => {
      expect(() => service.removeItem('nonExistentKey')).not.toThrow();
    });

    it('should handle removal with null or undefined keys without throwing errors', () => {
      expect(() => service.removeItem(null as any)).not.toThrow();
      expect(() => service.removeItem(undefined as any)).not.toThrow();
    });

    it('should log an error when removing an item from sessionStorage fails', () => {
      const key = 'testKey';
      spyOn(sessionStorage, 'removeItem').and.throwError('removeItem failed!');
      spyOn(console, 'error');

      service.removeItem(key);

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('clear', () => {
    it('should clear all items from sessionStorage', () => {
      spyOn(sessionStorage, 'clear');

      service.clear();

      expect(sessionStorage.clear).toHaveBeenCalled();
    });

    it('should log an error when clearing all items from sessionStorage fails', () => {
      spyOn(sessionStorage, 'clear').and.throwError('clear failed!');
      spyOn(console, 'error');

      service.clear();

      expect(console.error).toHaveBeenCalled();
    });
  });
});
