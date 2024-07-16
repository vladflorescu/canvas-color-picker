import { RefObject, createContext, createRef } from 'react';

export type CanvasRefContextType = RefObject<HTMLCanvasElement>;

const CanvasRefContext = createContext<CanvasRefContextType>(createRef());

export default CanvasRefContext;
