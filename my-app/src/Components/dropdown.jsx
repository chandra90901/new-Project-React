import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const Dropdown = ({ value, onChange }) => {
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="w-[200px]">{value || 'Select an option'}</SelectTrigger>
            <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default Dropdown;