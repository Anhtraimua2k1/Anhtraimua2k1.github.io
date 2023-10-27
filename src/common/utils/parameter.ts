export const getQueryParam = (key: string) => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    return urlSearchParams.get(key)
  }
  
  export const addQueryParam = (key: string, value: string) => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    urlSearchParams.set(key, value)
    const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`
    window.history.pushState({ path: newUrl }, '', newUrl)
  }
  
  export const removeQueryParam = (keyToRemove: string) => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const updatedSearchParams = new URLSearchParams()
    for (const [key, value] of urlSearchParams.entries()) {
      if (key !== keyToRemove) {
        updatedSearchParams.append(key, value)
      }
    }
    const newUrl = `${window.location.pathname}?${updatedSearchParams.toString()}`
    window.history.pushState({ path: newUrl }, '', newUrl)
  }