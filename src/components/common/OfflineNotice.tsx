
import { WifiOff } from "lucide-react";

const OfflineNotice = () => {
  return (
    <div className="mt-4 mx-auto max-w-md bg-amber-50 border border-amber-200 p-3 rounded-md flex items-center gap-2">
      <WifiOff className="w-4 h-4 text-amber-500" />
      <p className="text-sm text-amber-700">
        Modo offline ativado. Alguns recursos estão limitados.
      </p>
    </div>
  );
};

export default OfflineNotice;
