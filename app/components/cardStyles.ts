// The white, rounded card used for the track and course choices. It lifts and casts a deeper
// shadow on hover, and grows a `CARD_ICON` icon inside it.
export const CARD_LIFT =
  'group relative flex h-full min-w-0 flex-col overflow-hidden rounded-card bg-white wrap-break-word shadow-sm transition-[transform,box-shadow] duration-200 ease-in-out hover:transform-[translateY(-5px)] hover:shadow-lift';

export const CARD_ICON =
  'transition-transform duration-200 ease-in-out group-hover:transform-[scale(1.1)]';
