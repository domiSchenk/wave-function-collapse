import { Generator } from './generator';
import { Rule } from './rule';

let tlbr = new Rule('╋', [1, 1, 1, 1]);
let lbr = new Rule('┳', [0, 1, 1, 1]);
let tlb = new Rule('┣', [1, 1, 1, 0]);
let tbr = new Rule('┫', [1, 0, 1, 1]);
let tlr = new Rule('┻', [1, 1, 0, 1]);
let tl = new Rule('┗', [1, 1, 0, 0]);
let lb = new Rule('┏', [0, 1, 1, 0]);
let br = new Rule('┓', [0, 0, 1, 1]);
let tr = new Rule('┛', [1, 0, 0, 1]);
let tb = new Rule('┃', [1, 0, 1, 0]);
let lr = new Rule('━', [0, 1, 0, 1]);
let empty = new Rule(' ', [0, 0, 0, 0]);

// tlbr = new Rule('╬', [1, 1, 1, 1]);
// lbr = new Rule('╦', [0, 1, 1, 1]);
// tlb = new Rule('╠', [1, 1, 1, 0]);
// tbr = new Rule('╣', [1, 0, 1, 1]);
// tlr = new Rule('╩', [1, 1, 0, 1]);
// tl = new Rule('╚', [1, 1, 0, 0]);
// lb = new Rule('╔', [0, 1, 1, 0]);
// br = new Rule('╗', [0, 0, 1, 1]);
// tr = new Rule('╝', [1, 0, 0, 1]);
// tb = new Rule('║', [1, 0, 1, 0]);
// lr = new Rule('═', [0, 1, 0, 1]);
// empty = new Rule(' ', [0, 0, 0, 0]);

/*
 nice seeds
 */

let genBorder = new Generator(10, 20, [tlbr, lbr, tlb, tbr, tlr, tl, lb, br, tr, tb, lr, empty], false, 5);

genBorder.run();

// ┏┰┓
// ┣╂┫
// ┗┻┛
// console.log(lb.char, lbr.char, br.char);
// console.log(tlb.char, tlbr.char, tbr.char);
// console.log(tb.char, tb.char, tb.char);
// console.log(tl.char, tlr.char, tr.char);

// const block = new Rule('◼', [1, 1, 1, 1]);
// const blb = new Rule('◢', [0, 1, 1, 0]);
// const bbr = new Rule('◣', [0, 0, 1, 1]);
// const btr = new Rule('◤', [1, 0, 0, 1]);
// const btl = new Rule('◥', [1, 1, 0, 0]);
// const bempty = new Rule(' ', [0, 0, 0, 0]);

// let gen = new Generator(20, 40, [block, blb, bbr, btr, btl, bempty], false);

// gen.run();
