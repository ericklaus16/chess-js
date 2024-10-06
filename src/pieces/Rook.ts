import PieceClass from "./Piece";

class Rook extends PieceClass {
    constructor(color: string, position: [number, number]) {
        super(color, 'Rook', position);
    }

    public getMoves(tabuleiro: string[][]): [number, number][] {
        const [row, col] = this.getPosition();
        const moves: [number, number][] = [];

        this.addVerticalMoves(moves, tabuleiro, row, col, -1); // Para cima
        this.addVerticalMoves(moves, tabuleiro, row, col, 1); // Para baixo

        this.addHorizontalMoves(moves, tabuleiro, row, col, -1); // Para a esquerda
        this.addHorizontalMoves(moves, tabuleiro, row, col, 1); // Para a direita

        return moves;
    }

    private addVerticalMoves(moves: [number, number][], tabuleiro: string[][], row: number, col: number, direction: number) {
        for (let i = row + direction; i >= 0 && i < 8; i += direction) {
            const targetPiece = tabuleiro[i][col];
            if (targetPiece === ' ') {
                moves.push([i, col]);
            } else if (targetPiece[0] !== targetPiece[0]) {
                moves.push([i, col]);
                break;
            } else {
                break;
            }
        }
    }

    private addHorizontalMoves(moves: [number, number][], tabuleiro: string[][], row: number, col: number, direction: number) {
        for (let i = col + direction; i >= 0 && i < 8; i += direction) {
            const targetPiece = tabuleiro[row][i];
            if (targetPiece === ' ') {
                moves.push([row, i]);
            } else if (targetPiece[0] !== targetPiece[0]) {
                moves.push([row, i]);
                break; 
            } else {
                break;
            }
        }
    }
}

export default Rook;
