export function fetchMock(data, status = 200) {
    return global.Promise.resolve({
        status,
        json: () => data
    });
}
