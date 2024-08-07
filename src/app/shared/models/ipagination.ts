export interface IPagination {
    page?: number;
    size: number;
    offset?: number;
    numberOfElements?: number;
    numberOfPages?: number;
    totalNumberOfElements?: number;
    isFirstPage?: boolean;
    isLastPage?: boolean;
    hasNextPage?: boolean;
}
