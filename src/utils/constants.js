export const Pages = {
  taskSelecting: 'taskSelecting',
  taskAdding: 'taskAdding',
  taskFinished: 'taskFinishedPlug',
  defaultWorkspace: 'defaultWorkspace',
  openShift: 'openShift',
}

export const ContainerStates = {
  empty: 0,
  onPlace: 1,
}

export const BoxStates = {
  debugNone: -1,
  empty: 0,
  selectedToLink: 1,
  linked: 2,
  withOrder: 3,
}

export const headerHeight = 80;

export const ErrorCodes = {
  userNotFound: 0,
  goodsNotFound: 4,
}

export const IMAGES_MAX_RES = 1920;

export const HTTP = {
  OK: 200,
  CREATED: 201,
  ANAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  GONE: 410,
  IM_A_TEAPOT: 418,
  LOCKED: 423,
}
