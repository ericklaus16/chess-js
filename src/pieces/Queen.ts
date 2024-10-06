import PieceClass from "./Piece";

class Queen extends PieceClass {
    constructor(color: string, position: [number, number]) {
        super(color, 'Queen', position);
    }

    public getMoves(tabuleiro: string[][]): [number, number][] {
        const [row, col] = this.getPosition();
        const moves: [number, number][] = [];

        // Direções de movimento da Dama: vertical, horizontal e diagonal
        const directions = [
            [1, 0],   // Para baixo
            [-1, 0],  // Para cima
            [0, 1],   // Para a direita
            [0, -1],  // Para a esquerda
            [1, 1],   // Diagonal inferior direita
            [1, -1],  // Diagonal inferior esquerda
            [-1, 1],  // Diagonal superior direita
            [-1, -1], // Diagonal superior esquerda
        ];

        for (const [dRow, dCol] of directions) {
            let targetRow = row;
            let targetCol = col;

            while (true) {
                targetRow += dRow;
                targetCol += dCol;

                if (targetRow < 0 || targetRow >= 8 || targetCol < 0 || targetCol >= 8) {
                    break;
                }

                const targetPiece = tabuleiro[targetRow][targetCol];
                const colorTargetPiece = targetPiece[0] === targetPiece[0].toUpperCase() ? 'black' : 'white';

                if (targetPiece === ' ') {
                    moves.push([targetRow, targetCol]);
                } 
                else if (this.getColor() !== colorTargetPiece) {
                    moves.push([targetRow, targetCol]);
                    break; 
                } 
                else {
                    break;
                }
            }
        }

        return moves;
    }
}

export default Queen;
