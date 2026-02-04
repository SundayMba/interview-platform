import { Loader2Icon, PlayIcon } from 'lucide-react';
import { LANGUAGE_CONFIG } from '../data/problems';
import { Editor } from '@monaco-editor/react';

const CodeEditor = ({
  code,
  onRunCode,
  onLanguageChange,
  selectedLanguage,
  onCodeChange,
  isRunning = false,
}) => {
  // console.log(selectedLanguage, code);
  return (
    <div className="bg-base-300 flex flex-col h-full w-full overflow-hidden">
      <div className="flex items-center justify-between bg-base-100 px-4 py-3 shrink-0">
        <div className="flex items-center gap-3">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="size-6"
          />
          <select
            className="select select-sm"
            value={selectedLanguage}
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <button
          disabled={isRunning}
          onClick={onRunCode}
          className="btn btn-primary btn-sm gap-2"
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <PlayIcon className="size-4" />
              <span>Run Code</span>
            </>
          )}
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <Editor
          height={'100%'}
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={(val) => {
            onCodeChange(val ?? '');
          }}
          theme="vs-dark"
          options={{
            fontSize: 16,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
