import PieceClass from "./Piece";

class King extends PieceClass {
    constructor(color: string, position: [number, number]) {
        super(color, 'King', position);
    }

    public getMoves(tabuleiro: string[][]): [number, number][] {
        const [row, col] = this.getPosition();
        const moves: [number, number][] = [];

        // Direções de movimento do Rei (uma casa em qualquer direção)
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

        // Verifica cada direção
        for (const [dRow, dCol] of directions) {
            const targetRow = row + dRow;
            const targetCol = col + dCol;

            if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
                const targetPiece = tabuleiro[targetRow][targetCol];
                const colorTargetPiece = targetPiece[0] === targetPiece[0].toUpperCase() ? 'black' : 'white';

                if (targetPiece === ' ') {
                    moves.push([targetRow, targetCol]);
                } 
                else if (this.getColor() !== colorTargetPiece) {
                    moves.push([targetRow, targetCol]);
                }
            }
        }

        return moves;
    }
}

export default King;
