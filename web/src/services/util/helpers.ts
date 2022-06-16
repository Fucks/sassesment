import { SyntheticEvent } from "react";
import { Page, Pageable } from "./page";

export const onChangePage = (event: SyntheticEvent<any>, _page: any, callback: (page: Page) => void) => {
    callback({ page: _page - 1, size: 10 });
}

export const getPagesArray = (content: Pageable<any>) => {

    if (!content) {
        return [];
    }

    let pages = [];

    for (let i = 0; i < content?.totalPages; i++) {
        pages.push(i + 1);
    }

    return pages;
}

export const EmptyPage = {
    content: [],
    last: true,
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 10,
    first: true,
    numberOfElements: 0,
    empty: true
}

export function updateArray<T>(array: T[], comparator: (param: T) => boolean, entity: T) {

    const index = array.findIndex(comparator);

    if (index >= 0) {
        array[index] = entity;
        return [...array]
    }

    return [...array, entity];
}