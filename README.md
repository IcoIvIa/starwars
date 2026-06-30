# Star Wars Databank Search

スター・ウォーズの登場人物や生物・乗り物・組織などを検索できるReactアプリです。
複数の外部APIを並行で取得し、キャラクター/エンティティ別に絞り込み検索できます。

🔗 **[Demo: https://icoivia.github.io/starwars/](https://icoivia.github.io/starwars/)**

## 主な機能

- キーワード検索によるキャラクター(人物・クリーチャー・ドロイド・種族)とエンティティ(場所・組織・乗り物)の絞り込み
- 複数エンドポイントのページネーションをまとめて取得するカスタムフック(`useFetchData`)
- 検索結果から個別の詳細情報を表示
- 詳細説明文(英語)をワンクリックで日本語に自動翻訳する機能
- `useReducer`による検索〜結果表示〜詳細表示までの画面状態管理

## 技術構成

- React
- データ取得: [Star Wars Databank API](https://starwars-databank-server.onrender.com/)
- 翻訳: [MyMemory Translation API](https://mymemory.translated.net/)
- 状態管理: useReducer + カスタムフック