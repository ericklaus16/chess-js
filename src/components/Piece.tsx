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


import PieceClass from "../pieces/Piece";
import Pawn from "../pieces/Pawn";


type PieceType = {
    color: string;
    type: string;
    position: [number, number];
}

const Piece = (props: PieceType) => {
    const [row, col] = props.position;
    const [image, setImage] = useState<string>();
    const [pieceClass, setPieceClass] = useState<PieceClass>();

    useEffect(() => {
        console.log(`A peça ${props.type} está na posição ${row}, ${col}`);
        console.log(`${props.type}.png`)

        switch (props.type) {
            case 'Peao':
                setImage(Peao_B);
                setPieceClass(new Pawn('black', [row, col]));
                break;
            case 'peao':
                setImage(Peao);
                setPieceClass(new Pawn('white', [row, col]));
                break;
            case 'Torre':
                setImage(Torre_B);
                break;
            case 'torre':
                setImage(Torre);
                break;
            case 'Cavalo':
                setImage(Cavalo_B);
                break;
            case 'cavalo':
                setImage(Cavalo);
                break;
            case 'Bispo':
                setImage(Bispo_B);
                break;
            case 'bispo':
                setImage(Bispo);
                break;
            case 'Dama':
                setImage(Dama_B);
                break;
            case 'dama':
                setImage(Dama);
                break;
            case 'Rei':
                setImage(Rei_B);
                break;
            case 'rei':
                setImage(Rei);
                break;
            default:
                setImage('');
                break;
        }

    }, [])

    return (
        <div onClick={() => console.log(pieceClass?.getMoves())}>
            <img src={image} className=""/>
        </div>
    );
}

export default Piece;