import './App.css';
import Header from './Header';
import StatReseau from './StatReseau';
import ListeLignes from './ListeLignes';
import Footer from './Footer';

function App() {
  const lignes = [
    { id: 1, numero: "1", depart: "Parcelles Assainies", arrivee: "Plateau", arrets: 14 , couleur : "#0A6E31"},
    { id: 2, numero: "7", depart: "Guediawaye", arrivee: "Place Obe", arrets: 18 , couleur : "#0A4E8A"},
    { id: 3, numero: "15", depart: "Pikine", arrivee: "Medina", arrets: 12 , couleur : "#8A1A0A"},
    { id: 4, numero: "23", depart: "Ouakam", arrivee: "Grand Dakar", arrets: 10 , couleur : "#5C0A8A"},
    { id: 5, numero: "8", depart: "Almadies", arrivee: "Colobane", arrets: 16 , couleur : "#8A5C0A"},
    { id: 6, numero: "12", depart: "Yoff", arrivee: "Sandaga", arrets: 16 , couleur : "#0A6E6E"},
    { id: 7, numero: "31", depart: "Fann", arrivee: "HLM Grand Yoff", arrets: 11, couleur: "#8A0A4E" },
    { id: 8, numero: "42", depart: "Liberté 6", arrivee: "Dieuppeul", arrets: 9, couleur: "#1A3D8A" },
    { id: 9, numero: "18", depart: "Sicap Mbao", arrivee: "Medina", arrets: 13, couleur: "#6B4D0A" },
    { id: 10, numero: "27", depart: "Castors", arrivee: "Plateau", arrets: 8, couleur: "#2D0A8A" },
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
  return (
    <div className="App">
      <Header/>
      <main className='contenu'>
        <StatReseau
          nbreLignes={lignes.length}
          nbreArrets={totalArrets()}
          ligne={ligneMax().numero}
        />
        <ListeLignes lignes={lignes}/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
