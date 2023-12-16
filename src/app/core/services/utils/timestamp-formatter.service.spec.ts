import { TestBed } from '@angular/core/testing';
import { TimestampFormatterService } from './timestamp-formatter.service';

describe('TimestampFormatterService', () => {
  let service: TimestampFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimestampFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('formatTimestampStr', () => {
    it('should format a valid timestamp string', () => {
      const timestampStr = '2023-03-15 12:34:56.789';
      const expectedFormattedStr = '2023/03/15 12:34:56';

      const result = service.formatTimestampStr(timestampStr);

      expect(result).toEqual(expectedFormattedStr);
    });

    it('should not format an invalid timestamp string', () => {
      const invalidTimestampStr = 'invalid-timestamp';

      const result = service.formatTimestampStr(invalidTimestampStr);

      expect(result).toBe(invalidTimestampStr);
    });

    it('should handle an empty timestamp string gracefully', () => {
      expect(service.formatTimestampStr('')).toBe('');
    });

    it('should handle null or undefined timestamp strings gracefully', () => {
      expect(service.formatTimestampStr(null as any)).toBeNull();
      expect(service.formatTimestampStr(undefined as any)).toBeUndefined();
    });
  });

  describe('formatTimestampProps', () => {
    it('should format valid timestamps in the specified properties', () => {
      const inputObject = {
        createdAt: '2023-03-15 12:34:56.789',
        updatedAt: '2023-03-16 01:23:45.678',
        otherProp: 'other-value',
      };
      const expectedOutput = {
        createdAt: '2023/03/15 12:34:56',
        updatedAt: '2023/03/16 01:23:45',
        otherProp: 'other-value',
      };

      expect(service.formatTimestampProps(inputObject)).toEqual(expectedOutput);
    });

    it('should not format invalid timestamps in object properties', () => {
      const inputObject = {
        createdAt: 'invalid-timestamp',
        updatedAt: '2023-03-15 10:45:30.987',
        otherProp: 'other-value',
      };
      const expectedOutput = {
        createdAt: 'invalid-timestamp',
        updatedAt: '2023/03/15 10:45:30',
        otherProp: 'other-value',
      };

      expect(service.formatTimestampProps(inputObject)).toEqual(expectedOutput);
    });

    it('should handle null or undefined timestamp properties gracefully', () => {
      const inputObject = {
        createdAt: null,
        updatedAt: undefined,
        otherProp: 'other-value',
      };

      expect(service.formatTimestampProps(inputObject)).toEqual(inputObject);
    });

    it('should handle an empty object gracefully', () => {
      expect(service.formatTimestampProps({})).toEqual({});
    });

    it('should handle null or undefined objects gracefully', () => {
      expect(service.formatTimestampProps(null)).toBeNull();
      expect(service.formatTimestampProps(undefined)).toBeUndefined();
    });

    it('should format timestamps in specified properties with custom property list', () => {
      const inputObject = {
        createdAt: '2023-03-15 12:34:56.789',
        deletedAt: '2023-03-16 01:23:45.678',
        otherProp: 'other-value',
      };
      const expectedOutput = {
        createdAt: '2023-03-15 12:34:56.789',
        deletedAt: '2023/03/16 01:23:45',
        otherProp: 'other-value',
      };

      expect(service.formatTimestampProps(inputObject, ['deletedAt'])).toEqual(
        expectedOutput
      );
    });
  });
});
