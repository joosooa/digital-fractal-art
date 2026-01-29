import DataStream from '@/components/DataStream';
import Navigation from '@/components/Navigation';
import Logo from '@/components/Logo';
import Instruction from '@/components/Instruction';
import Scanline from '@/components/Scanline';

const Index = () => {
  return (
    <div className="relative w-full h-full bg-background overflow-hidden">
      <DataStream />
      <Scanline />
      <Navigation />
      <Logo isInverted={false} />
      <Instruction />
    </div>
  );
};

export default Index;
