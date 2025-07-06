document.addEventListener('DOMContentLoaded', () => {

    // --- 0. データの並べ替え ---
    // ページ読み込み時に、成分データを五十音順に並べ替える
    if (typeof ingredientData !== 'undefined' && Array.isArray(ingredientData)) {
        ingredientData.sort((a, b) => {
            return a.name.localeCompare(b.name, 'ja');
        });
    }

    // --- 1. HTML要素の取得 ---
    const ingredientList = document.getElementById('ingredient-list');
    const searchBox = document.getElementById('search-box');
    const filterTagsContainer = document.getElementById('filter-tags');

    // 必要な要素が見つからない場合は、処理を中断してエラーを記録
    if (!ingredientList || !searchBox || !filterTagsContainer || typeof ingredientData === 'undefined') {
        console.error("エラー: 必要なHTML要素、またはingredientDataが見つかりません。ID名やファイルパスを確認してください。");
        return;
    }

    // --- 2. 状態変数の定義 ---
    let currentQuery = '';      // 現在の検索キーワード
    let selectedTags = [];      // 現在選択されているタグの配列

    // --- 3. 絞り込みタグの動的な生成 ---
    const allTags = new Set();
    ingredientData.forEach(item => {
        // 安全のため、item.tagsが存在し、かつ配列であることを確認
        if (item.tags && Array.isArray(item.tags)) {
            item.tags.forEach(tag => allTags.add(tag));
        }
    });

    // Setから配列に変換し、ソートしてからHTMLを生成
    Array.from(allTags).sort().forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'filter-tag';
        tagElement.innerHTML = `
            <input type="checkbox" id="tag-${tag}" value="${tag}" class="tag-checkbox">
            <label for="tag-${tag}">${tag}</label>
        `;
        filterTagsContainer.appendChild(tagElement);
    });

    // --- 4. 成分リストを描画する関数 ---
    const renderList = (ingredients) => {
        ingredientList.innerHTML = ''; // 一旦リストを空にする

        if (ingredients.length === 0) {
            ingredientList.innerHTML = '<p class="no-results">該当する成分が見つかりませんでした。</p>';
            return;
        }

        ingredients.forEach(ingredient => {
            const card = document.createElement('a');
            card.className = 'ingredient-card';
            card.href = `ingredient.html?id=${ingredient.id}`; // 詳細ページへのリンク

            // カードに表示するタグ（3つまで）のHTMLを生成
            const tagsHTML = (ingredient.tags && ingredient.tags.length > 0)
                ? `<div class="card-tags">${ingredient.tags.slice(0, 3).map(tag => `<span>${tag}</span>`).join('')}</div>`
                : '';

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

    // --- 5. フィルタリングと描画をまとめて実行する関数 ---
    const filterAndRender = () => {
        const filteredIngredients = ingredientData.filter(ingredient => {
            // 検索キーワードに一致するかどうか
            const matchesQuery = currentQuery === '' || 
                ingredient.name.toLowerCase().includes(currentQuery) ||
                (ingredient.summary && ingredient.summary.toLowerCase().includes(currentQuery));
            
            // 選択された全てのタグに一致するかどうか
            const matchesTags = selectedTags.length === 0 || 
                selectedTags.every(tag => ingredient.tags && ingredient.tags.includes(tag));
            
            return matchesQuery && matchesTags;
        });

        renderList(filteredIngredients);
    };

    // --- 6. イベントリスナーの設定 ---
    // 検索ボックスの入力イベント
    searchBox.addEventListener('input', (e) => {
        currentQuery = e.target.value.toLowerCase().trim();
        filterAndRender();
    });

    // タグコンテナ内のチェックボックス変更イベント（イベント委譲）
    filterTagsContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('tag-checkbox')) {
            selectedTags = Array.from(document.querySelectorAll('.tag-checkbox:checked'))
                .map(checkbox => checkbox.value);
            filterAndRender();
        }
    });

    // --- 7. 初期表示の実行 ---
    // ページ読み込み時に、全件表示を実行
    filterAndRender();
});
