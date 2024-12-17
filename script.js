$(document).ready(function () {
    let offset = 0; // Nombre de produits déjà chargés
    const limit = 10; // Nombre de produits à charger par requête
    let loading = false; // Empêche les requêtes multiples simultanées
    const $loadingIndicator = $('#loading');

    // Fonction pour charger les produits
    function loadProducts() {
        if (loading) return;

        loading = true; // Empêche un autre chargement en cours
        $loadingIndicator.show();

        $.get('fetch_products.php', { limit: limit, offset: offset }, function (data) {
            if (data.length === 0) {
                // Si aucun produit n'est retourné, on désactive le chargement
                $(window).off('scroll');
                $loadingIndicator.text('Aucun autre produit à afficher.');
                return;
            }

            data.forEach(product => {
                $('#products').append(`
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${product.image_url}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text"><strong>${product.price} €</strong></p>
                            </div>
                        </div>
                    </div>
                `);
            });

            offset += limit; // Augmente l'offset pour la prochaine requête
            loading = false; // Permet un nouveau chargement
            $loadingIndicator.hide();
        }).fail(function () {
            console.error('Erreur lors du chargement des produits.');
            loading = false;
            $loadingIndicator.hide();
        });
    }

    // Événement de défilement pour détecter si l'utilisateur atteint le bas de la page
    $(window).on('scroll', function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            loadProducts();
        }
    });
    $(document).ready(function () {
        let offset = 0;
        const limit = 10;
        let loading = false;
        const $loadingIndicator = $('#loading');

        function loadProducts(query = "") {
            if (loading) return;
            loading = true;
            $loadingIndicator.show();

            $.get('fetch_products.php', { limit: limit, offset: offset, search: query }, function (data) {
                if (data.length === 0) {
                    if (offset === 0) $('#products').html('<p class="text-center">Aucun produit trouvé.</p>');
                    $(window).off('scroll');
                    $loadingIndicator.text('Plus de produits.');
                    return;
                }

                data.forEach(product => {
                    $('#products').append(`
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${product.image_url}" class="card-img-top" alt="${product.name}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text">${product.description}</p>
                                <p class="card-text"><strong>${product.price} €</strong></p>
                            </div>
                        </div>
                    </div>
                `);
                });

                offset += limit;
                loading = false;
                $loadingIndicator.hide();
            }).fail(function () {
                console.error('Erreur lors du chargement.');
                loading = false;
                $loadingIndicator.hide();
            });
        }

        // Fonction de recherche
        $('#searchBtn').click(function () {
            const query = $('#searchInput').val();
            $('#products').empty();
            offset = 0;
            loadProducts(query);
        });

        // Recherche en temps réel
        $('#searchInput').on('keyup', function () {
            const query = $(this).val();
            $('#products').empty();
            offset = 0;
            loadProducts(query);
        });
        loadProducts();
    });


    // Charger les produits initiaux
    loadProducts();
});
