import PieceClass from "./Piece";

class Pawn extends PieceClass {
    constructor(color: string, position: [number, number]) {
        super(color, 'Pawn', position);
    }

    public getMoves(tabuleiro: string[][]): [number, number][] {
        const [row, col] = this.getPosition();
        const moves: [number, number][] = [];
        const direction = this.getColor() === 'white' ? -1 : 1;

        if(row === 1 && this.getColor() === 'black' || row === 6 && this.getColor() === 'white') {
            const doubleMoveRow = row + 2 * direction;
            if (tabuleiro[doubleMoveRow][col] === ' ' && tabuleiro[row + direction][col] === ' ') {
                moves.push([doubleMoveRow, col]);
            }
        }

        const forwardRow = row + direction;
        if (forwardRow >= 0 && forwardRow < 8) { // Verifica se está dentro do tabuleiro
            if (tabuleiro[forwardRow][col] === ' ') {
                moves.push([forwardRow, col]);
            }
        }

        const captureLeftCol = col - 1;
        const captureRightCol = col + 1;

        if (forwardRow >= 0 && forwardRow < 8) { // Verifica se a linha da captura está dentro do tabuleiro
            if (captureLeftCol >= 0 && tabuleiro[forwardRow][captureLeftCol] !== ' ' && tabuleiro[forwardRow][captureLeftCol][0] !== this.getColor()[0].toUpperCase()) {
                moves.push([forwardRow, captureLeftCol]);
            }
            if (captureRightCol < 8 && tabuleiro[forwardRow][captureRightCol] !== ' ' && tabuleiro[forwardRow][captureRightCol][0] !== this.getColor()[0].toUpperCase()) {
                moves.push([forwardRow, captureRightCol]);
            }
        }

        return moves;
    }
}

export default Pawn;
