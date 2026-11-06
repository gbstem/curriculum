import Link from 'next/link';
import { CARD_ICON, CARD_LIFT } from './components/cardStyles';
import { tracks } from './data/tracks';

export default function Home() {
  return (
    <div className="site-container flex min-h-[80vh] items-center py-12">
      {/* TODO: the grid is 1.5rem narrower than the page column, so the cards sit off center.
          That matches the old layout; use w-full to center them. */}
      <div className="grid w-[calc(100%-1.5rem)] gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-full mb-6 text-center">
          <h1 className="mb-2 text-display-5 font-bold">Choose a Curriculum Track</h1>
          <p className="mb-0 text-h5 text-muted">Select a subject to get started.</p>
        </div>

        {tracks.map((track) => (
          <div key={track.id} className={CARD_LIFT}>
            <div className="flex flex-auto flex-col p-6 text-center">
              <i className={`${track.homeIcon} ${track.homeIconColorClass} mb-4 ${CARD_ICON}`}></i>
              <h5 className="mb-2 font-bold">{track.title}</h5>
              <p className="mb-4 text-base text-muted">{track.description}</p>
              <Link
                href={`/${track.id}`}
                className={`btn btn-${track.homeBtnVariant} mt-auto w-full`}
              >
                Explore {track.shortTitle}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
