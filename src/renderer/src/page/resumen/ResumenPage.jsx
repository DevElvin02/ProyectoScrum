import { BarChart3, DollarSign, Package, ShoppingCart, Users } from "lucide-react"

export default function ResumenPage() {
  // En una aplicación real, estos datos vendrían de una API
  const stats = {
    totalClientes: 24,
    totalProductos: 150,
    totalPedidos: 89,
    ingresos: 15680.5,
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clientes"
          value={stats.totalClientes}
          icon={<Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          subtitle="+2 desde el último mes"
        />
        <StatCard
          title="Total Productos"
          value={stats.totalProductos}
          icon={<Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          subtitle="+15 desde el último mes"
        />
        <StatCard
          title="Total Pedidos"
          value={stats.totalPedidos}
          icon={<ShoppingCart className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          subtitle="+12 desde la semana pasada"
        />
        <StatCard
          title="Ingresos"
          value={`$${stats.ingresos.toLocaleString("es-ES", { minimumFractionDigits: 2 })}`}
          icon={<DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          subtitle="+8% desde el mes pasado"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm lg:col-span-4">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium">Ventas Recientes</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Resumen de ventas de los últimos 30 días</p>
          </div>
          <div className="p-4 pl-2">
            <div className="h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
              <BarChart3 className="h-16 w-16 text-gray-400" />
              <span className="ml-2 text-gray-500 dark:text-gray-400">Gráfico--ventas</span>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm lg:col-span-3">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium">Pedidos Recientes</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Últimos pedidos realizados</p>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                    <ShoppingCart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pedido #{1000 + i}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Cliente: Cliente {i}</p>
                  </div>
                  <div className="text-sm font-medium">${(Math.random() * 1000).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon, subtitle }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h4>
          {icon}
        </div>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
    </div>
  )
}

