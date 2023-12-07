// export const resources = [
//     {
//         id: '1',
//         name: 'Кабинет 1',
//
//     },
//     {
//         id: '2',
//         name: 'Кабинет 2',
//     },
//     {
//         id: '3',
//         name: 'Кабинет 3',
//     },
// ];

export const events = [
  {
    id: '1',
    title: 'sdf',
    start: '2023-10-24T08:00:00',
    end: '2023-10-24T09:00:00',
    resourceId: '1',
    clientId: 'string',
    clientType: 'string',
    comments: 'string',
    filialId: 'string',
    paymentType: 'string',
    productId: 'string',
    source: 'string',
    subproductId: 'string'
  }
];

let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export function createEventId() {
  return String(eventGuid++);
}
