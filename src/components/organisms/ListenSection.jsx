import Note from "@/components/atoms/Note";
import RichText from "@/components/atoms/RichText";
import SectionLine from "@/components/atoms/SectionLine";
import { LISTEN } from "@/constants/content";
import ListenPanel from "./ListenPanel";
import SongLibrary from "./SongLibrary";
import "./ListenSection.css";

export default function ListenSection({ ref, library, panel }) {
  return (
    <section className="listen" id="listen" ref={ref}>
      <SectionLine left={LISTEN.line[0]} right={LISTEN.line[1]} />
      <div className="listen-heading">
        <h2><RichText segments={LISTEN.title} /></h2>
        <p><RichText segments={LISTEN.description} /></p>
      </div>
      <div className="player-card">
        <SongLibrary {...library} />
        <ListenPanel {...panel} />
      </div>
      <Note>{LISTEN.note}</Note>
    </section>
  );
}
