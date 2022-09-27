import React from 'react';
import { IMaskInput } from 'react-imask';

interface MaskNumberProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const MaskNumber = React.forwardRef<HTMLElement, MaskNumberProps>(
  function MaskNumber(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask={/^(\d+)(|,\s*\d+)*(|,|, )$/}
        inputRef={ref as any}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  },
);
export default MaskNumber;
