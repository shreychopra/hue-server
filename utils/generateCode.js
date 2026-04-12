// Generates a random 6-character room code
// Excludes ambiguous characters: 0, O, 1, I
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function generateCode() {
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)]
  }
  return code
}

module.exports = { generateCode }