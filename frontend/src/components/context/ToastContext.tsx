import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast, { ToastType } from "../Home/Toast";

interface ToastContextType {
  showToast: (type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState({
    visible: false,
    type: "success" as ToastType,
    message: "",
  });

  const showToast = (type: ToastType, message: string) => {
    setToast({ visible: true, type, message });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast visible={toast.visible} 
      type={toast.type}
      message={toast.message}
        onHide={() => setToast({ ...toast, visible: false })}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};