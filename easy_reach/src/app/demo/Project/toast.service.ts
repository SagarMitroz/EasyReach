import { Injectable } from '@angular/core';

interface ToastMessage {
  message: string;
  classname: string;
  delay: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: ToastMessage[] = [];

  show(message: string, classname = 'bg-primary text-light', delay = 3000) {
    this.toasts.push({ message, classname, delay });

    // Auto-remove after delay
    setTimeout(() => this.removeToast(message), delay);
  }

  showSuccess(message: string) {
    this.show(message, 'bg-success text-light');
  }

  showError(message: string) {
    this.show(message, 'bg-danger text-light');
  }

  showInfo(message: string) {
    this.show(message, 'bg-info text-light');
  }

  removeToast(message: string) {
    this.toasts = this.toasts.filter(toast => toast.message !== message);
  }
}