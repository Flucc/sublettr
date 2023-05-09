import { writable } from 'svelte/store';

export const pageStore = writable({
    pageIndex: 0,
    pageSize: 10,
  });

export function setPageIndex(pageIndex) {
    pageStore.update((pageData) => {
      return { ...pageData, pageIndex };
    });
}

export function setPageSize(pageSize) {
    pageStore.update((pageData) => {
      return { ...pageData, pageSize };
    });
}