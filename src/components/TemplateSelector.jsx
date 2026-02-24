import './TemplateSelector.css';

function TemplateSelector({ selectedTemplate, onTemplateChange }) {
  const templates = ['classic', 'modern', 'minimal'];

  return (
    <div className="template-selector">
      {templates.map(template => (
        <button
          key={template}
          className={`template-btn ${selectedTemplate === template ? 'active' : ''}`}
          onClick={() => onTemplateChange(template)}
        >
          {template.charAt(0).toUpperCase() + template.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default TemplateSelector;
