document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');
    form.onsubmit = function(e) {
        e.preventDefault(); // Empêche la soumission normale du formulaire

        // Collecter les données du formulaire
        var title = document.getElementById('buttonTitle').value;
        var text = document.getElementById('buttonText').value;
        var data = [
            { type: 'titre', value: title },
            { type: 'texte', value: text }
        ];

        // Envoyer une requête POST avec Fetch API
        fetch('/ajoutInfoPepper', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erreur réseau');
            }
        })
        .then(json => {
            console.log(json);
            // Traiter la réponse du serveur, par exemple rediriger ou afficher un message
        })
        .catch(error => console.error('Erreur:', error));
    };
});