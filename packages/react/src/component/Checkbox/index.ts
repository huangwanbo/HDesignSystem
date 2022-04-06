import CheckboxComponent from "./Checkbox";
import CheckboxGroup from "./Group";
import useCheckbox, { resultType } from "./UseCheckbox";
const Checkbox = CheckboxComponent as typeof CheckboxComponent & {
  CheckboxGroup: typeof CheckboxGroup;
  useCheckbox: <T>(values: T[], defaultValues: T[]) => resultType<T>
};
Checkbox.CheckboxGroup = CheckboxGroup;
Checkbox.useCheckbox = useCheckbox;
export default Checkbox;
