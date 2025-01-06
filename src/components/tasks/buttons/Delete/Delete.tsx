type Props = {
  changeVDelete: () => void;
};

export const Delete: React.FC<Props> = ({ changeVDelete }) => (
  <input type="checkbox" onChange={() => changeVDelete()} />
);