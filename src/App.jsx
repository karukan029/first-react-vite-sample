import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { profiles, getProfile } from './profiles'
import './App.css'

function App() {
  // 選択中のプロフィールID。null のときはトップページ(一覧)を表示する。
  const [selectedId, setSelectedId] = useState(null)
  const selected = selectedId ? getProfile(selectedId) : null

  // プロフィール詳細ページ
  if (selected) {
    const { Page } = selected
    return (
      <>
        <button
          type="button"
          className="profile-back"
          onClick={() => setSelectedId(null)}
        >
          ← 一覧に戻る
        </button>
        <Page />
      </>
    )
  }

  // トップページ(プロフィール一覧)
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Members</h1>
          <p>気になるメンバーを選んでプロフィールを見てみましょう</p>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="profiles">
        <h2>Profiles</h2>
        <ul className="profile-list">
          {profiles.map((profile) => (
            <li key={profile.id}>
              <button
                type="button"
                className="profile-card"
                onClick={() => setSelectedId(profile.id)}
              >
                <span className="profile-card-avatar" aria-hidden="true">
                  {profile.emoji}
                </span>
                <span>
                  <span className="profile-card-name">{profile.name}</span>
                  <br />
                  <span className="profile-card-role">{profile.role}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
