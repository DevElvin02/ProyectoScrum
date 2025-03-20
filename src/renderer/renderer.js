const { ipcRenderer } = require('electron')

document.getElementById('cargarPedidos').addEventListener('click', async () => {
  const pedidos = await ipcRenderer.invoke('get-pedidos')
  const lista = document.getElementById('listaPedidos')
  lista.innerHTML = ''

  pedidos.forEach((pedido) => {
    const item = document.createElement('li')
    item.textContent = `Pedido #${pedido.id} - Cliente: ${pedido.cliente_id} - Total: $${pedido.total} - Estado: ${pedido.estado}`
    lista.appendChild(item)
  })
})
