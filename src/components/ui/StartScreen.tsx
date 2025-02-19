import { Button } from "@/components/ui/button";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h2 className="text-2xl font-bold">Welcome to the Quiz!</h2>
      <p className="text-gray-500">Test your knowledge with exciting questions.</p>
      <Button className="text-lg px-6 py-3 text-white " onClick={onStart}>
        Start Quiz
      </Button>
    </div>
  );
}
