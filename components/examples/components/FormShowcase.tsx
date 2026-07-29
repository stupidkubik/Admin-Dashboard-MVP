export type FormField = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  component?: "input" | "textarea";
};

export type FormControl = {
  id: string;
  label: string;
  type: "checkbox" | "radio";
  name?: string;
};

type FormShowcaseProps = {
  title?: string;
  fields: FormField[];
  controls?: FormControl[][];
};

export default function FormShowcase({
  title = "Form Elements",
  fields,
  controls = [],
}: FormShowcaseProps) {
  return (
    <section className="section-container">
      <h2 className="heading-2 mb-6">{title}</h2>
      <form className="space-y-6">
        {fields.map(
          ({ id, label, type = "text", placeholder, component = "input" }) => (
            <div key={id} className="form-group">
              <label className="form-label" htmlFor={id}>
                {label}
              </label>
              {component === "textarea" ? (
                <textarea
                  id={id}
                  className="control-textarea"
                  placeholder={placeholder}
                />
              ) : (
                <input
                  id={id}
                  type={type}
                  className="control-input"
                  placeholder={placeholder}
                />
              )}
            </div>
          ),
        )}

        {controls.length > 0 && (
          <div className="flex flex-wrap items-center gap-4">
            {controls.map((group, groupIndex) => (
              <div
                key={`control-group-${groupIndex}`}
                className="flex items-center space-x-2"
              >
                {group.map(({ id, label, type, name }) => (
                  <label key={id} className="flex items-center space-x-2">
                    <input
                      id={id}
                      type={type}
                      name={name ?? (type === "radio" ? "option" : id)}
                      className={
                        type === "checkbox" ? "form-checkbox" : "form-radio"
                      }
                    />
                    <span className="form-label">{label}</span>
                  </label>
                ))}
              </div>
            ))}
          </div>
        )}
      </form>
    </section>
  );
}
