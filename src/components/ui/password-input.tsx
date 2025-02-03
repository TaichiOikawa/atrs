import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Input } from './input';

type PasswordInputProps = {
  InputOptions?: object;
  hidden: boolean;
  toggleHidden: () => void;
};

const iconClasses = 'size-4 text-gray-400';

export default function PasswordInput({ InputOptions, hidden, toggleHidden }: PasswordInputProps) {
  return (
    <div className="flex">
      <Input {...InputOptions} type={hidden ? 'password' : 'text'} />
      <button
        className="m-1 rounded px-1.5 transition hover:bg-gray-100 focus-visible:outline-none"
        onClick={toggleHidden}
        tabIndex={-1}
        type="button"
      >
        {hidden ? <EyeOpenIcon className={iconClasses} /> : <EyeNoneIcon className={iconClasses} />}
      </button>
    </div>
  );
}
