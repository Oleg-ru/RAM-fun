import './Character.css'
import type {Character} from '../../types/Character.ts'

export const CharacterItem = (props: Character) => {
    const {id, name, status, location, origin, image, setId} = props;

    return (
        <div className="character-item" onClick={() => {setId(id)}}>
            <img src={image} alt={name} className="character-image" />
            <div className="character-info">
                <h3 className="character-name">{name}</h3>
                <div className={`character-status status-${status?.toLowerCase() || 'unknown'}`}>
                    <span className="status-dot"></span>
                    {status || 'Unknown'}
                </div>
                <div className="character-details">
                    <div className="detail-item">
                        <span className="detail-label">📍 Location:</span>
                        <span className="detail-value">{location?.name || 'Unknown'}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">🌍 Origin:</span>
                        <span className="detail-value">{origin?.name || 'Unknown'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}