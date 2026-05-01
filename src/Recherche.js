import './Recherche.css';


function Recherche({ valeur, onChange, count }){
    return(
        <div className="recherche">
            <input 
                type="text" 
                className="recherche-input"
                placeholder="Rechercher une ligne (depart, arrivee)..."
                value={valeur}
                onChange={e => {
                                    onChange(e.target.value)
                                    count(prev => prev + 1 )
                                }}
            />
            <button className="recherche-effacer" onClick={e => onChange("")}>Effacer</button>
        </div>
    );
}

export default Recherche;