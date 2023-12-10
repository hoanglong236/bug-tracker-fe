import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  saveItem(key: string, value: any) {
    try {
      const serializedValue = JSON.stringify(value);
      sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving item to session storage: ${error}`);
    }
  }

  getItem<T>(key: string): T | null {
    try {
      const serializedValue = sessionStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error(`Error getting item from session storage: ${error}`);
      return null;
    }
  }

  removeItem(key: string) {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from session storage: ${error}`);
    }
  }

  clear() {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error(`Error clearing session storage: ${error}`);
    }
  }
}
