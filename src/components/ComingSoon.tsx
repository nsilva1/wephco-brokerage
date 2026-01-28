import { typography } from '../styles';

const ComingSoonCard = () => {
  return (
    <div className="w-full rounded-2xl p-5 flex flex-col gap-5 items-center justify-center">
      {/* <Lock className='text-amber-200 w-10 h-10' /> */}
      <p className={`${typography.h1} text-primary font-semibold tracking-wide leading-5`}>Coming Soon!!!</p>
    </div>
  );
};

export { ComingSoonCard };