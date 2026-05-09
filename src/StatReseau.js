import './StatReseau.css'

function StatReseau({ nbreLignes, nbreArrets, ligne }) {
    return (
        <div className="stat-reseau">
            <div className="stat-container">
                <span className="stat-nombre">{nbreLignes}</span>
                <span className="stat-libelle">lignes</span>
            </div>

            <div className="stat-container">
                <span className="stat-nombre">{nbreArrets}</span>
                <span className="stat-libelle">arrêts</span>
            </div>

            <div className="stat-container">
                <span className="stat-label">Ligne</span>
                <span className="stat-nombre">{ligne}</span>
                <span className="stat-libelle">avec le plus d'arrêts</span>
            </div>
        </div>
    );
}

export default StatReseau;