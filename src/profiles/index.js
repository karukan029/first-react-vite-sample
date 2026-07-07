// src/profile/ 配下の各ファイル(1ファイル=1人)をまとめて読み込む。
// 新しいプロフィールファイルを追加すれば、自動的に一覧へ反映される。
// ※ ProfileLayout.jsx のような `profile` を export しないファイルは除外する。
// ※ テストファイル(*.test.jsx)を読み込むと vitest がブラウザ用バンドルに
//    混入してアプリが起動しなくなるため、`!` パターンで除外する。
const modules = import.meta.glob(['./*.jsx', '!./*.test.jsx'], { eager: true })

export const profiles = Object.values(modules)
  .filter((mod) => mod.profile && mod.default)
  .map((mod) => ({
    ...mod.profile,
    Page: mod.default,
  }))
  // name が未入力のファイルがあってもアプリ全体が落ちないようにしておく
  .sort((a, b) => String(a.name ?? '').localeCompare(String(b.name ?? ''), 'ja'))

export function getProfile(id) {
  return profiles.find((profile) => profile.id === id)
}
