export class Model {
    getItem(key: string) {
        const item = localStorage.getItem(key);
        if (item !== null) {
            return JSON.parse(item);
        }

        return null;
    }
    setItem(key: string, value: unknown) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
