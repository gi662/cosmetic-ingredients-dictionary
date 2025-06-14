// 美容成分データベース
const ingredientsData = [
    {
        id: 'retinol',
        name: 'レチノール',
        category: 'anti-aging',
        categoryName: 'エイジングケア',
        description: 'ビタミンAの一種で、シワやシミの改善に効果的。肌のターンオーバーを促進し、コラーゲン生成をサポートします。',
        fileName: 'retinol.html'
    },
    {
        id: 'niacinamide',
        name: 'ナイアシンアミド',
        category: 'brightening',
        categoryName: '美白',
        description: 'ビタミンB3誘導体。毛穴の改善、皮脂コントロール、シミの予防に効果があります。',
        fileName: 'niacinamide.html'
    },
    {
        id: 'hyaluronic-acid',
        name: 'ヒアルロン酸',
        category: 'moisturizing',
        categoryName: '保湿',
        description: '優れた保水力を持つ成分。肌の水分保持を助け、ふっくらとした肌に導きます。',
        fileName: 'hyaluronic-acid.html'
    },
    {
        id: 'salicylic-acid',
        name: 'サリチル酸',
        category: 'acne',
        categoryName: 'ニキビケア',
        description: 'BHA（ベータヒドロキシ酸）の一種。毛穴の詰まりを除去し、ニキビの予防と改善に効果的。',
        fileName: 'salicylic-acid.html'
    },
    {
        id: 'vitamin-c',
        name: 'ビタミンC',
        category: 'brightening',
        categoryName: '美白',
        description: '強力な抗酸化作用を持ち、メラニン生成を抑制。シミの予防とコラーゲン生成促進に効果的。',
        fileName: 'vitamin-c.html'
    },
    {
        id: 'ceramide',
        name: 'セラミド',
        category: 'moisturizing',
        categoryName: '保湿',
        description: '肌のバリア機能を構成する重要な成分。水分蒸発を防ぎ、外部刺激から肌を守ります。',
        fileName: 'ceramide.html'
    },
    {
        id: 'glycolic-acid',
        name: 'グリコール酸',
        category: 'anti-aging',
        categoryName: 'エイジングケア',
        description: 'AHA（アルファヒドロキシ酸）の一種。古い角質を除去し、肌のターンオーバーを促進します。',
        fileName: 'glycolic-acid.html'
    },
    {
        id: 'peptides',
        name: 'ペプチド',
        category: 'anti-aging',
        categoryName: 'エイジングケア',
        description: 'アミノ酸が結合した化合物。コラーゲン生成を促進し、シワの改善に効果的です。',
        fileName: 'peptides.html'
    },
    {
        id: 'arbutin',
        name: 'アルブチン',
        category: 'brightening',
        categoryName: '美白',
        description: 'メラニン生成を抑制する美白成分。シミやそばかすの予防に効果があります。',
        fileName: 'arbutin.html'
    },
    {
        id: 'collagen',
        name: 'コラーゲン',
        category: 'moisturizing',
        categoryName: '保湿',
        description: '肌の弾力とハリを保つ重要なタンパク質。保湿効果も高く、エイジングケアに有効です。',
        fileName: 'collagen.html'
    },
    {
        id: 'benzoyl-peroxide',
        name: '過酸化ベンゾイル',
        category: 'acne',
        categoryName: 'ニキビケア',
        description: '強力な殺菌作用を持つニキビ治療成分。アクネ菌を減少させ、炎症を抑制します。',
        fileName: 'benzoyl-peroxide.html'
    },
    {
        id: 'zinc-oxide',
        name: '酸化亜鉛',
        category: 'acne',
        categoryName: 'ニキビケア',
        description: '抗炎症作用と皮脂吸収効果があります。日焼け止めとしても使用される安全な成分です。',
        fileName: 'zinc-oxide.html'
    },
    {
        id: 'kojic-acid',
        name: 'コウジ酸',
        category: 'brightening',
        categoryName: '美白',
        description: '麹から抽出される美白成分。メラニン生成を抑制し、シミの改善に効果的です。',
        fileName: 'kojic-acid.html'
    },
    {
        id: 'squalane',
        name: 'スクワラン',
        category: 'moisturizing',
        categoryName: '保湿',
        description: '軽やかなテクスチャーで高い保湿効果を持つオイル。肌馴染みが良く、べたつきません。',
        fileName: 'squalane.html'
    },
    {
        id: 'lactic-acid',
        name: '乳酸',
        category: 'anti-aging',
        categoryName: 'エイジングケア',
        description: 'AHAの一種で、グリコール酸より刺激が少ない。角質除去と保湿効果があります。',
        fileName: 'lactic-acid.html'
    },
    {
        id: 'bakuchiol',
        name: 'バクチオール',
        category: 'anti-aging',
        categoryName: 'エイジングケア',
        description: '植物由来のレチノール代替成分。妊娠中でも使用可能で、敏感肌にも優しいです。',
        fileName: 'bakuchiol.html'
    },
    {
        id: 'tranexamic-acid',
        name: 'トラネキサム酸',
        category: 'brightening',
        categoryName: '美白',
        description: '肝斑の改善に特に効果的な美白成分。炎症を抑制し、メラニン生成を阻害します。',
        fileName: 'tranexamic-acid.html'
    },
    {
        id: 'panthenol',
        name: 'パンテノール',
        category: 'moisturizing',
        categoryName: '保湿',
        description: 'プロビタミンB5。保湿効果と抗炎症作用があり、敏感肌にも優しい成分です。',
        fileName: 'panthenol.html'
    },
    {
        id: 'tea-tree-oil',
        name: 'ティーツリーオイル',
        category: 'acne',
        categoryName: 'ニキビケア',
        description: '天然の殺菌・抗炎症成分。ニキビの原因菌を抑制し、肌荒れを改善します。',
        fileName: 'tea-tree-oil.html'
    },
    {
        id: 'azelaic-acid',
        name: 'アゼライン酸',
        category: 'acne',
        categoryName: 'ニキビケア',
        description: '毛穴の詰まりを解消し、色素沈着の改善にも効果的。敏感肌でも使いやすい成分です。',
        fileName: 'azelaic-acid.html'
    }
];

// カテゴリー情報
const categoryInfo = {
    'anti-aging': {
        name: 'エイジングケア',
        description: 'シワ、たるみ、弾力低下などの年齢サインに対応する成分'
    },
    'brightening': {
        name: '美白',
        description: 'シミ、くすみの予防・改善、透明感向上に効果的な成分'
    },
    'moisturizing': {
        name: '保湿',
        description: '肌の水分保持、バリア機能強化に働く成分'
    },
    'acne': {
        name: 'ニキビケア',
        description: 'ニキビの予防・改善、皮脂コントロールに効果的な成分'
    }
};

// 成分データをカテゴリー別に取得する関数
function getIngredientsByCategory(category) {
    if (category === 'all') {
        return ingredientsData;
    }
    return ingredientsData.filter(ingredient => ingredient.category === category);
}

// 成分IDから成分データを取得する関数
function getIngredientById(id) {
    return ingredientsData.find(ingredient => ingredient.id === id);
}

// 検索用の関数
function searchIngredients(searchTerm) {
    const term = searchTerm.toLowerCase();
    return ingredientsData.filter(ingredient => 
        ingredient.name.toLowerCase().includes(term) ||
        ingredient.description.toLowerCase().includes(term) ||
        ingredient.categoryName.toLowerCase().includes(term)
    );
}