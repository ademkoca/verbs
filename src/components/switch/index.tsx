import AntSwitch from '../ant-switch';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CustomTooltip from '../tooltip';
interface Props {
  value: any;
  onChange: any;
  left?: string | undefined;
  right?: string | undefined;
  tooltip?: boolean | undefined;
}

const CustomSwitch = ({ value, onChange, left, right, tooltip }: Props) => {
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
      {tooltip && <CustomTooltip />}
    </Stack>
  );
};

export default CustomSwitch;
