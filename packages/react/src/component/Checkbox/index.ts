import CheckboxComponent from "./Checkbox";
import CheckboxGroup from "./Group";
const Checkbox = CheckboxComponent as typeof CheckboxComponent & {
  CheckboxGroup: typeof CheckboxGroup;
};
Checkbox.CheckboxGroup = CheckboxGroup;
export default Checkbox;
