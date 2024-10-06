import Piece from "./Piece";

const Tabuleiro = () => {
    const tabuleiro = [
        'B', 'P', 'B', 'P', 'B', 'P', 'B', 'P',
        'P', 'B', 'P', 'B', 'P', 'B', 'P', 'B',
        'B', 'P', 'B', 'P', 'B', 'P', 'B', 'P',
        'P', 'B', 'P', 'B', 'P', 'B', 'P', 'B',
        'B', 'P', 'B', 'P', 'B', 'P', 'B', 'P',
        'P', 'B', 'P', 'B', 'P', 'B', 'P', 'B',
        'B', 'P', 'B', 'P', 'B', 'P', 'B', 'P',
        'P', 'B', 'P', 'B', 'P', 'B', 'P', 'B',
    ];

    const pecas = [
        ['Torre', 'Cavalo', 'Bispo', 'Dama', 'Rei', 'Bispo', 'Cavalo', 'Torre'],
        ['Peao', 'Peao', 'Peao', 'Peao', 'Peao', 'Peao', 'Peao', 'Peao'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['peao', 'peao', 'peao', 'peao', 'peao', 'peao', 'peao', 'peao'],
        ['torre', 'cavalo', 'bispo', 'dama', 'rei', 'bispo', 'cavalo', 'torre']
    ];

    return (
        <div>
            <div className='grid grid-cols-8 gap-0'>
                {pecas.map((linha, linhaIndex) => (
                    linha.map((peca, colunaIndex) => {
                        const casaIndex = linhaIndex * 8 + colunaIndex;
                        const casaColor = tabuleiro[casaIndex] === 'B' ? 'bg-[#dec88f]' : 'bg-[#996035]';

                        const pecaColor = peca[0] === peca[0].toLowerCase()  ? 'white' : 'black';
                        
                        return (
                            <div
                                key={`${linhaIndex}-${colunaIndex}`}
                                className={`w-16 h-16 flex items-center justify-center ${casaColor}`}
                            >
                                {peca !== ' ' && (
                                    <Piece 
                                        color={pecaColor}
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
