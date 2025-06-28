document.addEventListener('DOMContentLoaded', () => {
    const ingredientList = document.getElementById('ingredient-list');
    const searchBox = document.getElementById('search-box');
    const filterTagsContainer = document.getElementById('filter-tags');

    // データや要素が見つからない場合のエラーハンドリング
    if (!filterTagsContainer || typeof ingredientData === 'undefined') {
        console.error("絞り込みタグのコンテナ、または成分データが見つかりません。");
        if (filterTagsContainer) {
            filterTagsContainer.innerHTML = '<p style="color: red;">エラー: 成分データの読み込みに失敗しました。js/data.jsを確認してください。</p>';
        }
        return;
    }

    let currentQuery = '';
    let selectedTags = [];

    // 1. 絞り込み用のタグ（チェックボックス）を動的に生成
    const allTags = new Set();
    ingredientData.forEach(item => {
        if (item.tags && Array.isArray(item.tags)) { // item.tagsが存在し、配列であることを確認
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
            ingredientList.innerHTML = '<p>該当する成分が見つかりませんでした。</p>';
            return;
        }

        ingredients.forEach(ingredient => {
            const card = document.createElement('a');
            card.className = 'ingredient-card';
            card.href = `ingredient.html?id=${ingredient.id}`;
            card.innerHTML = `
                <h3>${ingredient.name}</h3>
                <p>${ingredient.summary}</p>
            `;
            ingredientList.appendChild(card);
        });
    };

    // 3. 検索と絞り込みを両方考慮して表示を更新する関数
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

    // 4. イベントリスナーを設定
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
