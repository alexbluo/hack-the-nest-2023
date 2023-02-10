import useGradient from "../utils/useGradient";

interface Props {
  stat: string;
  caption: string;
}

const Stat = ({ stat, caption }: Props) => {
  return (
    <div className="h-48 w-full rounded-xl bg-white p-8 text-center text-transparent">
      <div className={`${useGradient()} bg-clip-text flex flex-col gap-4 justify-center items-center h-full`}>
        <h3 className="text-4xl font-semibold">{stat}</h3>
        <p className="">{caption}</p>
      </div>
    </div>
  );
};

export default Stat;
