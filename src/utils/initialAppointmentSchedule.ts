const initialAppointmentSchedule = {
  cabinets: [
    {
      cabinetId: '2',
      cabinetName: 'Кабинет 1',
      schedule: [
        {
          hour: '1',
          available: true || false,
          maxSlots: '13',
          slots: [
            {
              id: '1',
              paymentType: 'cash' || 'card',
              filialId: '1',
              client: {}
            }
          ]
        },
        {
          hour: '2',
          available: true || false,
          totalSlots: '5',
          slots: [
            {
              id: 1,
              client: {}
            }
          ]
        }
      ]
    }
  ]
};

export default initialAppointmentSchedule;
