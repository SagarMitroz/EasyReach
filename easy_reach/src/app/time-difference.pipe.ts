import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDifference'  // Ensure lowercase naming here
})
export class TimeDifferencePipe implements PipeTransform {
  transform(value: string | Date): string {
    const now = new Date();
    const date = new Date(value);
    const diffMs = now.getTime() - date.getTime(); // Milliseconds difference

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }
}
