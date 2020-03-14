
export type PrintOptionType = 'QueueTicket' | 'Coupon' | 'Label';

export interface PrintOptionModel {
  displayName: string;
  value: PrintOptionType;
}

export const PrintOptionConst: PrintOptionModel[] = [
  {
    displayName: 'Queue Ticket',
    value: 'QueueTicket'
  },
  {
    displayName: 'Coupon',
    value: 'Coupon'
  },
  {
    displayName: 'Label',
    value: 'Label'
  }
];
