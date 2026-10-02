import { RefObject } from 'react';
import { flushSync } from 'react-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const LETTERS = ['ä', 'ö', 'ü', 'ß'];

export interface UmlautTarget {
  ref: RefObject<HTMLInputElement>;
  value: string;
  setValue: (value: string) => void;
}

// Buttons for German letters, for keyboards that don't have them.
// The letter goes into the focused field (or the first one) at the cursor position.
const UmlautKeys = ({ targets, disabled }: { targets: UmlautTarget[]; disabled?: boolean }) => {
  const insert = (letter: string) => {
    const target =
      targets.find((t) => t.ref.current === document.activeElement) ?? targets[0];
    const input = target?.ref.current;
    if (!target || !input) return;
    const start = input.selectionStart ?? target.value.length;
    const end = input.selectionEnd ?? start;
    // update the field synchronously so the cursor can be placed right away;
    // a delayed cursor move would land in the middle of anything typed meanwhile
    flushSync(() => target.setValue(target.value.slice(0, start) + letter + target.value.slice(end)));
    input.focus();
    input.setSelectionRange(start + letter.length, start + letter.length);
  };

  return (
    <Stack direction="row" spacing={1} mt={1} aria-label="Insert German letters">
      {LETTERS.map((letter) => (
        <Button
          key={letter}
          size="small"
          variant="outlined"
          disabled={disabled}
          sx={{ minWidth: 40, textTransform: 'none' }}
          // keep focus (and the phone keyboard) in the text field
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => insert(letter)}
          aria-label={`Insert ${letter}`}
        >
          {letter}
        </Button>
      ))}
    </Stack>
  );
};

export default UmlautKeys;
