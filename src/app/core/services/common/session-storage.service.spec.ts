import { TestBed } from '@angular/core/testing';
import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageService],
    });

    service = TestBed.inject(SessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('saveItem', () => {
    it('should save an item to sessionStorage', () => {
      const key = 'testKey';
      const value = { data: 'testValue' };

      service.saveItem(key, value);

      const storedValue = JSON.parse(sessionStorage.getItem(key)!);
      expect(storedValue).toEqual(value);
    });

    it('should log an error if there is an issue saving to sessionStorage', () => {
      spyOn(console, 'error');
      spyOn(sessionStorage, 'setItem').and.throwError(
        'Error saving to sessionStorage'
      );
      const key = 'testKey';
      const value = { data: 'testValue' };

      service.saveItem(key, value);

      expect(console.error).toHaveBeenCalledWith(jasmine.any(String));
    });
  });

  describe('getItem', () => {
    it('should retrieve an item from sessionStorage', () => {
      const key = 'testKey';
      const value = { data: 'testValue' };

      sessionStorage.setItem(key, JSON.stringify(value));

      const retrievedValue = service.getItem(key);
      expect(retrievedValue).toEqual(value);
    });

    it('should return null if sessionStorage does not contain the key', () => {
      const key = 'nonExistentKey';

      const retrievedValue = service.getItem(key);

      expect(retrievedValue).toBeNull();
    });

    it('should log an error if there is an issue getting from sessionStorage', () => {
      spyOn(console, 'error');
      spyOn(sessionStorage, 'getItem').and.throwError(
        'Error getting from sessionStorage'
      );
      const key = 'testKey';

      const retrievedValue = service.getItem(key);

      expect(console.error).toHaveBeenCalledWith(jasmine.any(String));
      expect(retrievedValue).toBeNull();
    });
  });

  describe('removeItem', () => {
    it('should remove an item from sessionStorage', () => {
      const key = 'testKey';
      const value = { data: 'testValue' };
      sessionStorage.setItem(key, JSON.stringify(value));

      service.removeItem(key);

      const retrievedValue = sessionStorage.getItem(key);
      expect(retrievedValue).toBeNull();
    });

    it('should log an error if there is an issue removing from sessionStorage', () => {
      spyOn(console, 'error');
      spyOn(sessionStorage, 'removeItem').and.throwError(
        'Error removing from sessionStorage'
      );
      const key = 'testKey';

      service.removeItem(key);

      expect(console.error).toHaveBeenCalledWith(jasmine.any(String));
    });
  });

  describe('clear', () => {
    it('should clear all items from sessionStorage', () => {
      sessionStorage.setItem('key1', 'value1');
      sessionStorage.setItem('key2', 'value2');

      service.clear();

      expect(sessionStorage.length).toBe(0);
    });

    it('should log an error if there is an issue clearing sessionStorage', () => {
      spyOn(console, 'error');
      spyOn(sessionStorage, 'clear').and.throwError(
        'Error clearing sessionStorage'
      );

      service.clear();

      expect(console.error).toHaveBeenCalledWith(jasmine.any(String));
    });
  });
});
