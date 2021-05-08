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
