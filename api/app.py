import json
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Charger les données depuis le fichier json
with open("lignes_ddd.json", "r") as f:
    lignes = json.load(f)


@app.route("/")
def accueil():
    return jsonify({
        "message": "Bienvenue sur l'API SenTransport !",
        "endpoints": ["/lignes", "/lignes/<id>"]
    })

@app.route("/lignes")
def get_lignes():
    return jsonify(lignes)


@app.route("/lignes/<int:ligne_id>")
def get_ligne(ligne_id):
    ligne = next(
        (l for l in lignes if l["id"] == ligne_id),
        None
    )
    if ligne is None:
        return jsonify({"erreur": "Ligne non trouvee"}), 404
    return jsonify(ligne)

@app.route("/arrets")
def get_arrets():
    arrets = set()

    for l in lignes:
        for a in l["listeArrets"]:
            arrets.add(a)

    return jsonify({
        "arrets": sorted(list(arrets))
    })

@app.route("/stats")
def get_stats():
    nbre_lignes = len(lignes)
    nbre_arrets = sum([len(l["listeArrets"]) for l in lignes])

    ligne_max = max(lignes, key=lambda l: len(l["listeArrets"]))

    return jsonify({
        "lignes": nbre_lignes,
        "arrets": nbre_arrets,
        "ligne_avec_plus_d_arrets": {
            "numero": ligne_max["numero"],
            "nbre_arrets": len(ligne_max["listeArrets"])
        }
    })


@app.route("/lignes/recherche")
def get_recherche():
    query = request.args.get("q","").lower()

    results = [
        l for l in lignes 
        if query in l["depart"].lower() or query in l["arrivee"].lower() 
    ]

    return jsonify({
        "query": query,
        "results": results
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)
