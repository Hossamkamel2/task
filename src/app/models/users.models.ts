export class Users {
  id!: number;
  firstName!: string;
  lastName!: string;
  emailAddress!: string;
  phoneNumber!: string;
}
export interface PaginatedResponse<T> {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  data: T[]; // Array of generic type T
}
