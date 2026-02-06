"use client";
import { FiAlertTriangle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { createContext, useContext, useState } from "react";

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => () => {});
  const [onCancel, setOnCancel] = useState(() => () => {});

  const requestConfirm = (msg, onYes, onNo = () => {}) => {
    setMessage(msg);
    setOnConfirm(() => onYes);
    setOnCancel(() => onNo);
    setIsOpen(true);
  };

  const confirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const cancel = () => {
    onCancel();
    setIsOpen(false);
  };

  return (
    <ConfirmContext.Provider value={{ requestConfirm }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-[90%] md:w-[25vw] text-center shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center text-center">
                <FiAlertTriangle className="text-yellow-500 text-4xl mb-3" />
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  Are you sure?
                </p>
                <p className="text-gray-600 mb-6 text-sm">{message}</p>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={confirm}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                  onClick={cancel}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);
