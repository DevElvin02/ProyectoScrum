"use client"

import { useState } from 'react';
import NotificationSettings from './components/notification-settings';
import PendingOrders from './components/pending-orders';
import UrgentOrders from './components/urgent-orders';

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Notificaciones</h1>
      
      <div className="flex space-x-4 mb-6">
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('pending')}
        >
          Pedidos Pendientes
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'urgent' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('urgent')}
        >
          Urgentes
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'settings' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('settings')}
        >
          Configuración
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'pending' && <PendingOrders />}
        {activeTab === 'urgent' && <UrgentOrders />}
        {activeTab === 'settings' && <NotificationSettings />}
      </div>
    </div>
  );
};

export default NotificationPage;
