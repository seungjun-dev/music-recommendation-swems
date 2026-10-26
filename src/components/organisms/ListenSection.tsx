import Note from "@/components/atoms/Note";
import RichText from "@/components/atoms/RichText";
import SectionLine from "@/components/atoms/SectionLine";
import { LISTEN } from "@/constants/content";
import type { Ref } from "react";
import ListenPanel, { type ListenPanelProps } from "./ListenPanel";
import SongLibrary, { type SongLibraryProps } from "./SongLibrary";
import "./ListenSection.css";

interface ListenSectionProps {
  ref?: Ref<HTMLElement>;
  library: SongLibraryProps;
  panel: ListenPanelProps;
}

export default function ListenSection({ ref, library, panel }: ListenSectionProps) {
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
