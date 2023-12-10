import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { SimpleHttpService } from './simple-http.service';

describe('SimpleHttpService', () => {
  let service: SimpleHttpService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);

    TestBed.configureTestingModule({
      providers: [SimpleHttpService, { provide: HttpClient, useValue: spy }],
    });

    service = TestBed.inject(SimpleHttpService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should call HttpClient.get with the correct arguments', () => {
      const url = 'test-url';
      httpClientSpy.get.and.returnValue(of({}));

      service.get(url).subscribe(() => {
        expect(httpClientSpy.get).toHaveBeenCalledWith(
          url,
          service['httpOptions']
        );
      });
    });
  });

  describe('post', () => {
    it('should call HttpClient.post with the correct arguments', () => {
      const url = 'test-url';
      const data = { fakeKey: 'fakeValue' };
      httpClientSpy.post.and.returnValue(of({}));

      service.post(url, data).subscribe(() => {
        expect(httpClientSpy.post).toHaveBeenCalledWith(
          url,
          data,
          service['httpOptions']
        );
      });
    });

    it('should call HttpClient.post with "body" argument is {}', () => {
      const url = 'test-url';
      httpClientSpy.post.and.returnValue(of({}));

      service.post(url).subscribe(() => {
        expect(httpClientSpy.post).toHaveBeenCalledWith(
          url,
          {},
          service['httpOptions']
        );
      });
    });
  });

  describe('put', () => {
    it('should call HttpClient.put with the correct arguments', () => {
      const url = 'test-url';
      const data = { fakeKey: 'fakeValue' };
      httpClientSpy.put.and.returnValue(of({}));

      service.put(url, data).subscribe(() => {
        expect(httpClientSpy.put).toHaveBeenCalledWith(
          url,
          data,
          service['httpOptions']
        );
      });
    });

    it('should call HttpClient.put with "body" argument is {}', () => {
      const url = 'test-url';
      httpClientSpy.put.and.returnValue(of({}));

      service.put(url).subscribe(() => {
        expect(httpClientSpy.put).toHaveBeenCalledWith(
          url,
          {},
          service['httpOptions']
        );
      });
    });
  });

  describe('delete', () => {
    it('should call HttpClient.delete with the correct arguments', () => {
      const url = 'test-url';
      httpClientSpy.delete.and.returnValue(of({}));

      service.delete(url).subscribe(() => {
        expect(httpClientSpy.delete).toHaveBeenCalledWith(
          url,
          service['httpOptions']
        );
      });
    });
  });
});
