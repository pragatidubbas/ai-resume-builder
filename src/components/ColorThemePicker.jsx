import './ColorThemePicker.css';

const COLORS = [
  { id: 'teal', name: 'Teal', hsl: '168, 60%, 40%' },
  { id: 'navy', name: 'Navy', hsl: '220, 60%, 35%' },
  { id: 'burgundy', name: 'Burgundy', hsl: '345, 60%, 35%' },
  { id: 'forest', name: 'Forest', hsl: '150, 50%, 30%' },
  { id: 'charcoal', name: 'Charcoal', hsl: '0, 0%, 25%' }
];

function ColorThemePicker({ selectedColor, onColorChange }) {
  return (
    <div className="color-theme-picker">
      <h3 className="picker-label">Color Theme</h3>
      <div className="color-options">
        {COLORS.map(color => (
          <button
            key={color.id}
            className={`color-option ${selectedColor === color.id ? 'active' : ''}`}
            onClick={() => onColorChange(color.id)}
            title={color.name}
            style={{ '--color-hsl': color.hsl }}
          >
            <span 
              className="color-circle"
              style={{ backgroundColor: `hsl(${color.hsl})` }}
            />
            <span className="color-name">{color.name}</span>
            {selectedColor === color.id && (
              <span className="color-checkmark">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColorThemePicker;
