// js/detail.js
document.addEventListener('DOMContentLoaded', () => {
    const detailContainer = document.getElementById('ingredient-detail');

    if (!detailContainer || typeof ingredientData === 'undefined') {
        console.error("詳細表示用の要素またはデータが見つかりません。");
        return;
    }

    // 1. URLから成分IDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const ingredientId = urlParams.get('id');

    if (!ingredientId) {
        detailContainer.innerHTML = '<h2>成分が指定されていません。</h2><p><a href="./index.html">一覧に戻る</a></p>';
        return;
    }

    // 2. IDに合致する成分データを検索
    const ingredient = ingredientData.find(item => item.id === ingredientId);

    // 3. 成分が見つからない場合の処理
    if (!ingredient) {
        detailContainer.innerHTML = '<h2>指定された成分が見つかりませんでした。</h2><p><a href="./index.html">一覧に戻る</a></p>';
        return;
    }

    // 4. HTMLを生成して描画
    const tagsHtml = ingredient.tags.map(tag => `<span class="detail-tag">${tag}</span>`).join('');

    const productsHtml = ingredient.details.products.map(product => {
        if (!product.name) return '';
        const content = product.link
            ? `<a href="${product.link}" target="_blank" rel="noopener noreferrer">${product.name}</a>`
            : product.name;
        return `<li>${content}</li>`;
    }).join('');

    detailContainer.innerHTML = `
        <h2>${ingredient.name}</h2>
        <div id="ingredient-tags-detail">${tagsHtml}</div>
        
        <p style="text-align: center; font-size: 1.1rem; color: var(--color-text-light); padding: 20px 0;">${ingredient.summary}</p>
        
        <section>
            <h3>使い方</h3>
            <p>${ingredient.details.usage}</p>
        </section>

        <section>
            <h3>注意点</h3>
            <p>${ingredient.details.cautions}</p>
        </section>

        <section>
            <h3>副作用</h3>
            <p>${ingredient.details.sideEffects}</p>
        </section>

        <section>
            <h3>関連商品</h3>
            <ul>
                ${productsHtml || '<li>関連商品情報はありません。</li>'}
            </ul>
        </section>
    `;
    
    // ページタイトルを成分名に更新
    document.title = `${ingredient.name} - 美容成分辞典`;
});
