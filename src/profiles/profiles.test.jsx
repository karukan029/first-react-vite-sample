import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { profiles } from './index'

// src/profiles/ 配下のプロフィールファイル(1ファイル=1人)をすべて読み込む。
// レイアウト部品の ProfileLayout.jsx は検証対象から除外する。
// 新しいプロフィールファイルを追加すると、自動的にこのテストの検証対象になる。
const modules = import.meta.glob(['./*.jsx', '!**/ProfileLayout.jsx'], {
  eager: true,
})

afterEach(cleanup)

describe.each(Object.entries(modules))('プロフィールファイル %s', (file, mod) => {
  it('プロフィール情報 (export const profile) が定義されている', () => {
    expect(
      mod.profile,
      `${file} に「export const profile = { ... }」が見つかりません`,
    ).toBeDefined()
  })

  it('ページコンポーネント (export default) が定義されている', () => {
    expect(
      mod.default,
      `${file} に「export default function ...」が見つかりません`,
    ).toBeDefined()
  })

  it('必須項目 (id・name・role・emoji) がすべて入力されている', () => {
    for (const field of ['id', 'name', 'role', 'emoji']) {
      expect(
        mod.profile?.[field],
        `${file} のプロフィールに「${field}」が入力されていません`,
      ).toBeTruthy()
    }
  })

  it('リンクには label と href の両方が入力されている', () => {
    for (const link of mod.profile?.links ?? []) {
      expect(
        link.label,
        `${file} のリンクに「label」(表示名) がありません`,
      ).toBeTruthy()
      expect(
        link.href,
        `${file} のリンク「${link.label}」の href は http(s):// で始まるURLにしてください`,
      ).toMatch(/^https?:\/\//)
    }
  })

  it('プロフィールページが表示できて、名前が見出しに出る', () => {
    const Page = mod.default
    render(<Page />)
    expect(
      screen.getByRole('heading', { level: 1, name: mod.profile.name }),
      `${file} のページを表示しても名前 (${mod.profile?.name}) が見出しに出ません`,
    ).toBeDefined()
  })
})

describe('プロフィール一覧', () => {
  it('1人以上のプロフィールが登録されている', () => {
    expect(profiles.length).toBeGreaterThan(0)
  })

  it('id が全員分ユニーク(重複なし)になっている', () => {
    const ids = profiles.map((profile) => profile.id)
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index)
    expect(
      duplicates,
      `id が重複しています: ${duplicates.join(', ')}。他の人と違う id をつけてください`,
    ).toEqual([])
  })

  it('すべてのプロフィールファイルが一覧に反映されている', () => {
    expect(profiles.length).toBe(Object.keys(modules).length)
  })
})
