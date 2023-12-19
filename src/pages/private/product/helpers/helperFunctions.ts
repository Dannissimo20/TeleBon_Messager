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

export const renameNameToLabelFork = (resource: any[]) => {
  return resource
    ?.filter((item) => item?.name)
    .map((item) => ({
      label: item?.name,
      value: item?.id
    }));
};
