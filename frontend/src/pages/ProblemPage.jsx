import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProblemDescription from '../components/ProblemDescription';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { PROBLEMS } from '../data/problems';
import { useNavigate, useParams } from 'react-router';
import CodeEditor from '../components/CodeEditor';
import { executeCode } from '../lib/piston';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import OutputPanel from '../components/Output';

const ProblemPage = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [currentProblemId, setCurrentProblemId] = useState('two-sum');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isRunning, setIsRunning] = useState(false);
  const [code, setCode] = useState(
    PROBLEMS[currentProblemId].starterCode.javascript || '',
  );
  const [output, setOutput] = useState(null);
  const currentProblem = PROBLEMS[currentProblemId];

  useEffect(() => {
    if (problemId && PROBLEMS[problemId]) {
      setCurrentProblemId(problemId);
      setCode(PROBLEMS[problemId].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [problemId, selectedLanguage]);

  const problem = PROBLEMS[currentProblemId];

  const onProblemChange = (newProblemId) =>
    navigate(`/problems/${newProblemId}`);

  const normalizeOutput = (output) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split('\n')
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, '[')
          .replace(/\s+\]/g, ']')
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ',')
          .replace(/'/g, '"'),
      )
      .filter((line) => line.length > 0)
      .join('\n');
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);
    // console.log(normalizedActual, normalizedExpected);
    return normalizedActual == normalizedExpected;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    // check if code executed successfully and matches expected output

    if (result.success) {
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
      const testsPassed = checkIfTestsPassed(result.output, expectedOutput);
      // console.log(result.output, expectedOutput, testsPassed);

      if (testsPassed) {
        triggerConfetti();
        toast.success('All tests passed! Great job!');
      } else {
        toast.error('Tests failed. Check your output!');
      }
    } else {
      toast.error('Code execution failed!');
    }
  };

  const onLanguageChange = (event) => {
    const newLang = event.target.value;
    setSelectedLanguage(newLang);
    setCode(problem.starterCode[newLang]);
    // console.log(selectedLanguage, code);
    setOutput(null);
  };

  return (
    <div className="bg-base-100 flex flex-col w-full h-screen overflow-hidden">
      <Navbar />
      <div className="flex-1 flex min-h-0 mb-1">
        <Group
          orientation="horizontal"
          className="w-full h-full overflow-hidden"
        >
          <Panel
            defaultSize={40}
            minSize={30}
            className="h-full border-2 border-primary/60 shadow-sm bg-base-200 rounded-sm mx-1"
          >
            <ProblemDescription
              problem={problem}
              onProblemChange={onProblemChange}
              currentProblemId={currentProblemId}
              allProblems={Object.values(PROBLEMS)}
            />
          </Panel>
          <Separator className="w-2 bg-base-300 hover:bg-primary transition-colors duration-200 cursor-col-resize">
            {' '}
            <div className="mx-auto h-full w-px bg-neutral-800" />{' '}
          </Separator>
          <Panel defaultSize={60} minSize={40}>
            <Group
              orientation="vertical"
              className="w-full h-full overflow-hidden"
            >
              <Panel
                defaultSize={70}
                minSize={30}
                className="h-full border-2 border-primary/60 shadow-sm bg-base-200 rounded-sm mx-1"
              >
                <CodeEditor
                  selectedLanguage={selectedLanguage}
                  code={code}
                  onRunCode={handleRunCode}
                  onLanguageChange={onLanguageChange}
                  onCodeChange={setCode}
                  isRunning={isRunning}
                ></CodeEditor>
              </Panel>
              <Separator className="h-1 bg-base-300 hover:bg-primary transition-colors duration-200 cursor-row-resize" />
              <Panel
                defaultSize={30}
                minSize={30}
                className="h-full border-2 border-primary/60 shadow-sm bg-base-200 rounded-sm mx-1"
              >
                <OutputPanel output={output} />
              </Panel>
            </Group>
          </Panel>
        </Group>
      </div>
    </div>
  );
};

export default ProblemPage;
