import { useMemo, useRef, useState } from "react";
import HeroSection from "@/components/organisms/HeroSection";
import ListenSection from "@/components/organisms/ListenSection";
import MethodSection from "@/components/organisms/MethodSection";
import SiteFooter from "@/components/organisms/SiteFooter";
import SiteHeader from "@/components/organisms/SiteHeader";
import TuneSection from "@/components/organisms/TuneSection";
import WhySection from "@/components/organisms/WhySection";
import RoomTemplate from "@/components/templates/RoomTemplate";
import { MOOD_MATCH_LIMIT, RECOMMENDATION_LIMIT } from "@/constants/mood";
import { useFocusShortcut } from "@/hooks/useFocusShortcut";
import { useMoodProfile } from "@/hooks/useMoodProfile";
import { useSongs } from "@/hooks/useSongs";
import { useTheme } from "@/hooks/useTheme";
import { matchProfile, nearestSongs } from "@/lib/recommend";
import { searchSongs } from "@/lib/search";

export default function RoomPage() {
  const { songs, status } = useSongs();
  const { isDark, toggle } = useTheme();
  const { profile, setValue, reset } = useMoodProfile();
  const [query, setQuery] = useState("");
  const [pickedId, setPickedId] = useState(null);
  const listenRef = useRef(null);
  const searchRef = useRef(null);
  useFocusShortcut(searchRef);

  const loadFailed = status === "error";
  // 아직 고르지 않았으면 첫 곡을 보여준다.
  const selectedSong = songs.find((song) => song.id === pickedId) ?? songs[0] ?? null;
  const matches = useMemo(() => matchProfile(songs, profile, MOOD_MATCH_LIMIT), [songs, profile]);
  const recommendations = useMemo(
    () => (selectedSong ? nearestSongs(songs, selectedSong, RECOMMENDATION_LIMIT) : []),
    [songs, selectedSong],
  );
  const visibleSongs = useMemo(() => searchSongs(songs, query), [songs, query]);

  const selectFromMood = (id) => {
    setQuery("");
    setPickedId(id);
    listenRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <RoomTemplate header={<SiteHeader isDark={isDark} onToggleTheme={toggle} />} footer={<SiteFooter />}>
      <HeroSection />
      <WhySection />
      <MethodSection />
      <TuneSection
        profile={profile}
        onChange={setValue}
        onReset={reset}
        matches={matches}
        loadFailed={loadFailed}
        onSelectMatch={selectFromMood}
      />
      <ListenSection
        ref={listenRef}
        library={{
          songs: visibleSongs,
          totalCount: songs.length,
          loadFailed,
          query,
          onQueryChange: setQuery,
          searchRef,
          selectedId: selectedSong?.id,
          onSelect: setPickedId,
        }}
        panel={{ song: selectedSong, recommendations, onSelect: setPickedId }}
      />
    </RoomTemplate>
  );
}
