const toggle = document.querySelector('.nav-toggle')
const menu = document.querySelector('#nav-menu')
const yearEl = document.querySelector('#year')
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true'
    toggle.setAttribute('aria-expanded', (!expanded).toString())
    menu.classList.toggle('show')
  })
}
if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString()
}
const contactForm = document.querySelector('#contactForm')
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = document.querySelector('#name')?.value?.trim() || ''
    const email = document.querySelector('#email')?.value?.trim() || ''
    const phone = document.querySelector('#phone')?.value?.trim() || ''
    const country = document.querySelector('#country')?.value || ''
    const budget = document.querySelector('#budget')?.value || ''
    const topic = document.querySelector('#topic')?.value || ''
    const message = document.querySelector('#message')?.value?.trim() || ''
    const container = document.querySelector('#contact')
    const to = container?.getAttribute('data-email') || ''
    const gs = container?.getAttribute('data-gs-endpoint') || ''
    if (!to) return
    const payload = {
      name, email, phone, country, budget, topic, message,
      source: 'portfolio'
    }
    const subject = encodeURIComponent('Project Inquiry')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCountry: ${country}\nBudget: ${budget}\nTopic: ${topic}\n\n${message}`)
    const fallback = () => {
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
    }
    if (gs) {
      fetch(gs, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(() => {
        contactForm.reset()
        alert('Thanks! Your message has been sent.')
      }).catch(() => {
        fallback()
      })
    } else {
      fallback()
    }
  })
}

document.documentElement.setAttribute('data-theme', 'dark')

const revealSelectors = [
  '[data-reveal]',
  '.section-head',
  '.card',
  '.chip',
  '.footer-inner'
]
const revealEls = document.querySelectorAll(revealSelectors.join(','))
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    }
  })
}, { threshold: 0.12 })
const parentBuckets = new Map()
revealEls.forEach((el) => {
  el.classList.add('reveal')
  const parent = el.parentElement
  if (parent) {
    const list = parentBuckets.get(parent) || []
    list.push(el)
    parentBuckets.set(parent, list)
  }
  io.observe(el)
})
parentBuckets.forEach((list) => {
  list.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 300, 140)}ms`
  })
})
