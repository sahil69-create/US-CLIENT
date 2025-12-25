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
    const message = document.querySelector('#message')?.value?.trim() || ''
    const container = document.querySelector('#contact')
    const to = container?.getAttribute('data-email') || ''
    if (!to) return
    const subject = encodeURIComponent('Project Inquiry')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
  })
}
