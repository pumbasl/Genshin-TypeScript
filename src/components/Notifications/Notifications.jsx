import React from 'react';
import { Toast } from 'react-bootstrap';

import { useToaster } from "react-hot-toast";

export default function Notifications() {
    const { toasts } = useToaster();
    return (
      <div
        style={{
          position: 'fixed',
          top: 60,
          right: 0,
          zIndex: 99999
        }}
        >
        {toasts.map((toast) => (
          <Toast 
            delay={3000}
            autohide
            key={toast.id}
          >
            <Toast.Body>
                {toast.message}
            </Toast.Body>
          </Toast>
        ))}
      </div>
    );
};