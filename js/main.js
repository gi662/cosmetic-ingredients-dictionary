// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    const ingredientList = document.getElementById('ingredient-list');
    const searchBox = document.getElementById('search-box');
    const filterTagsContainer = document.getElementById('filter-tags');

    let currentQuery = '';
    let selectedTags = [];

    // --- 1. 絞り込み用のタグ（チェックボックス）を動的に生成 ---
    // data.jsから全てのタグを重複なく取得する
    const allTags = new Set();
    ingredientData.forEach(item => {
        if (item.tags) {
            item.tags.forEach(tag => allTags.add(tag));
        }
    });

    // 取得したタグからチェックボックスを作成してHTMLに追加
    allTags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'filter-tag';
        tagElement.innerHTML = `
            <input type="checkbox" id="tag-${tag}" value="${tag}" class="tag-checkbox">
            <label for="tag-${tag}">${tag}</label>
        `;
        filterTagsContainer.appendChild(tagElement);
    });

    // --- 2. 成分リストをレンダリングする関数 ---
    const renderList = (ingredients) => {
        ingredientList.innerHTML = ''; // 一旦リストを空にする
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

    // --- 3. 検索と絞り込みを両方考慮して表示を更新する関数 ---
    const filterAndRender = () => {
        const filteredIngredients = ingredientData.filter(ingredient => {
            // 条件1: 検索ボックスの文字列に一致するか
            const matchesQuery = (
                ingredient.name.toLowerCase().includes(currentQuery) ||
                ingredient.summary.toLowerCase().includes(currentQuery)
            );

            // 条件2: 選択された全てのタグを含んでいるか
            const matchesTags = selectedTags.every(tag => 
                ingredient.tags && ingredient.tags.includes(tag)
            );

            // 両方の条件を満たすものだけを返す
            return matchesQuery && matchesTags;
        });

        renderList(filteredIngredients);
    };

    // --- 4. イベントリスナーを設定 ---
    // 検索ボックスに入力があった時
    searchBox.addEventListener('input', (e) => {
        currentQuery = e.target.value.toLowerCase();
        filterAndRender();
    });

    // タグのチェックボックスの状態が変わった時
    filterTagsContainer.addEventListener('change', () => {
        selectedTags = Array.from(document.querySelectorAll('.tag-checkbox:checked'))
                            .map(checkbox => checkbox.value);
        filterAndRender();
    });

    // --- 5. 初期表示 ---
    // ページ読み込み時に全成分を表示
    filterAndRender();
});
