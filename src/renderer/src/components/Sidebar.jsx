"use client"
import { X, Users, Package, ShoppingCart, Truck, Home } from "lucide-react"

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>

        {/* Sidebar panel */}
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-indigo-700">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Cerrar sidebar</span>
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <span className="text-white text-xl font-bold">SGP</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              <SidebarLink icon={<Home />} text="Dashboard" active={false} />
              <SidebarLink icon={<Users />} text="Clientes" active={false} />
              <SidebarLink icon={<Package />} text="Productos" active={false} />
              <SidebarLink icon={<ShoppingCart />} text="Pedidos" active={false} />
              <SidebarLink icon={<Truck />} text="Proveedores" active={true} />
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex-1 flex flex-col min-h-0 bg-indigo-700">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <span className="text-white text-xl font-bold">SGP</span>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                <SidebarLink icon={<Home />} text="Dashboard" active={false} />
                <SidebarLink icon={<Users />} text="Clientes" active={false} />
                <SidebarLink icon={<Package />} text="Productos" active={false} />
                <SidebarLink icon={<ShoppingCart />} text="Pedidos" active={false} />
                <SidebarLink icon={<Truck />} text="Proveedores" active={true} />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const SidebarLink = ({ icon, text, active }) => {
  return (
    <a
      href="#"
      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        active ? "bg-indigo-800 text-white" : "text-indigo-100 hover:bg-indigo-600"
      }`}
    >
      <div className="mr-3 h-6 w-6">{icon}</div>
      {text}
    </a>
  )
}

export default Sidebar

