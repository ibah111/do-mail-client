import { subject } from '@casl/ability';
import { useAbility } from '@casl/react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Action, Subject } from '../../../../casl/casl.factory';
import { IDataIncoming } from '../../../../casl/casl.types';
import { AbilityContext } from '../../../../Context/Ability';
import { useAppDispatch, useAppSelector } from '../../../../Reducer';
import { setArhive } from '../../../../Reducer/Stater';
import { ArhiveType } from '../../../../Types/dataIncoming';
interface IArhive {
  name: string;
  value: number;
  condition: IDataIncoming;
}
const arhives: IArhive[] = [
  { name: 'Нет', value: 0, condition: { arhive: [ArhiveType.NO] } },
  { name: 'Документы', value: 1, condition: { arhive: [ArhiveType.ARHIVE] } },
  {
    name: 'Исполнительные документы',
    value: 2,
    condition: { arhive: [ArhiveType.ARHIVE_LAW_EXEC] },
  },
];
export default function ChangerArhiveType() {
  const arhive = useAppSelector((state) => state.Stater.ArhiveType);
  const dispatch = useAppDispatch();
  const ability = useAbility(AbilityContext);
  return (
    <>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id={'label-arhive'}>Архив</InputLabel>
        <Select
          labelId="label-arhive"
          label="Архив"
          value={arhive}
          size="small"
          onChange={(event) => {
            dispatch(setArhive(Number(event.target.value) as ArhiveType));
          }}
        >
          {arhives
            .filter((item) =>
              ability.can(
                Action.Read,
                subject(Subject.DataIncoming, item.condition),
              ),
            )
            .map((value) => (
              <MenuItem key={value.value} value={value.value}>
                {value.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
}
