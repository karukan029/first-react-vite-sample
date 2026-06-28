import './profile.css'

// 各プロフィールページで共通して使うレイアウト。
// 1人分のデータ(profile)を受け取り、ヘッダー・自己紹介・スキル・リンクを描画する。
function ProfileLayout({ profile }) {
  const { name, role, emoji, location, tagline, bio, skills = [], links = [] } =
    profile

  const paragraphs = Array.isArray(bio) ? bio : [bio]

  return (
    <article className="profile">
      <header className="profile-header">
        <div className="profile-avatar" aria-hidden="true">
          {emoji}
        </div>
        <div>
          <h1>{name}</h1>
          <p className="profile-role">{role}</p>
          {location && <p className="profile-location">📍 {location}</p>}
          {tagline && <p className="profile-tagline">{tagline}</p>}
        </div>
      </header>

      {paragraphs.length > 0 && (
        <section className="profile-section">
          <h2>About</h2>
          {paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="profile-section">
          <h2>Skills</h2>
          <ul className="profile-skills">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {links.length > 0 && (
        <section className="profile-section">
          <h2>Links</h2>
          <ul className="profile-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}

export default ProfileLayout
