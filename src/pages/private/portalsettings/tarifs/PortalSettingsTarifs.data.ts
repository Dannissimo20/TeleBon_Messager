export interface ITarifModule {
  id: string;
  name: string;
  price: string;
  active: boolean;
}

export interface ITarif {
  id: string;
  name: string;
  userslimit: string;
  baseprice: string;
  default: boolean;
  activateDate?: string;
  modules?: ITarifModule[];
}

export const tarifs: ITarif[] = [
  {
    id: '1',
    name: 'Пробный',
    userslimit: '5',
    baseprice: '0',
    default: true,
    activateDate: '2023-12-01',
    modules: [
      {
        id: '1',
        name: 'Классификаторы',
        price: '0',
        active: false
      },
      {
        id: '2',
        name: 'Задачник',
        price: '0',
        active: false
      }
    ]
  },
  {
    id: '2',
    name: 'Бесплатный',
    userslimit: '1',
    baseprice: '0',
    default: false
  },
  {
    id: '3',
    name: 'Базовый',
    userslimit: '5',
    baseprice: '400',
    default: false,
    activateDate: '2023-12-01',
    modules: [
      {
        id: '1',
        name: 'Классификаторы',
        price: '200',
        active: false
      },
      {
        id: '2',
        name: 'Задачник',
        price: '100',
        active: false
      }
    ]
  }
];
