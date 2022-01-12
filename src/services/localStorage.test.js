export const getLocalSearches = () => {
    const item = localStorage.getItem('localSearches');
    if (!item) return [];
    return JSON.parse(item);
};

export const deleteLocalSearches = index => {
    const localSearches = getLocalSearches();
    localSearches.splice(index, 1);
    const newLocalSearches = localSearches.map((item, id) => ({
        ...item,
        id,
    }));
    localStorage.setItem('localSearches', JSON.stringify(newLocalSearches));
    return newLocalSearches;
};
