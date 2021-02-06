import { Id, Renamed } from '../types';

export const renameObjectProperty = <
  T,
  K extends keyof T,
  N extends keyof R,
  R
>(
  object: T,
  propertyName: K,
  newPropertyName: N
): Renamed<T, K, N> => {
  const { [propertyName]: propertyValue, ...rest } = object;
  return {
    ...rest,
    [newPropertyName]: propertyValue,
  } as Renamed<T, K, N>;
};

export const underscoreIdToId = <T extends { _id: Id }, R extends { id: Id }>(
  object: T
) => renameObjectProperty<T, '_id', 'id', R>(object, '_id', 'id') as R;
