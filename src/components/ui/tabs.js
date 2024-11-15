import React, { useState } from 'react';

const TabsContext = React.createContext(null);

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children }) => {
  return (
    <div className="flex border-b border-gray-200">
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, children }) => {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`py-2 px-4 text-sm font-medium ${
        activeTab === value
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }) => {
  const { activeTab } = React.useContext(TabsContext);

  if (activeTab !== value) return null;

  return <div className="mt-4">{children}</div>;
};