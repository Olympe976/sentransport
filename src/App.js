import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import StatReseau from './StatReseau';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';
import Footer from './Footer';

function App() {
  // 1. Les états 
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [nombreRecherches, setNombreRecherches] = useState(0);

  
  //2. Charger les données au démarrage
  function chargerLignes(){
    fetch("http://localhost:5000/lignes")
      .then(response => {
        if(!response.ok){
          throw new Error (
            "Erreur serveur : " + response.status 
          );
        }
        return response.json();
      })
      .then(data => {
        setLignes(data);
        setChargement(false);
      })
      .catch(error => {
        setErreur(error.message);
        setChargement(false);
      });
  }

  useEffect(() => {
    chargerLignes();
  }, []);

  const totalArrets = () => {
    let total = 0;
    lignes.forEach(element => {
      total += element.arrets;
    });
    return total;
  };

  const ligneMax = () => {
    // Le tableau etant vide au premier chargement, on met une valeur ^par defaut
    if (lignes.length === 0) return { numero: "..." }; 

    let max = lignes[0];

    lignes.forEach(ligne => {
      if(ligne.arrets > max.arrets){
        max = ligne;
      }
    });
    return max;
  }


  // Filter les lignes selon le texte tapé
  const lignesFiltrees = lignes.filter(l =>
    l.depart.toLocaleLowerCase().includes(recherche.toLocaleLowerCase()) ||
    l.arrivee.toLocaleLowerCase().includes(recherche.toLocaleLowerCase()) ||
    l.numero.includes(recherche)

  );

  function handleClickLigne(ligne){
    if(ligneSelectionnee && ligneSelectionnee.id === ligne.id){
      setLigneSelectionnee(null);  // re-clic =  deselectionner
    }
    else{
      // setLigneSelectionnee(ligne); //premier clic = sélectionner

      fetch(`http://localhost:5000/lignes/${ligne.id}`)
        .then(response => {
          if(!response.ok){
            throw new Error (
              "Erreur serveur : " + response.status 
            );
          }
          return response.json();
        })
        .then(data => {
          setLigneSelectionnee(data);
        });
    }
  }

    // Ecran de chargement
    if(chargement){
      return (
        <div className="App">
          <Header/>
          <main className="contenu">
            <p className="message-chargement">Chargement des lignes...</p>
          </main>
        </div>
      );
    }

    // Ecran d'erreur
    if (erreur){
      return (
        <div className="App">
          <Header/>
          <main className="contenu">
            <div className="message-erreur">
                <p>Impossible de charger les lignes.</p>
                <p className="erreur-detail">{erreur}</p>
                <p>Vérifiez que le serveur Flask est lancé (python api/app.py).</p>
            </div>
          </main>
        </div>
      )
    }

    return (
      <div className="App">
        <Header/>
        <main className='contenu'>
          <StatReseau
            nbreLignes={lignes.length}
            nbreArrets={totalArrets()}
            ligne={ligneMax().numero}
          />
          <span className="message-recherche">Vous avez effectué {nombreRecherches} recherche{nombreRecherches === 0 ? "" : "s"}</span>
          <Recherche valeur={recherche} onChange={setRecherche} count={setNombreRecherches}/>
          <div className="barre-resultat">
            <p className="resultat-recherche">
              { lignesFiltrees.length === 0 ? (
                <span>Aucune ligne trouvée</span>)
              
              : <>{ lignesFiltrees.length } ligne{ lignesFiltrees.length > 1 ? 's ' : ' ' } 
                  trouvée{ lignesFiltrees.length > 1 ? 's ' : ' ' }
              </>
              }
            </p>
            <button className="btn-recharger" onClick={chargerLignes}>&#x21BB; Recharger</button>
          </div>

          {lignesFiltrees.map(ligne => (
            <>
              <LigneBus
                key={ligne.id}
                numero={ligne.numero}
                depart={ligne.depart}
                arrivee={ligne.arrivee}
                arrets={ligne.arrets}
                couleur={ligne.couleur}
                estSelectionnee={ligneSelectionnee && ligneSelectionnee.id === ligne.id}
                onClick={() => handleClickLigne(ligne)}
              />
              {ligneSelectionnee && ligneSelectionnee.id === ligne.id && (
                <DetailLigne ligne={ligneSelectionnee} />
              )}
              
            </>
            
          ))}
          
        </main>
        <Footer/>
      </div>
    );
}

export default App;