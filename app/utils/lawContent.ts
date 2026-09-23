export type LawLineType = 'xiang' | 'kuan' | 'mu'

export interface LawLine {
  type: LawLineType
  text: string
}

/**
 * 將法條內文依 \r\n 切割，逐行分類為項／款／目。
 * - 項：一般的行（無特殊編號開頭）
 * - 款：以「一、」這類中文數字開頭的行
 * - 目：以「（一）」這類括號中文數字開頭的行
 */
export function parseContent(content: string): LawLine[] {
  if (!content) return []
  return content.split(/\r\n|\n/).map((line) => {
    const t = line.trim()
    if (!t) return { type: 'xiang' as const, text: '' }
    if (/^（[一二三四五六七八九十]+）/.test(t)) return { type: 'mu' as const, text: t }
    if (/^[一二三四五六七八九十]+、/.test(t)) return { type: 'kuan' as const, text: t }
    return { type: 'xiang' as const, text: t }
  })
}

/**
 * 將條文轉為引用文字。
 * - 多項：`第779條規定，「（第1項）……（第2項）……」`
 * - 單項：`第1條規定，「……」`（不標項次，與頁面上單項不顯示項次編號一致）
 *
 * 項之劃分與畫面上的 `p.law-xiang` 相同；款、目併入其所屬之項。
 */
export function formatArticleCitation(no: string, content: string): string {
  const paragraphs: string[] = []
  for (const line of parseContent(content)) {
    if (!line.text) continue
    if (line.type === 'xiang' || paragraphs.length === 0) {
      paragraphs.push(line.text)
    } else {
      paragraphs[paragraphs.length - 1] += line.text
    }
  }

  const body =
    paragraphs.length > 1
      ? paragraphs.map((p, i) => `（第${i + 1}項）${p}`).join('')
      : (paragraphs[0] ?? '')

  return `${no}規定，「${body}」`
}
