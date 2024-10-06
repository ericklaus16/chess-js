import PieceClass from './Piece';

class Pawn extends PieceClass {
    constructor(color: string, position: [number, number]) {
        super(color, 'Pawn', position);
    }

    public getMoves(): [number, number][] {
        const [row, col] = this.getPosition();
        const moves: [number, number][] = [];

        const direction = this.getColor() === 'white' ? 1 : -1;

        moves.push([row + direction, col]);

        if ((this.getColor() === 'white' && row === 1) || (this.getColor() === 'black' && row === 6)) {
            moves.push([row + 2 * direction, col]);
        }

        moves.push([row + direction, col - 1]);
        moves.push([row + direction, col + 1]);

        return moves;
    }
}

export default Pawn;
