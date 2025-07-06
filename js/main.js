// js/main.js
document.addEventListener('DOMContentLoaded', () => {

    // データの並べ替え処理
    if (typeof ingredientData !== 'undefined' && Array.isArray(ingredientData)) {
        ingredientData.sort((a, b) => {
            return a.name.localeCompare(b.name, 'ja');
        });
    }

    const ingredientList = document.getElementById('ingredient-list');
    const searchBox = document.getElementById('search-box');
    const filterTagsContainer = document.getElementById('filter-tags');

    if (!ingredientList || !searchBox || !filterTagsContainer || typeof ingredientData === 'undefined') {
        console.error("必要なHTML要素またはデータが見つかりません。");
        return;
    }

    let currentQuery = '';
    let selectedTags = [];

    // 1. 絞り込みタグの生成
    const allTags = new Set();
    ingredientData.forEach(item => {
        if (item.tags && Array.isArray(item.tags)) {
            item.tags.forEach(tag => allTags.add(tag));
        }
    });

    allTags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'filter-tag';
        tagElement.innerHTML = `
            <input type="checkbox" id="tag-${tag}" value="${tag}" class="tag-checkbox">
            <label for="tag-${tag}">${tag}</label>
        `;
        filterTagsContainer.appendChild(tagElement);
    });

    // 2. 成分リストをレンダリングする関数
    const renderList = (ingredients) => {
        ingredientList.innerHTML = '';
        if (ingredients.length === 0) {
            ingredientList.innerHTML = '<p class="no-results">該当する成分が見つかりませんでした。</p>';
            return;
        }

        ingredients.forEach(ingredient => {
            const card = document.createElement('a');
            card.className = 'ingredient-card';
            card.href = `ingredient.html?id=${ingredient.id}`; // 詳細ページへのリンク

            let tagsHTML = '';
            if (ingredient.tags && ingredient.tags.length > 0) {
                tagsHTML = `<div class="card-tags">` + 
                    ingredient.tags.slice(0, 3).map(tag => `<span>${tag}</span>`).join('') +
                `</div>`;
            }

            card.innerHTML = `
                <div class="card-content">
                    <h3>${ingredient.name}</h3>
                    <p>${ingredient.summary}</p>
                </div>
                ${tagsHTML}
            `;

            ingredientList.appendChild(card);
        });
    };

    // 3. フィルタリングとレンダリング
    const filterAndRender = () => {
        const filteredIngredients = ingredientData.filter(ingredient => {
            const matchesQuery = (
                ingredient.name.toLowerCase().includes(currentQuery) ||
                ingredient.summary.toLowerCase().includes(currentQuery)
            );
            const matchesTags = selectedTags.every(tag =>
                ingredient.tags && ingredient.tags.includes(tag)
            );
            return matchesQuery && matchesTags;
        });
        renderList(filteredIngredients);
    };

    // 4. イベントリスナー
    searchBox.addEventListener('input', (e) => {
        currentQuery = e.target.value.toLowerCase();
        filterAndRender();
    });

    filterTagsContainer.addEventListener('change', () => {
        selectedTags = Array.from(document.querySelectorAll('.tag-checkbox:checked'))
            .map(checkbox => checkbox.value);
        filterAndRender();
    });

    // 5. 初期表示
    filterAndRender();
});
