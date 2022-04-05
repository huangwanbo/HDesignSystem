import RadioComponent from './Radio';
import RadioGroup from './RadioGroup';
const Radio = RadioComponent as typeof RadioComponent & {
    RadioGroup: typeof RadioGroup
}
Radio.RadioGroup = RadioGroup
export default Radio;