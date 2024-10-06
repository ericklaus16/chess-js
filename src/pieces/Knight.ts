import PieceClass from "./Piece";

class Knight extends PieceClass {
    constructor(color: string, position: [number, number]) {
        super(color, 'Knight', position);
    }

    public getMoves(tabuleiro: string[][]): [number, number][] {
        const [row, col] = this.getPosition();
        const moves: [number, number][] = [];
        
        const knightMoves = [
            [2, 1], [2, -1], [-2, 1], [-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1, -2],
        ];

        for (const [dRow, dCol] of knightMoves) {
            const targetRow = row + dRow;
            const targetCol = col + dCol;

            if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
                const targetPiece = tabuleiro[targetRow][targetCol];
                const colorTargetPiece = targetPiece[0] === targetPiece[0].toUpperCase() ? 'black' : 'white';

                if (targetPiece === ' ' || this.getColor() !== colorTargetPiece) {
                    moves.push([targetRow, targetCol]);
                }
            }
        }

        return moves;
    }
}

export default Knight;
