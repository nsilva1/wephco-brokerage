import { typography } from '../styles';
import learning1 from '../assets/images/learning1.jpg'

const ComingSoonCard = () => {
  return (
    <div className="w-full rounded-2xl p-5 flex flex-col gap-5 items-center justify-center">
      <img src={learning1} alt='Learning Center' className='' />
      <p className={`${typography.h1} text-primary font-semibold tracking-wide leading-5 mt-10`}>Coming Soon!!!</p>
    </div>
  );
};

export { ComingSoonCard };