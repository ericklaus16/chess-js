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
    const [timerWhite, setTimerWhite] = useState(300);
    const [timerWhiteConverted, setTimerWhiteConverted] = useState('');
    const [timerBlack, setTimerBlack] = useState(300);
    const [timerBlackConverted, setTimerBlackConverted] = useState('');
    const [turn, setTurn] = useState('white');
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const [currentPieceColor, setIsCurrentPieceColor] = useState("black");

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
        setTimerWhite(300);
        setTimerBlack(300);
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    const checkVictoryConditions = () => {
        const whiteKingPosition = findKingPosition('rei');
        const blackKingPosition = findKingPosition('Rei');
    
        if (!whiteKingPosition) {
            setGameOver(true);
            setWinner('Pretas');
        } else if (!blackKingPosition) {
            setGameOver(true);
            setWinner('Brancas');
        }
    };
    
    useEffect(() => {
        checkVictoryConditions();
    }, [pecas]);

    useEffect(() => {
        if (!gameOver) {
            setTimerWhiteConverted(handleFormatTime(timerWhite));
            setTimerBlackConverted(handleFormatTime(timerBlack));
        }
    }, [timerWhite, timerBlack]);

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

    const decreaseTimer = (currentTimer: number, setCurrentTimer: (time: number) => void) => {
        if (currentTimer > 0) {
            const newTimer = currentTimer - 1;
            setCurrentTimer(newTimer);

            if (newTimer === 0) {
                setGameOver(true);
                setWinner(turn === 'white' ? 'Pretas' : 'Brancas');
            }
        }
    };

    const handlePieceClick = (linhaIndex: number, colunaIndex: number, peca: string) => {
        if(peca !== " " && peca[0] !== peca[0].toUpperCase())
            setIsCurrentPieceColor("white");
        else if(peca !== " " && peca[0] !== peca[0].toLowerCase())
            setIsCurrentPieceColor("black");
        
        if (gameOver || (turn === "white" && currentPieceColor === "black") || (turn === "black" && currentPieceColor === "white")) return;

        if (selectedPiece && turn === currentPieceColor) {
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
                setTurn((prevTurn) => (prevTurn === 'white' ? 'black' : 'white'));
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

    const handleFormatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    };

    useEffect(() => {
        if (timerWhite > 0 || timerBlack > 0) {
            const id = setInterval(() => {
                if (turn === 'white' && timerWhite > 0) {
                    decreaseTimer(timerWhite, setTimerWhite);
                } else if (turn === 'black' && timerBlack > 0) {
                    decreaseTimer(timerBlack, setTimerBlack);
                }
            }, 1000);
            setIntervalId(id);
            return () => clearInterval(id);
        }
    }, [turn, timerWhite, timerBlack]);

    return (
        <div className="w-[80vw] flex flex-col items-center justify-center">
            {gameOver && (
                <div className="text-center">
                    <p className="text-2xl text-white">{winner ? `Vitória para ${winner}!` : "Empate!"}</p>
                    <button 
                    onClick={resetGame}
                    className="my-2 p-2 bg-green-600 rounded">Reiniciar jogo</button>
                </div>
            )}
            <div className="flex flex-row w-2/4 items-center justify-between">
                <div className="mr-4 text-center">
                    <p className="text-white text-lg font-bold">Tempo Brancas</p>
                    <p className="text-white text-lg font-bold">{timerWhiteConverted}</p>
                </div>
                <div className="text-center">
                    <p className="text-white">Tempo Pretas</p>
                    <p className="text-white text-lg font-bold">{timerBlackConverted}</p>
                </div>
            </div>
            <div className='grid grid-cols-8 gap-0 border-2 border-[#1f651f] shadow-lg'>
                {pecas.map((linha, linhaIndex) => (
                    linha.map((peca, colunaIndex) => {
                        const casaColor = (linhaIndex + colunaIndex) % 2 === 0 ? 'bg-[#dec88f]' : 'bg-[#996035]'; // Verifica a cor da casa
                        const isMoveValid = validMoves.some(([row, col]) => row === linhaIndex && col === colunaIndex) && currentPieceColor === turn;
                        const highlightClass = isMoveValid && selectedPiece && currentPieceColor === turn ? 'bg-green-500' : '';
                        return (
                            <div
                                key={`${linhaIndex}-${colunaIndex}`}
                                className={`w-16 h-16  ${casaColor} ${highlightClass}`}
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
