import { makeAutoObservable } from 'mobx';

import { RootStore } from '.';
import { ITarif, ITarifModule, tarifs } from '../pages/private/portalsettings/tarifs/PortalSettingsTarifs.data';

class TarifStore {
  rootStore: RootStore;
  tarifs: ITarif[];
  activeTarif: ITarif;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.tarifs = tarifs;
    this.activeTarif = tarifs.find((tarif) => tarif.default === true) || tarifs[0];
    makeAutoObservable(this);
  }
  updateActiveTarif = (tarif: ITarif) => {
    if (this.activeTarif.id === '1') {
      this.tarifs = this.tarifs.slice(1);
    }
    const index = this.tarifs.findIndex((item) => item.id === tarif.id);
    this.removeActiveTarif();
    this.activeTarif = tarif;
    this.tarifs = [
      ...this.tarifs.slice(0, index),
      {
        ...this.tarifs[index],
        default: true
      },
      ...this.tarifs.slice(index + 1)
    ];
  };
  removeActiveTarif = () => {
    this.tarifs = this.tarifs.map((tarif) => ({ ...tarif, default: false }));
  };
  updateModuleTarif = (updatedModules: ITarifModule[]) => {
    this.activeTarif = {
      ...this.activeTarif,
      modules: updatedModules
    };
  };
}

export default TarifStore;