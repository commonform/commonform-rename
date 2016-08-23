/* Copyright 2016 Kyle E. Mitchell
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you
 * may not use this file except in compliance with the License. You may
 * obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 * implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

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
