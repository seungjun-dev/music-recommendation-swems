import EmptyState from "@/components/atoms/EmptyState";
import SearchField from "@/components/molecules/SearchField";
import SongRow from "@/components/molecules/SongRow";
import { LISTEN, MESSAGES } from "@/constants/content";
import { padNumber } from "@/lib/format";
import "./SongLibrary.css";

export default function SongLibrary({ songs, totalCount, loadFailed, query, onQueryChange, searchRef, selectedId, onSelect }) {
  let content;
  if (loadFailed) content = <EmptyState>{MESSAGES.loadError}</EmptyState>;
  else if (!songs.length && totalCount) content = <EmptyState>{MESSAGES.noResults}</EmptyState>;
  else content = songs.map((song) => <SongRow key={song.id} song={song} active={song.id === selectedId} onSelect={onSelect} />);

  return (
    <div className="library">
      <div className="library-title">
        {LISTEN.libraryTitle} <span className="demo-count">{padNumber(totalCount)} TRACKS</span>
      </div>
      <SearchField
        ref={searchRef}
        id="song-search"
        value={query}
        placeholder={LISTEN.searchPlaceholder}
        ariaLabel="곡 검색"
        onChange={onQueryChange}
      />
      <div className="song-list">{content}</div>
      <small>{LISTEN.libraryHint}</small>
    </div>
  );
}
