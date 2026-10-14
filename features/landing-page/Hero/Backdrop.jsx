import { useState } from 'react';
import { photoUrl } from '../content';

export default function Backdrop({ category }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ background: category.fallback }}
    >
      {!failed && (
        <img
          src={photoUrl(category)}
          srcSet={`${photoUrl(category, 960)} 960w, ${photoUrl(category)} 1920w`}
          sizes="100vw"
          alt=""
          width="1920"
          height="1280"
          loading="eager"
          fetchPriority={category.id === 'expert' ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full animate-reveal object-cover"
          style={{ objectPosition: category.imagePosition }}
        />
      )}
      <div className="huavela-hero-wash absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-mist to-transparent" />
    </div>
  );
}
