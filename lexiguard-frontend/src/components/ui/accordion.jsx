import React, { useState, createContext, useContext } from "react";

// Context to manage open state
const AccordionContext = createContext();

// Accordion wrapper
export function Accordion({ children, type = "single", collapsible = true, className }) {
  const [openItem, setOpenItem] = useState(null);

  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem, type, collapsible }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
}

// Accordion item
export function AccordionItem({ children, value }) {
  const { openItem, setOpenItem, collapsible } = useContext(AccordionContext);
  const isOpen = openItem === value;

  const toggle = () => {
    if (isOpen) {
      collapsible && setOpenItem(null);
    } else {
      setOpenItem(value);
    }
  };

  return React.Children.map(children, (child) =>
    React.cloneElement(child, { isOpen, toggle })
  );
}

// Trigger button
export function AccordionTrigger({ children, toggle, className }) {
  return (
    <button
      onClick={toggle}
      className={`w-full text-left py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

// Content panel
export function AccordionContent({ children, isOpen, className }) {
  return isOpen ? (
    <div className={`px-4 pb-4 ${className}`}>
      {children}
    </div>
  ) : null;
}
