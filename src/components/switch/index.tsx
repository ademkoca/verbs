import AntSwitch from '../ant-switch';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CustomTooltip from '../tooltip';
import { Option } from '../../types/interfaces';
interface Props {
  value: any;
  onChange: any;
  left?: string | undefined;
  right?: string | undefined;
  options?: Option[];
}

const CustomSwitch = ({ value, onChange, left, right, options }: Props) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>{left}</Typography>
      <AntSwitch
        // defaultChecked
        inputProps={{ 'aria-label': 'ant design' }}
        value={value}
        onChange={onChange}
      />
      <Typography>{right}</Typography>
      {options && <CustomTooltip options={options} />}
    </Stack>
  );
};

export default CustomSwitch;
