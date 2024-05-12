type Props = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

const NoResult = ({ description, title, children }: Props) => {
  return (
    <div className="mt-10 flex w-full flex-col items-center justify-center">
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>
      <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
        {description}
      </p>
      <div>{children}</div>
    </div>
  );
};
export default NoResult;
