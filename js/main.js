// js/main.js (修正版)

document.addEventListener('DOMContentLoaded', () => {

    // データの並べ替え処理
    if (typeof ingredientData !== 'undefined' && Array.isArray(ingredientData)) {
        ingredientData.sort((a, b) => {
            return a.name.localeCompare(b.name, 'ja');
        });
    }

    // --- DOM要素の取得 ---
    const ingredientList = document.getElementById('ingredient-list');
    const searchBox = document.getElementById('search-box');
    const filterTagsContainer = document.getElementById('filter-tags');
    
    // --- ↓↓↓ モーダル関連の要素を取得 ↓↓↓ ---
    const modal = document.getElementById('ingredient-modal');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');
    // --- ↑↑↑ モーダル関連の要素を取得 ↑↑↑ ---

    // エラーチェック
    if (!ingredientList || !searchBox || !filterTagsContainer || !modal || !modalBody || !closeButton || typeof ingredientData === 'undefined') {
        console.error("必要なHTML要素またはデータが見つかりません。index.htmlの構造を確認してください。");
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

    // チェックボックス形式のタグを生成
    allTags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'filter-tag'; // CSSクラスを統一
        tagElement.innerHTML = `
            <input type="checkbox" id="tag-${tag}" value="${tag}" class="tag-checkbox">
            <label for="tag-${tag}">${tag}</label>
        `;
        filterTagsContainer.appendChild(tagElement);
    });
    
    // --- ↓↓↓ モーダル表示機能を追加 ↓↓↓ ---
    /**
     * モーダルの内容を生成して表示する関数
     * @param {object} ingredient - 表示する成分のオブジェクト
     */
    const showModal = (ingredient) => {
        // タグのHTMLを生成
        const tagsHtml = ingredient.tags.map(tag => `<span class="card-tag" style="background-color: #007bff;">${tag}</span>`).join('');
        
        // ★★★ [object Object] 問題を解決する核心部分 ★★★
        // products 配列から、name と link を使ってHTMLリストを生成する
        const productsHtml = ingredient.details.products.map(product => {
            if (!product.name) return ''; // 商品名がなければスキップ
            
            // リンク(product.link)があればaタグを、なければテキストのみのliタグを生成
            const content = product.link
                ? `<a href="${product.link}" target="_blank" rel="noopener noreferrer">${product.name}</a>`
                : product.name;
            return `<li>${content}</li>`;
        }).join('');

        // モーダルのbody部分のHTMLを組み立てる
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
        // モーダルを表示する
        modal.style.display = 'block';
    }
    // --- ↑↑↑ モーダル表示機能はここまで ↑↑↑ ---


    // 2. 成分リストをレンダリングする関数
    const renderList = (ingredients) => {
        ingredientList.innerHTML = '';
        if (ingredients.length === 0) {
            ingredientList.innerHTML = '<p class="no-results">該当する成分が見つかりませんでした。</p>';
            return;
        }

        ingredients.forEach(ingredient => {
            // --- ↓↓↓ aタグからdivタグに変更し、イベントリスナーでモーダルを開くように修正 ↓↓↓ ---
            const card = document.createElement('div'); // aタグからdivに変更
            card.className = 'ingredient-card';
            card.dataset.id = ingredient.id; // データ識別のためにIDをセット

            let tagsHTML = '';
            if (ingredient.tags && ingredient.tags.length > 0) {
                tagsHTML = `<div class="card-tags">` + 
                    ingredient.tags.slice(0, 3).map(tag => `<span>${tag}</span>`).join('') +
                `</div>`;
            }

            // card.innerHTML は元のままでOK
            card.innerHTML = `
                <div class="card-content">
                    <h3>${ingredient.name}</h3>
                    <p>${ingredient.summary}</p>
                </div>
                ${tagsHTML}
            `;
            
            // ★カードにクリックイベントを追加
            card.addEventListener('click', () => {
                const selectedIngredient = ingredientData.find(ing => ing.id === ingredient.id);
                if (selectedIngredient) {
                    showModal(selectedIngredient);
                }
            });
            // --- ↑↑↑ ここまでがカードクリック処理の修正 ---

            ingredientList.appendChild(card);
        });
    };

    // 3. フィルタリングとレンダリング（この関数は変更なし）
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

    // --- ↓↓↓ モーダルを閉じるイベントリスナーを追加 ↓↓↓ ---
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        // モーダルの外側をクリックした時に閉じる
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    // --- ↑↑↑ モーダルを閉じるイベントリスナーはここまで ↑↑↑ ---

    // 5. 初期表示
    filterAndRender();
});
