interface InstructionProps {
  text?: string;
}

const Instruction = ({ text = "DRAG TO DECODE REALITY" }: InstructionProps) => {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 instruction text-muted-foreground">
      {text}
    </div>
  );
};

export default Instruction;
