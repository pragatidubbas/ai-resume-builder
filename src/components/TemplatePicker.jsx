import './TemplatePicker.css';

const TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional single-column'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Two-column with sidebar'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, no borders'
  }
];

function TemplatePicker({ selectedTemplate, onTemplateChange }) {
  return (
    <div className="template-picker">
      <h3 className="picker-label">Template</h3>
      <div className="template-options">
        {TEMPLATES.map(template => (
          <button
            key={template.id}
            className={`template-option ${selectedTemplate === template.id ? 'active' : ''}`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className={`template-thumbnail template-thumbnail-${template.id}`}>
              {template.id === 'classic' && (
                <div className="thumb-classic">
                  <div className="tc-header"></div>
                  <div className="tc-line"></div>
                  <div className="tc-section"></div>
                  <div className="tc-line"></div>
                  <div className="tc-section"></div>
                </div>
              )}
              {template.id === 'modern' && (
                <div className="thumb-modern">
                  <div className="tm-sidebar">
                    <div className="tm-sb-block"></div>
                    <div className="tm-sb-block"></div>
                  </div>
                  <div className="tm-content">
                    <div className="tm-ct-block"></div>
                    <div className="tm-ct-block"></div>
                  </div>
                </div>
              )}
              {template.id === 'minimal' && (
                <div className="thumb-minimal">
                  <div className="tmi-header"></div>
                  <div className="tmi-spacer"></div>
                  <div className="tmi-text"></div>
                  <div className="tmi-spacer"></div>
                  <div className="tmi-text"></div>
                </div>
              )}
            </div>
            <div className="template-info">
              <span className="template-name">{template.name}</span>
              <span className="template-desc">{template.description}</span>
            </div>
            {selectedTemplate === template.id && (
              <div className="checkmark">✓</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplatePicker;
