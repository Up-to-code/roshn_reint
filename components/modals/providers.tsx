"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

// Create the context for modal state
export const ModalContext = createContext<{
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}>({
  setShowSignInModal: () => {},
});

// A simple provider that manages showSignInModal state and provides it
export function ModalProvider({ children }: { children: ReactNode }) {
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <ModalContext.Provider value={{ setShowSignInModal }}>
      {children}
      {/* Optionally render SignInModal here if you have it, e.g.: */}
      {/* {showSignInModal && <SignInModal onClose={() => setShowSignInModal(false)} />} */}
    </ModalContext.Provider>
  );
}

