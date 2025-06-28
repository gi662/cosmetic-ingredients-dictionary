// js/ingredient.js (更新版)

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const ingredientId = params.get('id');
    const ingredient = ingredientData.find(item => item.id === ingredientId);

    if (ingredient) {
        document.title = `${ingredient.name} | 美容成分辞典`;

        document.getElementById('ingredient-name').textContent = ingredient.name;
        
        // --- ↓↓↓ ここからが変更箇所 ↓↓↓ ---
        // 詳細ページにタグを表示する処理
        const tagsContainer = document.getElementById('ingredient-tags-detail');
        if (ingredient.tags && ingredient.tags.length > 0) {
            ingredient.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'detail-tag';
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });
        }
        // --- ↑↑↑ ここまでが変更箇所 ↑↑↑ ---

        document.getElementById('ingredient-usage').textContent = ingredient.details.usage;
        document.getElementById('ingredient-cautions').textContent = ingredient.details.cautions;
        document.getElementById('ingredient-side-effects').textContent = ingredient.details.sideEffects;

        const productList = document.getElementById('ingredient-products');
        ingredient.details.products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = product;
            productList.appendChild(li);
        });

    } else {
        const detailContainer = document.getElementById('ingredient-detail');
        detailContainer.innerHTML = '<h2>成分が見つかりません</h2><p><a href="index.html">トップページに戻る</a></p>';
    }
});
