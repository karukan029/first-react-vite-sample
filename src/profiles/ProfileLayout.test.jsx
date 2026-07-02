import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import ProfileLayout from './ProfileLayout'

// テスト用のサンプルデータ(1人分のプロフィール)
const sampleProfile = {
  id: 'test-taro',
  name: 'テスト 太郎',
  role: 'テストエンジニア',
  emoji: '🧪',
  location: '東京',
  tagline: 'テストを書くのが好きです',
  bio: ['1つ目の自己紹介文です。', '2つ目の自己紹介文です。'],
  skills: ['React', 'Vitest'],
  links: [{ label: 'GitHub', href: 'https://github.com/' }],
}

// テストごとに画面をリセットする
afterEach(cleanup)

describe('ProfileLayout(プロフィールページの共通レイアウト)', () => {
  it('名前が見出しとして表示される', () => {
    render(<ProfileLayout profile={sampleProfile} />)
    expect(
      screen.getByRole('heading', { level: 1, name: 'テスト 太郎' }),
    ).toBeDefined()
  })

  it('役割・勤務地・ひとことが表示される', () => {
    render(<ProfileLayout profile={sampleProfile} />)
    expect(screen.getByText('テストエンジニア')).toBeDefined()
    expect(screen.getByText('📍 東京')).toBeDefined()
    expect(screen.getByText('テストを書くのが好きです')).toBeDefined()
  })

  it('自己紹介文 (bio) がすべて表示される', () => {
    render(<ProfileLayout profile={sampleProfile} />)
    expect(screen.getByText('1つ目の自己紹介文です。')).toBeDefined()
    expect(screen.getByText('2つ目の自己紹介文です。')).toBeDefined()
  })

  it('自己紹介文 (bio) は配列でなく文字列1つでも表示できる', () => {
    const profile = { ...sampleProfile, bio: '文字列のままの自己紹介です。' }
    render(<ProfileLayout profile={profile} />)
    expect(screen.getByText('文字列のままの自己紹介です。')).toBeDefined()
  })

  it('スキルが一覧で表示される', () => {
    render(<ProfileLayout profile={sampleProfile} />)
    expect(screen.getByText('React')).toBeDefined()
    expect(screen.getByText('Vitest')).toBeDefined()
  })

  it('リンクが正しい URL で表示される', () => {
    render(<ProfileLayout profile={sampleProfile} />)
    const link = screen.getByRole('link', { name: 'GitHub' })
    expect(link.getAttribute('href')).toBe('https://github.com/')
  })

  it('任意項目(勤務地・ひとこと)が無い場合は表示されない', () => {
    const profile = { ...sampleProfile, location: undefined, tagline: undefined }
    render(<ProfileLayout profile={profile} />)
    expect(screen.queryByText(/📍/)).toBeNull()
    expect(screen.queryByText('テストを書くのが好きです')).toBeNull()
  })

  it('スキルとリンクが無い場合は Skills・Links セクションごと表示されない', () => {
    const profile = { ...sampleProfile, skills: [], links: [] }
    render(<ProfileLayout profile={profile} />)
    expect(screen.queryByRole('heading', { name: 'Skills' })).toBeNull()
    expect(screen.queryByRole('heading', { name: 'Links' })).toBeNull()
  })
})
