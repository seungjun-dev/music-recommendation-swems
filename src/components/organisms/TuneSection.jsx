import EmptyState from "@/components/atoms/EmptyState";
import Note from "@/components/atoms/Note";
import ResetButton from "@/components/atoms/ResetButton";
import RichText from "@/components/atoms/RichText";
import SectionLine from "@/components/atoms/SectionLine";
import MoodResultItem from "@/components/molecules/MoodResultItem";
import MoodSlider from "@/components/molecules/MoodSlider";
import { MESSAGES, TUNE } from "@/constants/content";
import { MOOD_AXES, MOOD_RANGE } from "@/constants/mood";
import "./TuneSection.css";

export default function TuneSection({ profile, onChange, onReset, matches, loadFailed, onSelectMatch }) {
  return (
    <section className="tune" id="tune">
      <SectionLine left={TUNE.line[0]} right={TUNE.line[1]} />
      <div className="tune-heading">
        <div>
          <h2><RichText segments={TUNE.title} /></h2>
          <p>{TUNE.description}</p>
        </div>
        <ResetButton onClick={onReset}>{TUNE.reset}</ResetButton>
      </div>
      <div className="tuner-card">
        <div className="sliders">
          {MOOD_AXES.map((axis) => (
            <MoodSlider key={axis.key} axis={axis} range={MOOD_RANGE} value={profile[axis.key]} onChange={onChange} />
          ))}
        </div>
        <div className="mood-results">
          <div className="mood-result-head">
            <div>
              <span>{TUNE.resultTag}</span>
              <p>{TUNE.resultDescription}</p>
            </div>
            <span className="match-stamp"><RichText segments={TUNE.stamp} /></span>
          </div>
          <div className="mood-result-list" aria-live="polite">
            {loadFailed ? (
              <EmptyState variant="mood">{MESSAGES.loadError}</EmptyState>
            ) : (
              matches.map((song, index) => <MoodResultItem key={song.id} rank={index + 1} song={song} onSelect={onSelectMatch} />)
            )}
          </div>
        </div>
      </div>
      <Note>{TUNE.note}</Note>
    </section>
  );
}
