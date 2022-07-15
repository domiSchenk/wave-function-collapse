import { ArraySet } from './ArraySet';
import { BOTTOM, LEFT, RIGHT, Rule, TOP } from './rule';
import { mulberry32 } from './mulberry32';

type Row = Array<Rule | null>;
type Grid = Row[];
type Coordinate = [number, number];
type HashSet = [key: Coordinate];

export class Generator {
    grid: Grid = [];
    waves = new ArraySet();

    constructor(
        private height: number,
        private width: number,
        private rules: Rule[],
        private debug: boolean = false,
        private seed: number = 0
    ) {
        if (this.seed === 0) {
            this.seed = Math.floor(Math.random() * 100);
            console.log(`seed: ${this.seed}`);
        }
    }

    run() {
        this.generateWaveFunctionCollapse();
        this.printGird();
    }

    private generateWaveFunctionCollapse() {
        // fill grid with nulls
        for (let y = 0; y < this.height; y++) {
            this.grid[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.grid[y][x] = null;
            }
        }
        // get random start cell
        const [startX, startY] = this.getRandomStartCell();
        // set start cell Rule
        const firstRule = this.getRandomRule(this.rules);
        this.grid[startY][startX] = firstRule;

        // add all touching cell to set -> next wave
        this.addTouchingCells(startY, startX);

        while (this.waves.size > 0) {
            if (this.debug) {
                this.printGird();
            }
            // get random cell from set
            const [y, x] = this.getRandomCellFromWaves();

            // get possible rules for cell
            const possibleRules = this.getPossibleRules(y, x);
            // take anyone from possibleRules
            const randomRule = this.getRandomRule(possibleRules);
            // set cell Rule
            this.grid[y][x] = randomRule;
            // add all touching cell to set -> next wave
            this.addTouchingCells(y, x);
        }

        return this.grid;
    }

    private addTouchingCells(y: number, x: number) {
        this.addTouchingCell(y + 1, x);
        this.addTouchingCell(y - 1, x);
        this.addTouchingCell(y, x + 1);
        this.addTouchingCell(y, x - 1);
    }

    private addTouchingCell(y: number, x: number) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return;
        }

        if (this.grid[y][x] === null) {
            this.waves.add([y, x]);
        }
    }

    getRandomStartCell() {
        const x = Math.floor(mulberry32(this.seed * 111) * this.width);
        const y = Math.floor(mulberry32(this.seed * 222) * this.height);
        return [x, y];
    }
    getRandomCellFromWaves(): Coordinate {
        const randomIndex = Math.floor(mulberry32(this.seed * 333) * this.waves.size);
        const random = this.waves.get(randomIndex) as any;
        return random;
    }

    printGird() {
        if (!this.debug) {
            console.log(`╔${'═'.repeat(this.width + 2)}╗`);
        }
        for (let y = 0; y < this.height; y++) {
            let row = '';
            for (let x = 0; x < this.width; x++) {
                if (this.debug) {
                    row += this.grid[y][x]?.char + ' ';
                } else {
                    row += this.grid[y][x]?.char ?? ' ';
                }
            }
            if (!this.debug) {
                console.log(`║ ${row} ║`);
            } else {
                console.log(row);
                console.log();
            }
        }
        if (!this.debug) {
            console.log(`╚${'═'.repeat(this.width + 2)}╝`);
        }
    }

    getCell(x: number, y: number): any {
        // if (x === 0 && y === 0) {
        //     1;

        //     return firstRule;
        // }
        // get all possible rules for cell
        const possibleRules = this.getPossibleRules(x, y);
        if (this.debug) {
            console.log(possibleRules);
        }
        // take anyone from possibleRules
        const randomRule = this.getRandomRule(possibleRules);
        return randomRule;
    }

    getRandomRule(rules: Rule[]) {
        const randomIndex = Math.floor(mulberry32(this.seed * 444) * rules.length);
        return rules[randomIndex];
    }

    getPossibleRules(y: number, x: number): Rule[] {
        let possibleRules: Rule[] = [];

        // for (let rule of this.rules) {
        const isRightPossible = this.checkRight(x, y);
        const isLeftPossible = this.checkLeft(x, y);
        const isTopPossible = this.checkTop(x, y);
        const isBotPossible = this.checkBottom(x, y);

        if (this.debug) {
            console.log(`[${y}][${x}] : ${isTopPossible} ${isLeftPossible} ${isBotPossible} ${isRightPossible}`);
        }
        possibleRules = this.rules.filter((rule) => rule.bounds[TOP] === isTopPossible || isTopPossible === null);
        possibleRules = possibleRules.filter((rule) => rule.bounds[LEFT] === isLeftPossible || isLeftPossible === null);
        possibleRules = possibleRules.filter((rule) => rule.bounds[BOTTOM] === isBotPossible || isBotPossible === null);
        possibleRules = possibleRules.filter(
            (rule) => rule.bounds[RIGHT] === isRightPossible || isRightPossible === null
        );

        return possibleRules;
    }
    private checkRight(x: number, y: number) {
        x--;
        if (x < 0 || !this.grid[y] || !this.grid[y][x]) {
            return null;
        }

        return this.grid[y][x].bounds[LEFT];
    }

    private checkLeft(x: number, y: number) {
        x++;
        if (x >= this.width || !this.grid[y] || !this.grid[y][x]) {
            return null;
        }
        return this.grid[y][x].bounds[RIGHT];
    }

    private checkBottom(x: number, y: number) {
        y++;
        if (y >= this.height || !this.grid[y] || !this.grid[y][x]) {
            return null;
        }

        return this.grid[y][x].bounds[TOP];
    }

    private checkTop(x: number, y: number) {
        y--;
        if (y < 0 || !this.grid[y] || !this.grid[y][x]) {
            return null;
        }

        return this.grid[y][x].bounds[BOTTOM];
    }
}
