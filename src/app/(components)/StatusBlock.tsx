type Props = {
  status: string;
};

const StatusBlock = ({ status }: Props) => {
  const getColor = () => {
    switch (status.toLowerCase()) {
      case "Completed":
        return "green";

      case "Started":
        return "orange";

      case "Not Started":
        return "red";

      default:
        return "gray";
    }
  };

  return (
    <span
      style={{ background: getColor() }}
      className="inline-block rounded-full px-2 py-1 font-semibold text-xs"
    >
      {status}
    </span>
  );
};

export default StatusBlock;
