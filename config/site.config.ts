// ============================================================
// 站台／團隊資訊設定檔
//
// 專案名稱、團隊名稱與對外連結統一在此定義，
// 供 AppHeader、Footer、頁面與 nuxt.config 等處引用，避免散落各處。
// ============================================================

export const siteConfig = {
  /** 專案名稱（站台標題） */
  projectName: '雲端法條本',
  /** 團隊名稱 */
  teamName: 'LexHare',
  /** 團隊首頁 */
  teamHomepage: 'https://lex-hare.github.io',
  /** 專案原始碼（GitHub repo） */
  repoUrl: 'https://github.com/lex-hare/statute-reader',
} as const
