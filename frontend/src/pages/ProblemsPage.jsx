import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import { PROBLEMS } from '../data/problems';
import { ChevronRight, Code2Icon } from 'lucide-react';
import { getBadgeColor } from '../lib/utils';

const Problems = () => {
  const problems = Object.values(PROBLEMS);
  const easyProblemsCount = problems.filter(
    (p) => p.difficulty.toLowerCase() === 'easy',
  ).length;
  const mediumProblemsCount = problems.filter(
    (p) => p.difficulty.toLowerCase() === 'medium',
  ).length;
  const hardProblemsCount = problems.filter(
    (p) => p.difficulty.toLowerCase() === 'hard',
  ).length;

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="max-w-6xl px-4 py-12 mx-auto">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
          <p className="text-base-content/70">
            Sharpen your coding skills with these curated problems
          </p>
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problems/${problem.id}`}
              className="card bg-base-100 shadow-xl hover:scale-[1.01] transition-transform duration-200"
            >
              <div className="card-body">
                <div className="flex items-start gap-4">
                  {/* LEFT */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="size-12 bg-primary/20 flex items-center justify-center rounded-lg">
                        <Code2Icon className="size-6 text-white" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-bold">{problem.title}</h2>
                          <span className={getBadgeColor(problem.difficulty)}>
                            {problem.difficulty}
                          </span>
                        </div>
                        <p className="text-base-content/60 text-xs">
                          {problem.category}
                        </p>
                      </div>
                    </div>
                    <p className=" text-base-content/80 mb-3">
                      {problem.description.text}
                    </p>
                  </div>
                  {/* RIGHT */}
                  <div className="flex items-center gap-2 text-success/50">
                    <span className="text-sm font-medium">Solve</span>
                    <ChevronRight className="size-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* STAT FOOTER */}
        <div className="card bg-base-100 mt-12 shadow-lg">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal text-center">
              <div className="stat">
                <div className="stat-title text-xl">Total Problems</div>
                <div className="stat-value text-primary">{problems.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title text-xl">Easy</div>
                <div className="stat-value text-success">
                  {easyProblemsCount}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title text-xl">Medium</div>
                <div className="stat-value text-warning">
                  {mediumProblemsCount}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title text-xl">Hard</div>
                <div className="stat-value text-error">{hardProblemsCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;
