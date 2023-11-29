export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PartialWithRequiredBy<T, K extends keyof T> = Pick<T, K> &
  Partial<Omit<T, K>>;

export interface IEntity {
  id: string;
}

export enum FirebaseOperators {
  equalTo = "equalTo",
  startAt = "startAt",
  endAt = "endAt",
  limitToFirst = "limitToFirst",
  limitToLast = "limitToLast",
  orderByChild = "orderByChild",
  orderByKey = "orderByKey",
  orderByValue = "orderByValue",
}
