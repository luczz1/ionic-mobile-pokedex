import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async showLoading(show: boolean) {
    const loading = await this.loadingCtrl.create();

    if (show) {
      loading.present();
      return;
    }

    setTimeout(() => {
      this.loadingCtrl.dismiss()
    }, 100)

  }

  async presentToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: `${message}`,
      duration: 3000,
      position: 'middle',
    });

    if (toast)toast.present();
  }
}
