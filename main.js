const openNav = document.querySelector('.icon1');
const fermerNav = document.querySelector('.fermer');
const menu = document.querySelector('.menu');


const positionMenu = menu.getBoundingClientRect().left;

openNav.addEventListener('click', () => {
    if (positionMenu < 0) {
        menu.classList.add('monter');
    }
});
fermerNav.addEventListener('click', () => {
    if (positionMenu < 0) {
        menu.classList.remove('monter');
    }
});

let panier = [];
const panierCount = document.querySelector('.bx-shopping-bag + span');

document.querySelectorAll('.btn-panier').forEach(bouton => {
    bouton.addEventListener('click', () => {
        const produit = {
            nom: bouton.dataset.nom,
            prix: parseFloat(bouton.dataset.prix)
        };
        panier.push(produit);
        panierCount.textContent = panier.length;
        localStorage.setItem("panier", JSON.stringify(panier));
        alert(produit.nom + " ajouté au panier !");
    });
});


const stripe = Stripe("TA_CLE_PUBLIQUE_STRIPE"); // depuis dashboard Stripe

document.getElementById("payer").addEventListener("click", () => {
    fetch("/create-checkout-session", { // à gérer côté backend (Node.js, Django, PHP…)
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ panier: panier })
    })
    .then(res => res.json())
    .then(data => {
        return stripe.redirectToCheckout({ sessionId: data.id });
    })
    .then(result => {
        if (result.error) {
            alert(result.error.message);
        }
    });
});

