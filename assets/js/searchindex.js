import { virtualIndex } from './virtualindex.js';
import { mainIndex } from './mainindex.js';

export const searchIndex = [...mainIndex, ...virtualIndex];

export const pageCounters = {
    guides: searchIndex.filter(obj =>
        Array.isArray(obj.tags) &&
        obj.tags.some(tag => tag.toLowerCase() === 'guides')
    ).length,
    allPages: mainIndex.length + virtualIndex.length
}