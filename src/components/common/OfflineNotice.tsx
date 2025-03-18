
import { Database } from "lucide-react";

const OfflineNotice = () => {
  return (
    <div className="mt-4 mx-auto max-w-md bg-blue-50 border border-blue-200 p-3 rounded-md flex items-center gap-2">
      <Database className="w-4 h-4 text-blue-500" />
      <p className="text-sm text-blue-700">
        Aplicação em modo demo. Dados carregados localmente.
      </p>
    </div>
  );
};

export default OfflineNotice;
