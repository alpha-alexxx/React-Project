import React from 'react';

const Notification = ({ show, title, desc, color }) => {
  return (
    <div
      style={{ opacity: show ? '1' : '0', left: show ? '50%' : '-30%' }}
      className="notification"
    >
      <span className="notification-title" style={{ color: color }}>
        {title}
      </span>
      {' : '}
      <span className="notification-desc">{desc}</span>
    </div>
  );
};

export default Notification;
