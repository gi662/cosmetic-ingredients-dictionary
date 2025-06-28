document.addEventListener('DOMContentLoaded', () => {
    const ingredientList = document.getElementById('ingredient-list');
    const searchBox = document.getElementById('search-box');

    // 成分リストをレンダリングする関数
    const renderList = (ingredients) => {
        ingredientList.innerHTML = ''; // 一旦リストを空にする
        if (ingredients.length === 0) {
            ingredientList.innerHTML = '<p>該当する成分が見つかりませんでした。</p>';
            return;
        }

        ingredients.forEach(ingredient => {
            const card = document.createElement('a');
            card.className = 'ingredient-card';
            card.href = `ingredient.html?id=${ingredient.id}`; // 詳細ページへのリンク

            card.innerHTML = `
                <h3>${ingredient.name}</h3>
                <p>${ingredient.summary}</p>
            `;
            ingredientList.appendChild(card);
        });
    };

    // 検索機能
    searchBox.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredIngredients = ingredientData.filter(ingredient => {
            // 成分名や概要に検索クエリが含まれているかチェック
            return ingredient.name.toLowerCase().includes(query) || ingredient.summary.toLowerCase().includes(query);
        });
        renderList(filteredIngredients);
    });

    // 初期表示
    renderList(ingredientData);
});
