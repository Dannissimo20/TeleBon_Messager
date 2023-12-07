const trimSchedule = (cabinets?: any[]) => {
  if (!cabinets || !cabinets.length) {
    return [];
  }

  let veryFirst = 24;
  let veryLast = 0;

  cabinets.forEach(({ schedule }) => {
    const firstIndex = schedule.findIndex(
      ({ available }: any) => available === true
    );
    const lastIndex = schedule.findLastIndex(
      ({ available }: any) => available === true
    );

    if (firstIndex !== -1 && firstIndex < veryFirst) {
      veryFirst = firstIndex;
    }
    if (lastIndex !== -1 && lastIndex > veryLast) {
      veryLast = lastIndex;
    }
  });

  return cabinets.map((cabinet) => {
    return {
      ...cabinet,
      schedule: cabinet.schedule.slice(veryFirst, veryLast),
    };
  });
};

export default trimSchedule;
