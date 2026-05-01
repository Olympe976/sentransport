import { useState } from 'react';
import './App.css';
import Header from './Header';
import StatReseau from './StatReseau';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';
import Footer from './Footer';

function App() {

  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  const [nombreRecherches, setNombreRecherches] = useState(0);

  // Tableau de lignes
  const lignes = [
    { 
      id: 1, numero: "1", depart: "Parcelles Assainies", arrivee: "Plateau", arrets: 14 , couleur : "#0A6E31",
      listeArrets : ["Parcelles U14", "Parcelles U10", "Camberene", "Patte d'Oie", "Grand Dakar", "Colobane", "Ponty", "Plateau"]
    },
    { 
      id: 2, numero: "7", depart: "Guediawaye", arrivee: "Place Obe", arrets: 18, couleur: "#0A4E8A",
      listeArrets : ["Guediawaye", "Pikine", "Thiaroye", "Keur Massar", "Grand Yoff", "Parcelles", "Liberte 6", "Place Obe"]
    },
    { 
      id: 3, numero: "15", depart: "Pikine", arrivee: "Medina", arrets: 12, couleur: "#8A1A0A",
      listeArrets : ["Pikine Centre", "Thiaroye Gare", "Hann", "Colobane", "Fass", "Medina"]
    },
    { 
      id: 4, numero: "23", depart: "Ouakam", arrivee: "Grand Dakar", arrets: 10, couleur: "#5C0A8A",
      listeArrets : ["Ouakam Village", "Mermoz", "Fann", "Point E", "Liberte 5", "Grand Dakar"]
    },
    { 
      id: 5, numero: "8", depart: "Almadies", arrivee: "Colobane", arrets: 16, couleur: "#8A5C0A",
      listeArrets : ["Almadies", "Ngor", "Yoff", "Ouest Foire", "Liberte 6", "Colobane"]
    },
    { 
      id: 6, numero: "12", depart: "Yoff", arrivee: "Sandaga", arrets: 11, couleur: "#0A6E6E",
      listeArrets : ["Yoff Village", "Aeroport LSS", "Parcelles U17", "Grand Yoff", "HLM", "Sandaga"]
    },
    { 
      id: 7, numero: "31", depart: "Fann", arrivee: "HLM Grand Yoff", arrets: 11, couleur: "#8A0A4E",
      listeArrets: ["Fann", "Point E", "Liberte 1", "Sicap Amitie", "Dieuppeul", "HLM", "HLM Grand Yoff"]
    },
    { 
      id: 8, numero: "42", depart: "Liberté 6", arrivee: "Dieuppeul", arrets: 9, couleur: "#1A3D8A",
      listeArrets: ["Liberte 6", "Liberte 5", "Liberte 2", "Sicap Amitie", "Dieuppeul"]
    },
    { 
      id: 9, numero: "18", depart: "Sicap Mbao", arrivee: "Medina", arrets: 13, couleur: "#6B4D0A",
      listeArrets: ["Sicap Mbao", "Pikine", "Thiaroye", "Hann", "Colobane", "Fass", "Grand Dakar", "Medina"]
    },
    { 
      id: 10, numero: "27", depart: "Castors", arrivee: "Plateau", arrets: 8, couleur: "#2D0A8A",
      listeArrets: ["Castors", "Fann", "Mermoz", "Gueule Tapee", "Kermel", "Plateau"]
    },
  ];


  const totalArrets = () => {
    let total = 0;
    lignes.forEach(element => {
      total += element.arrets;
    });
    return total;
  };

  const ligneMax = () => {
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
    setLigneSelectionnee(ligne); //premier clic = sélectionner
  }
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
        <p className="resultat-recherche">
          { lignesFiltrees.length === 0 ? (
            <span>Aucune ligne trouvée</span>)
          
          : <>{ lignesFiltrees.length } ligne{ lignesFiltrees.length > 1 ? 's ' : ' ' } 
              trouvée{ lignesFiltrees.length > 1 ? 's ' : ' ' }
          </>
          }
        </p>

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