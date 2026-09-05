export function heading (target, replacement, form) {
  form.content.forEach(function (element) {
    if (typeof element === 'object') {
      if (Object.hasOwn(element, 'form')) {
        ensure(element, 'heading', target, replacement)
        heading(target, replacement, element.form)
      } else {
        ensure(element, 'reference', target, replacement)
      }
    }
  })
}

export function term (target, replacement, form) {
  form.content.forEach(function (element) {
    if (typeof element === 'object') {
      if (Object.hasOwn(element, 'form')) {
        term(target, replacement, element.form)
      } else {
        ensure(element, 'use', target, replacement)
        ensure(element, 'definition', target, replacement)
      }
    }
  })
}

function ensure (object, key, target, replacement) {
  const isMatch = (
    Object.hasOwn(object, key) &&
    object[key] === target
  )
  if (isMatch) {
    object[key] = replacement
  }
}
