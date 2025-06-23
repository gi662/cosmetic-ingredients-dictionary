// メイン機能のJavaScript

let currentFilter = 'all';
let currentSearchTerm = '';

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
    // 成分データが読み込まれているかチェック
    if (typeof ingredientsData === 'undefined') {
        console.error('成分データが読み込まれていません');
        return;
    }
    
    // 初期表示
    displayIngredients(ingredientsData);
    
    // イベントリスナーの設定
    setupEventListeners();
    
    // トップに戻るボタンの初期化
    initBackToTop();
});

// イベントリスナーの設定
function setupEventListeners() {
    // 検索機能
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // リアルタイム検索（オプション）
        searchInput.addEventListener('input', debounce(performSearch, 300));
    }
    
    // フィルター機能
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // アクティブボタンの切り替え
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.dataset.category;
            filterIngredients();
        });
    });
}

// 成分表示関数
function displayIngredients(ingredients) {
    const grid = document.getElementById('ingredientsGrid');
    const noResults = document.getElementById('noResults');
    
    if (!grid) return;
    
    if (ingredients.length === 0) {
        grid.innerHTML = '';
        if (noResults) {
            noResults.style.display = 'block';
        }
        return;
    }
    
    if (noResults) {
        noResults.style.display = 'none';
    }
    
    grid.innerHTML = ingredients.map(ingredient => `
        <a href="ingredient/${ingredient.fileName}" class="ingredient-card">
            <h3 class="ingredient-name">${escapeHtml(ingredient.name)}</h3>
            <span class="ingredient-category">${escapeHtml(ingredient.categoryName)}</span>
            <p class="ingredient-description">${escapeHtml(ingredient.description)}</p>
        </a>
    `).join('');
    
    // カードにアニメーション効果を追加
    const cards = grid.querySelectorAll('.ingredient-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 検索機能
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    currentSearchTerm = searchInput.value.toLowerCase().trim();
    
    let filtered = ingredientsData;
    
    // 検索条件を適用
    if (currentSearchTerm) {
        filtered = searchIngredients(currentSearchTerm);
    }
    
    // フィルターを適用
    displayIngredients(applyCurrentFilter(filtered));
    
    // 検索結果をハイライト
    highlightSearchTerm(currentSearchTerm);
}

// フィルター機能
function filterIngredients() {
    let filtered = ingredientsData;
    
    // 検索条件を適用
    if (currentSearchTerm) {
        filtered = searchIngredients(currentSearchTerm);
    }
    
    displayIngredients(applyCurrentFilter(filtered));
}

// 現在のフィルターを適用
function applyCurrentFilter(ingredients) {
    if (currentFilter === 'all') {
        return ingredients;
    }
    
    return ingredients.filter(ingredient => ingredient.category === currentFilter);
}

// HTMLエスケープ関数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// デバウンス関数（連続実行を防ぐ）
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 検索語のハイライト機能
function highlightSearchTerm(term) {
    if (!term) return;
    
    const cards = document.querySelectorAll('.ingredient-card');
    cards.forEach(card => {
        const name = card.querySelector('.ingredient-name');
        const description = card.querySelector('.ingredient-description');
        
        if (name) {
            name.innerHTML = highlightText(name.textContent, term);
        }
        if (description) {
            description.innerHTML = highlightText(description.textContent, term);
        }
    });
}

// テキストハイライト関数
function highlightText(text, term) {
    if (!term) return escapeHtml(text);
    
    const escapedText = escapeHtml(text);
    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    return escapedText.replace(regex, '<mark>$1</mark>');
}

// 正規表現エスケープ
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// トップに戻るボタンの初期化
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;
    
    // スクロールイベント
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // クリックイベント
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ページ遷移時のローディング効果
function showLoading() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        