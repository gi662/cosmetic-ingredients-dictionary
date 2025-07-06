document.addEventListener('DOMContentLoaded', () => {

    // --- DOM要素の取得 ---
    const searchBox = document.getElementById('search-box');
    const filterTagsContainer = document.getElementById('filter-tags');
    const ingredientListContainer = document.getElementById('ingredient-list');
    const listTitle = document.getElementById('list-title');

    // モーダル関連の要素
    const modal = document.getElementById('ingredient-modal');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');


    let currentFilterTag = 'all'; // 現在選択中の絞り込みタグ

    /**
     * 成分カードのHTMLを生成する
     * @param {object} ingredient - 成分データ
     * @returns {string} - 成分カードのHTML文字列
     */
    function createIngredientCard(ingredient) {
        const tagsHtml = ingredient.tags.slice(0, 3).map(tag => `<span class="card-tag">${tag}</span>`).join('');
        return `
            <div class="ingredient-card" data-id="${ingredient.id}">
                <h3 class="card-title">${ingredient.name}</h3>
                <div class="card-tags">${tagsHtml}</div>
                <p class="card-summary">${ingredient.summary}</p>
            </div>
        `;
    }

    /**
     * モーダルの内容を生成して表示する
     * @param {object} ingredient - 成分データ
     */
    function showModal(ingredient) {
        const tagsHtml = ingredient.tags.map(tag => `<span class="card-tag" style="background-color: #007bff;">${tag}</span>`).join('');
        
        // ★[object Object]問題を解決する部分★
        const productsHtml = ingredient.details.products.map(product => {
            if (!product.name) return '';
            // リンクがあればaタグを、なければliタグのみを生成
            const linkContent = product.link 
                ? `<a href="${product.link}" target="_blank" rel="noopener noreferrer">${product.name}</a>`
                : product.name;
            return `<li>${linkContent}</li>`;
        }).join('');

        modalBody.innerHTML = `
            <h2 class="card-title">${ingredient.name}</h2>
            <div class="card-tags">${tagsHtml}</div>
            <p>${ingredient.summary}</p>
            
            <h3>使い方</h3>
            <p>${ingredient.details.usage}</p>

            <h3>注意点</h3>
            <p>${ingredient.details.cautions}</p>

            <h3>副作用</h3>
            <p>${ingredient.details.sideEffects}</p>

            <h3>関連商品</h3>
            <ul class="product-list">
                ${productsHtml || '<li>関連商品情報はありません。</li>'}
            </ul>
        `;
        modal.style.display = 'block';
    }

    /**
     * フィルタリングと検索を行い、成分リストを再描画する
     */
    function filterAndRender() {
        const searchTerm = searchBox.value.toLowerCase();

        // フィルタリング処理
        const filteredIngredients = ingredientData.filter(ingredient => {
            // タグでの絞り込み
            const tagMatch = currentFilterTag === 'all' || ingredient.tags.includes(currentFilterTag);
            // 検索ワードでの絞り込み（成分名 or サマリー）
            const searchMatch = ingredient.name.toLowerCase().includes(searchTerm) ||
                                ingredient.summary.toLowerCase().includes(searchTerm);
            return tagMatch && searchMatch;
        });

        // 描画処理
        ingredientListContainer.innerHTML = filteredIngredients.map(createIngredientCard).join('');
        listTitle.textContent = `成分一覧 (${filteredIngredients.length}件)`;

        // カードにクリックイベントを再度設定
        document.querySelectorAll('.ingredient-card').forEach(card => {
            card.addEventListener('click', () => {
                const ingredientId = card.dataset.id;
                const selectedIngredient = ingredientData.find(ing => ing.id === ingredientId);
                if (selectedIngredient) {
                    showModal(selectedIngredient);
                }
            });
        });
    }

    /**
     * 絞り込み用のタグボタンを生成する
     */
    function createFilterTags() {
        const allTags = new Set();
        ingredientData.forEach(ing => ing.tags.forEach(tag => allTags.add(tag)));

        let tagsHtml = `<span class="filter-tag active" data-tag="all">すべて</span>`;
        allTags.forEach(tag => {
            tagsHtml += `<span class="filter-tag" data-tag="${tag}">${tag}</span>`;
        });
        filterTagsContainer.innerHTML = tagsHtml;

        // タグボタンにクリックイベントを設定
        document.querySelectorAll('.filter-tag').forEach(tagEl => {
            tagEl.addEventListener('click', () => {
                // 他のタグのアクティブ状態を解除
                document.querySelectorAll('.filter-tag').forEach(el => el.classList.remove('active'));
                // クリックしたタグをアクティブにする
                tagEl.classList.add('active');
                currentFilterTag = tagEl.dataset.tag;
                filterAndRender(); // 再描画
            });
        });
    }

    // --- イベントリスナーの設定 ---
    searchBox.addEventListener('input', filterAndRender);

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // --- 初期化処理 ---
    createFilterTags(); // 絞り込みタグを生成
    filterAndRender();  // 初期表示
});
