import { useEffect, useState } from "react";

import Peao from "../assets/pawn.png";
import Torre from "../assets/rook.png";
import Cavalo from "../assets/knight.png";
import Bispo from "../assets/bishop.png";
import Dama from "../assets/queen.png";
import Rei from "../assets/king.png";
import Peao_B from "../assets/pawn_b.png";
import Torre_B from "../assets/rook_b.png";
import Cavalo_B from "../assets/knight_b.png";
import Bispo_B from "../assets/bishop_b.png";
import Dama_B from "../assets/queen_b.png";
import Rei_B from "../assets/king_b.png";

type PieceType = {
    color: string; // "black" ou "white"
    type: string; // "Peao", "Torre", etc.
    position: [number, number];
};

const Piece = ({ color, type }: PieceType) => {
    const [image, setImage] = useState<string>();

    useEffect(() => {
        const pieceImages: Record<string, string> = {
            Peao: Peao_B,
            peao: Peao,
            Torre: Torre_B,
            torre: Torre,
            Cavalo: Cavalo_B,
            cavalo: Cavalo,
            Bispo: Bispo_B,
            bispo: Bispo,
            Dama: Dama_B,
            dama: Dama,
            Rei: Rei_B,
            rei: Rei,
        };

        setImage(pieceImages[type] || ''); // Definindo a imagem de acordo com o tipo da peça
    }, [type]);

    return (
        <img src={image} alt={`${type} ${color}`} className="" />
    );
};

export default Piece;
