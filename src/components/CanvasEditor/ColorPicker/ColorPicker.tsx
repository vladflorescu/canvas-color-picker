import './ColorPicker.css';
import colorPickerIcon from '/src/assets/IconColorPicker.svg';
import { useColorPicker } from './state';
import clsx from 'clsx';

export default function ColorPicker() {
  const { isActive, setIsActive, value } = useColorPicker();

  return (
    <div className="color-picker">
      <button
        className={clsx('color-picker__button', isActive && 'color-picker__button--active')}
        onClick={() => { setIsActive(b => !b); }}
        aria-label="pick color"
      >
        <img src={colorPickerIcon} aria-hidden />
      </button>

      {value && (
        <output className="color-picker__output">
          <span>{value}</span>
          <span className="color-picker__output-sample" aria-hidden style={{ backgroundColor: value }} />
        </output>
      )}
    </div>
  );
}
