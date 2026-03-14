// Número do WhatsApp (remova caracteres especiais)
export const WHATSAPP_NUMBER = '5543999998888'

// Gerar mensagem do WhatsApp
export function generateWhatsAppMessage(cartItems) {
  if (!cartItems || cartItems.length === 0) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de mais informações sobre seus produtos.`
  }

  let message = `Olá! Gostaria de fazer um pedido.\n\n*ITENS DO PEDIDO:*\n`

  cartItems.forEach((item) => {
    message += `- ${item.name} (Qt: ${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}\n`
  })

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )
  message += `\n*TOTAL: R$ ${total.toFixed(2)}*\n\n`
  message += `Por favor, confirme a disponibilidade e as formas de pagamento.`

  // Codificar mensagem para URL
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

// Enviar para WhatsApp
export function sendToWhatsApp(cartItems) {
  const url = generateWhatsAppMessage(cartItems)
  window.open(url, '_blank')
}

// Formatar moeda brasileira
export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
