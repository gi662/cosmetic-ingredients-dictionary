document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const ingredientsGrid = document.getElementById('ingredientsGrid');
    const noResults = document.getElementById('noResults');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentFilter = 'all';

    function displayIngredients(ingredients) {
        ingredientsGrid.innerHTML = '';
        if (ingredients.length === 0) {
            noResults.style.display = 'block';
            return;
        } else {
            noResults.style.display = 'none';
        }

        ingredients.forEach(item => {
            const card = document.createElement('a');
            card.className = 'ingredient-card';
            card.href = 'ingredient/' + item.fileName;
            card.innerHTML = `
                <h3 class="ingredient-name">${item.name}</h3>
                <span class="ingredient-category">${item.categoryName}</span>
                <p class="ingredient-description">${item.description}</p>
            `;
            ingredientsGrid.appendChild(card);
        });
    }

    function filterAndSearch() {
        let results = ingredientsData;
        const searchTerm = searchInput.value.toLowerCase();

        if (currentFilter !== 'all') {
            results = results.filter(i => i.category === currentFilter);
        }

        if (searchTerm) {
            results = results.filter(i =>
                i.name.toLowerCase().includes(searchTerm) ||
                i.description.toLowerCase().includes(searchTerm)
            );
        }

        displayIngredients(results);
    }

    searchBtn.addEventListener('click', filterAndSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') filterAndSearch();
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.category;
            filterAndSearch();
        });
    });

    displayIngredients(ingredientsData);
});
