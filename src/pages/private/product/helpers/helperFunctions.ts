export const calculateBusyAndFreeHours = (selectedDate: string | number | Date, resourceId: any, events: any[]) => {
  const selectedDay = new Date(selectedDate);
  const dayStart: any = new Date(selectedDay);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd: any = new Date(selectedDay);
  dayEnd.setHours(23, 59, 59, 999);

  const busyHours = new Set();
  events.forEach((event) => {
    const eventStart: any = new Date(event.start);
    const eventEnd: any = new Date(event.end);

    if (eventStart <= dayEnd && eventEnd >= dayStart && event.resourceId === resourceId) {
      const overlapStart: any = new Date(Math.max(eventStart, dayStart));
      const overlapEnd: any = new Date(Math.min(eventEnd, dayEnd));

      const overlapDuration = Math.floor((overlapEnd - overlapStart) / 3600000);

      for (let i = 0; i < overlapDuration; i++) {
        const hourIndex = overlapStart.getHours();
        busyHours.add(hourIndex);
        overlapStart.setHours(hourIndex + 1);
      }
    }
  });

  const freeHours = 24 - busyHours.size;

  return { busyHours: busyHours.size, freeHours };
};

export const renameNameToTitle = (resources: any[]) => {
  return resources.map((resource) => ({
    ...resource,
    title: resource?.name
  }));
};
export const renameFioToTitle = (resource: any[]) => {
  return resource?.map((resource) => ({
    ...resource,
    title: resource?.fio
  }));
};

export const renameEmployedIdToResourceId = (resource: any[]) => {
  return resource?.map((resource) => ({
    ...resource,
    cabinetId: resource?.resourceId,
    resourceId: resource?.employedid
  }));
};

export const renameFioToLable = (resource: any[]) => {
  return resource?.map((resource) => ({
    ...resource,
    label: resource?.fio,
    value: resource?.id
  }));
};

export const renameNameToLabel = (resource: any[]) => {
  return resource
    ?.filter((item) => item?.name)
    .map((item) => ({
      label: item?.name,
      value: Math.floor(Math.random() * 90000) + 10000
    }));
};

export const renameNameToLabelFork = (resource: any[]) => {
  return resource
    ?.filter((item) => item?.name)
    .map((item) => ({
      label: item?.name,
      value: item?.id
    }));
};
