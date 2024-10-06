import { useEffect, useState } from "react";
import Piece from "./Piece";
import Pawn from "../pieces/Pawn";
import Rook from "../pieces/Rook";
import Knight from "../pieces/Knight";
import Bishop from "../pieces/Bishop";
import Queen from "../pieces/Queen";
import King from "../pieces/King";

const Tabuleiro = () => {
    const [selectedPiece, setSelectedPiece] = useState<[number, number] | null>(null);
    const [validMoves, setValidMoves] = useState<[number, number][]>([]);
    const [pecas, setPecas] = useState<string[][]>([
        ['Torre', 'Cavalo', 'Bispo', 'Dama', 'Rei', 'Bispo', 'Cavalo', 'Torre'],
        ['Peao', 'Peao', 'Peao', 'Peao', 'Peao', 'Peao', 'Peao', 'Peao'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['peao', 'peao', 'peao', 'peao', 'peao', 'peao', 'peao', 'peao'],
        ['torre', 'cavalo', 'bispo', 'dama', 'rei', 'bispo', 'cavalo', 'torre']
    ]);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

    const resetGame = () => {
        setPecas([
            ['Torre', 'Cavalo', 'Bispo', 'Dama', 'Rei', 'Bispo', 'Cavalo', 'Torre'],
            ['Peao', 'Peao', 'Peao', 'Peao', 'Peao', 'Peao', 'Peao', 'Peao'],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            ['peao', 'peao', 'peao', 'peao', 'peao', 'peao', 'peao', 'peao'],
            ['torre', 'cavalo', 'bispo', 'dama', 'rei', 'bispo', 'cavalo', 'torre']
        ]);
        setSelectedPiece(null);
        setValidMoves([]);
        setGameOver(false);
        setWinner(null);
    };

    const checkVictoryConditions = () => {
        const whiteKingPosition = findKingPosition('rei');
        const blackKingPosition = findKingPosition('Rei');
    
        if (!whiteKingPosition) {
            setGameOver(true);
            setWinner('Pretas');
        }
        // Se o rei preto não está na tabela
        else if (!blackKingPosition) {
            setGameOver(true);
            setWinner('Brancas');
        }
    };
    
    useEffect(() => {
        checkVictoryConditions();
    }, [pecas]);

    const findKingPosition = (king: string) => {
        for (let i = 0; i < pecas.length; i++) {
            for (let j = 0; j < pecas[i].length; j++) {
                if (pecas[i][j] === king) {
                    return [i, j];
                }
            }
        }
        return null;
    };

    const handlePieceClick = (linhaIndex: number, colunaIndex: number, peca: string) => {
        if (gameOver) return;
    
        if (selectedPiece) {
            const [selectedRow, selectedCol] = selectedPiece;
    
            if (validMoves.some(([row, col]) => row === linhaIndex && col === colunaIndex)) {
                const updatedPecas = pecas.map((linha) => [...linha]);
    
                const targetPiece = updatedPecas[linhaIndex][colunaIndex];
                
                if (targetPiece !== ' ' && targetPiece[0] !== peca[0]) {
                    updatedPecas[linhaIndex][colunaIndex] = updatedPecas[selectedRow][selectedCol];
                    updatedPecas[selectedRow][selectedCol] = ' ';
                } else {
                    updatedPecas[linhaIndex][colunaIndex] = updatedPecas[selectedRow][selectedCol];
                    updatedPecas[selectedRow][selectedCol] = ' ';
                }
    
                setPecas(updatedPecas);
                checkVictoryConditions();
    
                setSelectedPiece(null);
                setValidMoves([]); 
                return;
            } else {
                setValidMoves([]);
            }
        }

        setSelectedPiece([linhaIndex, colunaIndex]);

        let pieceInstance;
        switch (peca) {
            case 'Peao':
                pieceInstance = new Pawn('black', [linhaIndex, colunaIndex]);
                break;
            case 'peao':
                pieceInstance = new Pawn('white', [linhaIndex, colunaIndex]);
                break;
            case 'Torre':
                pieceInstance = new Rook('black', [linhaIndex, colunaIndex]);
                break;
            case 'torre':
                pieceInstance = new Rook('white', [linhaIndex, colunaIndex]);
                break;
            case 'Cavalo':
                pieceInstance = new Knight('black', [linhaIndex, colunaIndex]);
                break;
            case 'cavalo':
                pieceInstance = new Knight('white', [linhaIndex, colunaIndex]);
                break;
            case 'Bispo':
                pieceInstance = new Bishop('black', [linhaIndex, colunaIndex]);
                break;
            case 'bispo':
                pieceInstance = new Bishop('white', [linhaIndex, colunaIndex]);
                break;
            case 'Dama':
                pieceInstance = new Queen('black', [linhaIndex, colunaIndex]);
                break;
            case 'dama':
                pieceInstance = new Queen('white', [linhaIndex, colunaIndex]);
                break;
            case 'Rei':
                pieceInstance = new King('black', [linhaIndex, colunaIndex]);
                break;
            case 'rei':
                pieceInstance = new King('white', [linhaIndex, colunaIndex]);
                break;
            default:
                pieceInstance = null;
                break;
        }

        if (pieceInstance) {
            const moves = pieceInstance.getMoves(pecas);
            setValidMoves(moves);
        }
    };
    
    return (
        <div>
            {gameOver && (
                <div className="text-center items-center flex flex-col my-4">
                    <p className="text-2xl">{winner ? `Vitória para ${winner}!` : "Empate!"}</p>
                    <button 
                    onClick={resetGame}
                    className="bg-blue-500 text-white p-2 mt-4 w-auto rounded-lg">Jogar de novo</button>
                </div>
            )}
            <div className='grid grid-cols-8 gap-0'>
                {pecas.map((linha, linhaIndex) => (
                    linha.map((peca, colunaIndex) => {
                        const casaColor = (linhaIndex + colunaIndex) % 2 === 0 ? 'bg-[#dec88f]' : 'bg-[#996035]'; // Verifica a cor da casa

                        const isMoveValid = validMoves.some(([row, col]) => row === linhaIndex && col === colunaIndex);
                        const highlightClass = isMoveValid ? 'bg-green-500' : '';

                        return (
                            <div
                                key={`${linhaIndex}-${colunaIndex}`}
                                className={`w-16 h-16 flex items-center justify-center ${casaColor} ${highlightClass}`}
                                onClick={() => handlePieceClick(linhaIndex, colunaIndex, peca)}
                            >
                                {peca !== ' ' && (
                                    <Piece
                                        color={peca[0] === peca[0].toLowerCase() ? 'white' : 'black'}
                                        type={peca}
                                        position={[linhaIndex, colunaIndex]}
                                    />
                                )}
                            </div>
                        );
                    })
                ))}
            </div>
        </div>
    );
};

export default Tabuleiro;
