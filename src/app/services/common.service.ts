import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

export enum ALERT_TYPE {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

interface ToastConfig {
  type: SweetAlertIcon;
  message: string;
  timerProgressBar?: boolean;
  timer?: number;
  position?: any;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

    showSuccess(message: string): void {
    this.showToast({ type: ALERT_TYPE.SUCCESS, message });
  }

  showError(message: string): void {
    this.showToast({ type: ALERT_TYPE.ERROR, message, timer: 8000 });
  }

  showWarning(message: string): void {
    this.showToast({ type: ALERT_TYPE.WARNING, message });
  }

  showInfo(message: string): void {
    this.showToast({ type: ALERT_TYPE.INFO, message });
  }

    showToast(config: ToastConfig): void {
    const defaultConfig = {
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timerProgressBar: config.timerProgressBar || false,
      timer: config.timer || 5000,
      icon: config.type,
      title: config.message,
      showClass: {
        popup: 'animate__animated animate__fadeInUp'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown'
      },
      customClass: {
        popup: 'custom-popup',
      },
      didOpen: () => {
        const popup = Swal.getPopup();
        if (popup) {
          popup.style.fontSize = '14px';
          popup.style.padding = '10px';
          popup.style.width = '400px';
          popup.style.height = 'auto';
          popup.style.borderRadius = '10px';
        }
      }
    };

    Swal.fire({ ...defaultConfig, ...config });
  }

}
