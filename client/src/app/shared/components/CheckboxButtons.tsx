
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
  items: string[];
  checked: string[];
  onChange: (checked: string[]) => void;
};

export default function CheckboxButtons({ items, checked, onChange }: Props) {
  const [checkedItems, setCheckedItems] = useState(checked);

  useEffect(() => {
    setCheckedItems(checkedItems);
  }, [checkedItems]);

  const handleToggle = (value: string) => {
    const updatedCheckedItems = checkedItems.includes(value)
      ? checkedItems.filter((item) => item !== value)
      : [...checkedItems, value];
    setCheckedItems(updatedCheckedItems);
    onChange(updatedCheckedItems);
  };

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel 
          key={item}
          control={<Checkbox 
            checked={checkedItems.includes(item)} 
            color="secondary"
            sx={{py:0.7, fontSize: 40}}
            onChange={() => handleToggle(item)} />}
          label={item}
        />
      ))}
    </FormGroup>
  );
}
