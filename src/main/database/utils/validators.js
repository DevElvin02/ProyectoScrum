// Validadores comunes para los modelos

// Validar RUC peruano (11 dígitos)
export const isValidRUC = (ruc) => {
  if (!ruc) return false
  if (ruc.length !== 11) return false
  if (!/^\d+$/.test(ruc)) return false
  return true
}

// Validar número de teléfono
export const isValidPhone = (phone) => {
  if (!phone) return false
  return /^\d{8}$/.test(phone) //  dígitos para El salvador
}

// Validar precio
export const isValidPrice = (price) => {
  if (price === null || price === undefined) return false
  if (isNaN(price)) return false
  return price >= 0
}

// Validar stock
export const isValidStock = (stock) => {
  if (stock === null || stock === undefined) return false
  if (!Number.isInteger(stock)) return false
  return stock >= 0
}

// Validar email
export const isValidEmail = (email) => {
  if (!email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validar fecha
export const isValidDate = (date) => {
  if (!date) return false
  const dateObj = new Date(date)
  return dateObj instanceof Date && !isNaN(dateObj)
}

// Validar monto de pago
export const isValidPayment = (amount, total) => {
  if (!isValidPrice(amount)) return false
  if (!isValidPrice(total)) return false
  return amount <= total
}

// Validar código (alfanumérico)
export const isValidCode = (code) => {
  if (!code) return false
  return /^[A-Za-z0-9-]+$/.test(code)
}