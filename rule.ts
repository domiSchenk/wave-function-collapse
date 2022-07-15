export const TOP = 0;
export const LEFT = 1;
export const BOTTOM = 2;
export const RIGHT = 3;

export class Rule {
    char: string;
    bounds: [boolean, boolean, boolean, boolean];

    constructor(char: string, bounds: number[]) {
        this.char = char;

        const hasTop = bounds[TOP] > 0;
        const hasLeft = bounds[LEFT] > 0;
        const hasBottom = bounds[BOTTOM] > 0;
        const hasRight = bounds[RIGHT] > 0;

        this.bounds = [hasTop, hasLeft, hasBottom, hasRight];
    }
}
