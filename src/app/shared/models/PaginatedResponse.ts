
// 3. الواجهة العامة للـ Pagination/Response
export interface IPaginatedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  data: T[];
}