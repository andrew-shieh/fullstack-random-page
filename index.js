/**
 * This project uses the Cloudflare Workers API to route users to one of two variants of a site (ostensibly for A/B
 * testing) returned from a fetched URL with equal probability. Also implements the first two extra credit features:
 * changing copy/URLs and persisting variants via cookies.
 *
 * The variants differ in their button color: one has a green button, the other has a blue button.
 *
 * @author: Andrew Shieh
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

class ElementHandler {
  element(element) {
    if (element.tagName === 'title') {
      element.setInnerContent('Andrew Shieh')
    } else if (element.tagName === 'h1') {
      element.setInnerContent('I (heart) Cloudflare')
    } else if (element.tagName === 'p') {
      element.setInnerContent("Hi I'm Andrew! You might have read my resume or seen this project, but I'll bet " +
                              "you've never heard my jokes before. I'll share one of my favorites with you: " +
                              "What do you call a fish with no eye? A fsh.")
    } else if (element.tagName === 'a') {
      element.setAttribute('href', 'https://andrew-shieh.github.io/')
      element.setInnerContent('Visit my personal site!')
    }
  }
}

/**
 * Fetch variant from cookie if it exists, or null otherwise
 * @param {Request} request
 */
function handleCookie(request) {
  let result = null
  let cookieString = request.headers.get('Cookie')
  if (cookieString) {
    let cookies = cookieString.split(';')
    cookies.forEach(cookie => {
      let thisCookie = cookie.split('=')
      if (thisCookie[0].trim() === 'variant') {
        result = thisCookie[1].trim()
      }
    })
  }
  console.log(result)
  return result
}

/**
 * Fetch variants and return the response to a fetch request to random variant
 * @param {Request} request
 */
async function handleRequest(request) {
  const response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
  const json = await response.json()
  const variants = json.variants

  let variant = handleCookie(request)
  if (variant === null) {
    variant = Math.round(Math.random())
  }

  let result = await fetch(variants[variant])
  result = new HTMLRewriter().on('*', new ElementHandler()).transform(result)
  result.headers.set('Set-Cookie', `variant=${variant}`)

  return result
}
