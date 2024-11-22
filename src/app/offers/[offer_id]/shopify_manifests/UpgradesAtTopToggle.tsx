'use client'
export default function UpgradesAtTopToggle() {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value="true"
        id="upgradesFirst"
        onChange={() => {
          const upgradesFirstParam = new URLSearchParams(window.location.search).get('upgradesFirst')
          const nextUpgradesFirstParam = upgradesFirstParam === 'false' ? 'true' : 'false'
          window.location.search = new URLSearchParams({
            ...new URLSearchParams(window.location.search),
            upgradesFirst: nextUpgradesFirstParam,
          }).toString()
        }}
        defaultChecked={new URLSearchParams(window.location.search).get('upgradesFirst') !== 'false'}
      />
      <label className="form-check-label" htmlFor="upgradesFirst">
        Put best upgrades at the top
      </label>
    </div>
  )
}
