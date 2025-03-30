import { useEffect } from "react";
import { CalendarIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export const CreateProjects1 = () => (
  <ThemeWrapper>
    <div className="min-h-screen bg-[var(--backgroundLight)] dark:bg-[var(--backgroundDark)] p-6 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 border-l-4 border-[var(--primary)] dark:border-[var(--primaryDark)] pl-6">
          <h1 className="font-playfair text-2xl sm:text-3xl mb-2 text-[var(--textLight)] dark:text-[var(--textDark)]">
            New Project Brief
          </h1>
          <p className="text-sm sm:text-base text-[var(--textLight)]/80 dark:text-[var(--textDark)]/80">
            Complete your custom project requirements
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
          <div className="space-y-6">
            <Input
              label="Company Name"
              placeholder="Enter official business name"
            />
            <Input label="Industry" placeholder="Select primary industry" />
          </div>
          <div className="space-y-6">
            <Input
              label="Brand Colors"
              placeholder="Enter hex codes or color names"
            />
            <Input label="Competitor References" placeholder="Website URLs" />
          </div>
        </div>
        <button className="mt-8 w-full py-4 bg-[var(--primary)] dark:bg-[var(--primaryDark)] hover:bg-[var(--primaryHover)] dark:hover:bg-[var(--primaryHoverDark)] text-white rounded-xl transition-colors">
          Submit Project
        </button>
      </div>
    </div>
  </ThemeWrapper>
);

export const CreateProjects2 = () => (
  <ThemeWrapper>
    <div className="min-h-screen bg-[var(--cardLight)] dark:bg-[var(--cardDark)] grid md:grid-cols-3">
      <aside className="md:col-span-1 bg-[var(--backgroundLight)] dark:bg-[var(--backgroundDark)] p-6 border-r border-[var(--primary)]/20 dark:border-[var(--primaryDark)]/30 sticky top-0 h-screen">
        <h3 className="font-playfair text-xl mb-4 text-[var(--textLight)] dark:text-[var(--textDark)]">
          Project Sections
        </h3>
        <nav className="space-y-4">
          {["Overview", "Branding", "Content", "Delivery"].map((item) => (
            <div
              key={item}
              className="text-sm text-[var(--textLight)]/80 dark:text-[var(--textDark)]/80 hover:text-[var(--primary)] dark:hover:text-[var(--primaryDark)] cursor-pointer transition-colors"
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>
      <main className="md:col-span-2 p-6 sm:p-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-playfair text-2xl mb-6 text-[var(--textLight)] dark:text-[var(--textDark)]">
            Brand Identity
          </h2>
          <div className="space-y-8">
            <Input label="Brand Story" type="textarea" rows={4} />
            <Input label="Target Audience" />
            <Input label="Visual References" type="file" />
          </div>
        </div>
      </main>
    </div>
  </ThemeWrapper>
);

export const CreateProjects3 = () => (
  <ThemeWrapper>
    <div className="min-h-screen bg-[var(--backgroundDark)] p-6 sm:p-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-[var(--primaryDark)]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="w-12 h-12 bg-[var(--primaryDark)] rounded-full" />
          </div>
          <h1 className="font-playfair text-2xl sm:text-3xl text-[var(--textDark)] mb-2">
            Custom Project Setup
          </h1>
        </div>
        <div className="bg-[var(--cardDark)] rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Project Timeline"
              placeholder="Expected completion date"
              darkMode
            />
            <Input
              label="Budget Range"
              placeholder="Select budget bracket"
              darkMode
            />
            <Input label="Preferred Style" type="textarea" rows={3} darkMode />
            <div className="space-y-4">
              <label className="block text-[var(--textDark)]/80 text-xs">
                Mood Board
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-[var(--backgroundDark)] rounded-xl border border-[var(--primaryDark)]/30"
                  />
                ))}
              </div>
            </div>
          </div>
          <button className="mt-6 w-full py-3 bg-[var(--primaryDark)] hover:bg-[var(--primaryHoverDark)] rounded-xl transition-colors text-white">
            Launch Project
          </button>
        </div>
      </div>
    </div>
  </ThemeWrapper>
);

export const CreateProjects4 = () => (
  <ThemeWrapper>
    <div className="min-h-screen bg-[var(--backgroundLight)] dark:bg-[var(--backgroundDark)] flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-2xl">
        <div className="bg-[var(--cardLight)] dark:bg-[var(--cardDark)] rounded-3xl shadow-xl p-6 sm:p-12">
          <div className="flex items-center gap-4 sm:gap-6 mb-6">
            <div className="w-10 h-10 bg-[var(--primary)]/10 dark:bg-[var(--primaryDark)]/10 rounded-full flex items-center justify-center text-[var(--primary)] dark:text-[var(--primaryDark)]">
              1
            </div>
            <h2 className="font-playfair text-xl sm:text-2xl text-[var(--textLight)] dark:text-[var(--textDark)]">
              Project Requirements
            </h2>
          </div>
          <div className="space-y-6">
            <Input label="Project Name" placeholder="Enter project codename" />
            <Input label="Key Objectives" type="textarea" rows={3} />
            <Input
              label="Design References"
              placeholder="Pinterest board or URLs"
            />
            <button className="w-full py-3 bg-[var(--primary)] dark:bg-[var(--primaryDark)] hover:bg-[var(--primaryHover)] dark:hover:bg-[var(--primaryHoverDark)] text-white rounded-xl transition-colors">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  </ThemeWrapper>
);

export const CreateProjects5 = () => (
  <ThemeWrapper>
    <div className="min-h-screen bg-[var(--cardLight)] dark:bg-[var(--cardDark)] p-6 sm:p-12">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-6">
        <aside className="w-full sm:w-64 border-r border-[var(--primary)]/20 dark:border-[var(--primaryDark)]/30 pr-4 sm:pr-12">
          <h3 className="font-playfair text-xl mb-4 text-[var(--textLight)] dark:text-[var(--textDark)]">
            Project Setup
          </h3>
          <div className="space-y-2 text-sm text-[var(--textLight)]/80 dark:text-[var(--textDark)]/80">
            <div className="text-[var(--primary)] dark:text-[var(--primaryDark)]">
              1. Basic Info
            </div>
            <div>2. Brand Details</div>
            <div>3. Content Strategy</div>
            <div>4. Review</div>
          </div>
        </aside>
        <main className="flex-1">
          <h2 className="font-playfair text-2xl mb-6 text-[var(--textLight)] dark:text-[var(--textDark)]">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Project Title" />
            <Input label="Project Type" />
            <Input label="Launch Date" type="date" />
            <Input label="Budget Estimate" />
          </div>
        </main>
      </div>
    </div>
  </ThemeWrapper>
);

export const CreateProjects6 = () => (
  <ThemeWrapper>
    <div className="min-h-screen bg-[var(--backgroundLight)] dark:bg-[var(--backgroundDark)] p-6 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="font-playfair text-2xl sm:text-3xl text-[var(--textLight)] dark:text-[var(--textDark)] mb-4">
            Project Timeline
          </h1>
          <div className="h-px w-24 bg-[var(--primary)] dark:bg-[var(--primaryDark)] mx-auto" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {["Discovery", "Design", "Development", "Launch"].map(
              (phase, idx) => (
                <div
                  key={phase}
                  className="flex items-start gap-4 p-4 bg-[var(--cardLight)] dark:bg-[var(--cardDark)] rounded-xl"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      idx === 0
                        ? "bg-[var(--primary)] dark:bg-[var(--primaryDark)] text-white"
                        : "bg-[var(--primary)]/10 dark:bg-[var(--primaryDark)]/10"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-playfair text-[var(--textLight)] dark:text-[var(--textDark)]">
                      {phase}
                    </h3>
                    <p className="text-sm text-[var(--textLight)]/80 dark:text-[var(--textDark)]/80 mt-1">
                      Phase {idx + 1} timeline details
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="bg-[var(--cardLight)] dark:bg-[var(--cardDark)] rounded-xl p-6 shadow-lg">
            <div className="aspect-video bg-[var(--backgroundLight)] dark:bg-[var(--backgroundDark)] rounded-lg border-2 border-dashed border-[var(--primary)]/30 dark:border-[var(--primaryDark)]/30 flex items-center justify-center">
              <div className="text-center">
                <CalendarIcon className="w-8 h-8 text-[var(--primary)] dark:text-[var(--primaryDark)] mx-auto mb-2" />
                <p className="text-sm text-[var(--textLight)]/80 dark:text-[var(--textDark)]/80">
                  Timeline visualization
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ThemeWrapper>
);

export const CreateProjects7 = () => (
  <ThemeWrapper>
    <div className="min-h-screen bg-[var(--backgroundLight)] dark:bg-[var(--backgroundDark)] p-6 sm:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="font-playfair text-2xl sm:text-3xl text-[var(--textLight)] dark:text-[var(--textDark)] mb-2">
            Final Review
          </h1>
          <p className="text-[var(--textLight)]/80 dark:text-[var(--textDark)]/80">
            Confirm your project details
          </p>
        </div>
        <div className="bg-[var(--cardLight)] dark:bg-[var(--cardDark)] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="space-y-8">
            <div className="border-b border-[var(--primary)]/20 dark:border-[var(--primaryDark)]/30 pb-6">
              <h2 className="font-playfair text-xl text-[var(--textLight)] dark:text-[var(--textDark)] mb-4">
                Project Summary
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <DetailItem
                  label="Project Name"
                  value="Luxury Resort Website"
                />
                <DetailItem label="Budget" value="$15,000 - $20,000" />
                <DetailItem label="Timeline" value="12 weeks" />
                <DetailItem label="Status" value="Ready to Launch" />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-playfair text-lg text-[var(--textLight)] dark:text-[var(--textDark)]">
                Approval Checklist
              </h3>
              {[
                "Brand Guidelines",
                "Content Strategy",
                "Technical Specs",
                "Legal Compliance",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[var(--primary)] dark:text-[var(--primaryDark)]" />
                  <span className="text-[var(--textLight)] dark:text-[var(--textDark)]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-[var(--primary)] dark:bg-[var(--primaryDark)] hover:bg-[var(--primaryHover)] dark:hover:bg-[var(--primaryHoverDark)] text-white rounded-xl transition-colors font-playfair">
              Confirm & Launch Project
            </button>
          </div>
        </div>
      </div>
    </div>
  </ThemeWrapper>
);

// Supporting Components
 const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center p-3 bg-[var(--backgroundLight)] dark:bg-[var(--backgroundDark)] rounded-lg">
    <span className="text-[var(--textLight)]/80 dark:text-[var(--textDark)]/80">
      {label}:
    </span>
    <span className="text-[var(--textLight)] dark:text-[var(--textDark)] font-medium">
      {value}
    </span>
  </div>
);

 const Input = ({ label, type = "text", darkMode = false, ...props }) => (
  <div className="space-y-2">
    <label className="block text-sm text-[var(--textLight)]/80 dark:text-[var(--textDark)]/80">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        className={`w-full bg-[var(--backgroundLight)] dark:bg-[var(--backgroundDark)] rounded-lg p-3 border border-[var(--primary)]/30 dark:border-[var(--primaryDark)]/30 focus:ring-2 focus:ring-[var(--primary)] dark:focus:ring-[var(--primaryDark)] ${
          darkMode ? "text-[var(--textDark)]" : "text-[var(--textLight)]"
        }`}
        {...props}
      />
    ) : (
      <input
        type={type}
        className={`w-full bg-[var(--backgroundLight)] dark:bg-[var(--backgroundDark)] rounded-lg p-3 border border-[var(--primary)]/30 dark:border-[var(--primaryDark)]/30 focus:ring-2 focus:ring-[var(--primary)] dark:focus:ring-[var(--primaryDark)] ${
          darkMode ? "text-[var(--textDark)]" : "text-[var(--textLight)]"
        }`}
        {...props}
      />
    )}
  </div>
);

const ThemeWrapper = ({ children }) => {
  useEffect(() => {
    document.body.classList.add("bg-[var(--backgroundLight)]", "dark:bg-[var(--backgroundDark)]");
  }, []);

  return <>{children}</>;
};
