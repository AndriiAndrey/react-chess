import { FC } from 'react';

import { Piece } from '@/models/pieces';

interface IProps {
  title: string;
  figures: Piece[];
}

const LostPieces: FC<IProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map((piece) => (
        <div key={piece.id} className="lost-item">
          {piece.logo && <img width={24} height={24} src={piece.logo} alt={piece.name} />}
          <p>{piece.name}</p>
        </div>
      ))}
    </div>
  );
};

export default LostPieces;
