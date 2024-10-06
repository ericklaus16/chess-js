import PieceClass from "./Piece";

class Bishop extends PieceClass {
    constructor(color: string, position: [number, number]) {
        super(color, 'Bishop', position);
    }

    public getMoves(tabuleiro: string[][]): [number, number][] {
        const [row, col] = this.getPosition();
        const moves: [number, number][] = [];

        // Direções de movimento do Bispo: diagonal
        const directions = [
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

                // Verifica se a nova posição está dentro dos limites do tabuleiro
                if (targetRow < 0 || targetRow >= 8 || targetCol < 0 || targetCol >= 8) {
                    break;
                }

                const targetPiece = tabuleiro[targetRow][targetCol];
                const colorTargetPiece = targetPiece[0] === targetPiece[0].toUpperCase() ? 'black' : 'white';

                if (targetPiece === ' ') {
                    moves.push([targetRow, targetCol]);
                } 
                // Se encontrar uma peça da cor oposta, também adiciona como movimento válido
                else if (this.getColor() != colorTargetPiece) {
                    moves.push([targetRow, targetCol]);
                    break; 
                } else {
                    break;
                }
            }
        }

        return moves;
    }
}

export default Bishop;
