export type Coordinate = [number, number];

export class ArraySet {
    private store = {};
    get size() {
        return Object.keys(this.store).length;
    }

    get(index) {
        const key = Object.keys(this.store)[index];
        const item = this.store[key];
        this.delete(key);
        return item;
    }

    add(arr: any) {
        this.store[arr] = arr;
    }

    has(arr: any) {
        return this.store[arr];
    }

    delete(key: any) {
        delete this.store[key];
    }
}
