import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimestampFormatterService {
  private readonly timestampFormatRegexList: RegExp[] = [
    /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3}$/, // 'yyyy-MM-dd HH:mm:ss.SSS'
  ];
  private readonly defaultTimestampProps = ['createdAt', 'updatedAt'];

  isAcceptableTimestamp(timestampStr: string): boolean {
    return (
      !!timestampStr &&
      this.timestampFormatRegexList.some((regex) => regex.test(timestampStr))
    );
  }

  formatTimestampProps(
    obj: any,
    timestampProps = this.defaultTimestampProps
  ): any {
    if (!obj) {
      return obj;
    }

    const newObj = { ...obj };

    timestampProps.forEach((prop) => {
      if (this.isAcceptableTimestamp(newObj[prop])) {
        newObj[prop] = this.formatTimestampStr(newObj[prop]);
      }
    });

    return newObj;
  }

  formatTimestampStr(timestampStr: string): string {
    if (!timestampStr) {
      return timestampStr;
    }

    const date = new Date(timestampStr);
    if (isNaN(date.getTime())) {
      return timestampStr;
    }

    const padTwoDigit = (value: number) => value.toString().padStart(2, '0');

    const year = date.getFullYear();
    const month = padTwoDigit(date.getMonth() + 1);
    const day = padTwoDigit(date.getDate());
    const hour = padTwoDigit(date.getHours());
    const minute = padTwoDigit(date.getMinutes());
    const second = padTwoDigit(date.getSeconds());

    return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
  }
}
