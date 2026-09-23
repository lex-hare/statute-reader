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
