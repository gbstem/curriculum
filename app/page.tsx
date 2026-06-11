import Link from 'next/link';
import { tracks } from './data/tracks';

export default function Home() {
  return (
    <div className="d-flex align-items-center container min-h-[80vh] py-5">
      <div className="row justify-content-center g-4 w-100">
        <div className="col-12 mb-4 text-center">
          <h1 className="fw-bold display-5 mb-2 text-indigo-950">Choose a Curriculum Track</h1>
          <p className="text-muted fs-5 mb-0">Select a subject to get started.</p>
        </div>

        {tracks.map((track) => (
          <div key={track.id} className="col-md-6 col-lg-3">
            <div className="card hover-lift h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column p-4 text-center">
                <i className={`${track.homeIcon} ${track.homeIconColorClass} mb-3`}></i>
                <h5 className="card-title fw-bold mb-2">{track.title}</h5>
                <p className="card-text text-muted fs-6 mb-3">{track.description}</p>
                <Link
                  href={`/${track.id}`}
                  className={`btn btn-${track.homeBtnVariant} mt-auto w-100`}
                >
                  Explore {track.shortTitle}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
