export interface Pageable<T> {

    content: T[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean
}

export interface Page {
    page: number;
    size: number;
}