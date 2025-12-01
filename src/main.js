import './style.css'

// Small vanilla JS to wire up interactions on the self-intro page
document.addEventListener('DOMContentLoaded', () => {
  const resumeBtn = document.querySelector('#download-resume')
  const toggleBtn = document.querySelector('#toggle-theme')
  const body = document.body
  const hero = document.querySelector('.hero')

  // add decorative blurred shapes (keeps HTML clean)
  const shapes = document.createElement('div')
  shapes.className = 'bg-shapes'
  shapes.innerHTML = '<div class="shape p1"></div><div class="shape p2"></div>'
  hero && hero.appendChild(shapes)

  // resume download — generate a small example resume (text) and download
  resumeBtn && resumeBtn.addEventListener('click', () => {
    // generate a minimal resume using only the information provided by the user
    const resume = `정은서\n기술교사\n근무지: 신양중학교\n주소: 서울 신양중학교\n\n관심사:\n- 마이크로비트 활용 피지컬 컴퓨팅\n- 데이터 리터러시 수업\n`

    const blob = new Blob([resume], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resume_정은서.txt'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  })

  // toggle background animation on/off
  if (toggleBtn) {
    // initial label depending on current state
    const isPaused = getComputedStyle(body).animationPlayState === 'paused' || body.style.animationPlayState === 'paused'
    toggleBtn.textContent = isPaused ? '배경 애니메이션 켜기' : '배경 애니메이션 끄기'
    toggleBtn.addEventListener('click', () => {
      const paused = body.style.animationPlayState === 'paused'
      body.style.animationPlayState = paused ? 'running' : 'paused'
      toggleBtn.textContent = paused ? '배경 애니메이션 끄기' : '배경 애니메이션 켜기'
    })
  }

  // gentle reveal animation for hero content
  if (hero) {
    requestAnimationFrame(() => hero.classList.add('animate'))
  }
})
