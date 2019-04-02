export function parsePath(path) {
    let p = path.split('.');
    return (data) => {
        p.forEach(val => {
            data = data[val];
        });
        return data;
    };
}
