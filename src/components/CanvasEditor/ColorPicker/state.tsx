import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from 'react';

export type ColorPickerContextType = {
  isActive: boolean;
  value: string | null;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string | null>>;
};

export const ColorPickerContext = createContext<ColorPickerContextType | null>(null);

export function ColorPickerProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const contextValue = useMemo(() => ({
    isActive, value, setIsActive, setValue,
  }), [isActive, value]);

  return (
    <ColorPickerContext.Provider value={contextValue}>
      {children}
    </ColorPickerContext.Provider>
  );
}

export function useColorPicker() {
  const contextValue = useContext(ColorPickerContext);

  if (contextValue === null) {
    throw new Error('Component has to be wrapped into a ColorPickerProvider');
  }

  return contextValue;
}
