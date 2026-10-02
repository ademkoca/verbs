import AntSwitch from '../ant-switch';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CustomTooltip from '../tooltip';
import { Option } from '../../types/interfaces';
interface Props {
  value: boolean;
  onChange: () => void;
  left?: string;
  right?: string;
  options?: Option[];
  justify?: string;
}

const CustomSwitch = ({
  value,
  onChange,
  left,
  right,
  options,
  justify,
}: Props) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent={justify}
    >
      {left && <Typography>{left}</Typography>}
      <AntSwitch
        checked={value}
        inputProps={{ 'aria-label': [left, right].filter(Boolean).join(' / ') }}
        onChange={onChange}
      />
      {right && <Typography>{right}</Typography>}
      {options && <CustomTooltip options={options} />}
    </Stack>
  );
};

export default CustomSwitch;
