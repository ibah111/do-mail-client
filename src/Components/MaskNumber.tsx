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
        mask="(#00) 000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        {...other}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  },
);
export default MaskNumber;
