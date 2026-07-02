import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import App from './App'
import { profiles } from './profiles'

afterEach(cleanup)

describe('トップページ(プロフィール一覧)', () => {
  it('見出し「Members」が表示される', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Members' })).toBeDefined()
  })

  it('全メンバーのカードが表示される', () => {
    render(<App />)
    for (const profile of profiles) {
      expect(
        screen.getByText(profile.name),
        `${profile.name} さんのカードが一覧に表示されていません`,
      ).toBeDefined()
    }
  })

  it('カードをクリックするとプロフィールページに移動し、一覧に戻れる', () => {
    render(<App />)
    const first = profiles[0]

    // カードをクリック → 詳細ページに名前の見出しが出る
    fireEvent.click(screen.getByText(first.name))
    expect(
      screen.getByRole('heading', { level: 1, name: first.name }),
    ).toBeDefined()

    // 「一覧に戻る」をクリック → トップページに戻る
    fireEvent.click(screen.getByText('← 一覧に戻る'))
    expect(screen.getByRole('heading', { name: 'Members' })).toBeDefined()
  })
})
