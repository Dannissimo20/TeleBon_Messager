export interface ISlot {
  active: boolean;
  subproductId?: null | string;
  productId?: null | string;
  highlighted?: boolean;
  places?: string;
  userId?: string;
}
const hourSlot = (active: boolean): ISlot => ({
  active,
  subproductId: null,
});
const day = [
  hourSlot(false),
  hourSlot(false),
  hourSlot(false),
  hourSlot(false),
  hourSlot(false),
  hourSlot(false),
  hourSlot(false),
  hourSlot(false),
  hourSlot(false),
  hourSlot(true),
  hourSlot(true),
  hourSlot(true),
  hourSlot(true),
  hourSlot(true),
  hourSlot(true),
  hourSlot(true),
  hourSlot(true),
  hourSlot(false),
  hourSlot(false),
  hourSlot(false),
  hourSlot(false),
  hourSlot(false),
  hourSlot(false),
  hourSlot(false),
];
const initialSchedule: ISlot[][] = [
  [...day],
  [...day],
  [...day],
  [...day],
  [...day],
  [...day],
  [...day],
];

export default initialSchedule;
