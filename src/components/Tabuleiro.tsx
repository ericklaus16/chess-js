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
    ]

    return(
        <div>
            <div className='grid grid-cols-8 gap-0'>
                {tabuleiro.map((casa, index) => (
                    <div key={index} className={`w-16 h-16 flex items-center justify-center ${casa == 'B' ? 'bg-[#dec88f]' : 'bg-[#996035]'}`}>
                        {casa}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tabuleiro;