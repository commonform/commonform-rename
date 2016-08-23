module.exports = function rename (type, target, replacement, form) {
  if (type === 'heading') {
    renameHeading(target, replacement, form)
  } else if (type === 'term') {
    renameTerm(target, replacement, form)
  } else {
    throw new Error('Invalid type "' + type + '"')
  }
}

function renameHeading (target, replacement, form) {
  form.content.forEach(function (element) {
    if (typeof element === 'object') {
      if (element.hasOwnProperty('form')) {
        ensure(element, 'heading', target, replacement)
        renameHeading(target, replacement, element.form)
      } else {
        ensure(element, 'reference', target, replacement)
      }
    }
  })
}

function renameTerm (target, replacement, form) {
  form.content.forEach(function (element) {
    if (typeof element === 'object') {
      if (element.hasOwnProperty('form')) {
        renameTerm(target, replacement, element.form)
      } else {
        ensure(element, 'use', target, replacement)
        ensure(element, 'definition', target, replacement)
      }
    }
  })
}

function ensure (object, key, target, replacement) {
  var isMatch = (
    object.hasOwnProperty(key) &&
    object[key] === target
  )
  if (isMatch) {
    object[key] = replacement
  }
}
