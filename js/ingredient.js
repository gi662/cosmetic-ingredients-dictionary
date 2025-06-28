document.addEventListener('DOMContentLoaded', () => {
    // URLからパラメータを取得
    const params = new URLSearchParams(window.location.search);
    const ingredientId = params.get('id');

    // IDに合致する成分データを検索
    const ingredient = ingredientData.find(item => item.id === ingredientId);

    if (ingredient) {
        // ページタイトルを更新
        document.title = `${ingredient.name} | 美容成分辞典`;

        // データをHTMLに反映
        document.getElementById('ingredient-name').textContent = ingredient.name;
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
        // 成分が見つからなかった場合
        const detailContainer = document.getElementById('ingredient-detail');
        detailContainer.innerHTML = '<h2>成分が見つかりません</h2><p><a href="index.html">トップページに戻る</a></p>';
    }
});
