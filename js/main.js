// js/main.js (更新版)

document.addEventListener('DOMContentLoaded', () => {

    // --- ↓↓↓ ここからが変更箇所 ↓↓↓ ---

    // ★★★ データの並べ替え処理を追加 ★★★
    // ページが読み込まれた最初に一度だけ、データを「アルファベット順→五十音順」に並べ替える。
    if (typeof ingredientData !== 'undefined' && Array.isArray(ingredientData)) {
        ingredientData.sort((a, b) => {
            // localeCompare を使うと、数字・アルファベット・五十音の順で賢く並べてくれる
            return a.name.localeCompare(b.name, 'ja');
        });
    }

    // --- ↑↑↑ ここまでが変更箇所 ↑↑↑ ---


    const ingredientList = document.getElementById('ingredient-list');
    const searchBox = document.getElementById('search-box');
    const filterTagsContainer = document.getElementById('filter-tags');

    if (!filterTagsContainer || typeof ingredientData === 'undefined') {
        console.error("要素またはデータが見つかりません。");
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
            card.href = `ingredient.html?id=${ingredient.id}`;

            // カード内に表示するタグのHTMLを生成 (最大3つまで)
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
