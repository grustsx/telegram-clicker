export default function StarrySky() {
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            circle at 415px 210px,      
            #161439 20%,     
            #000000 60%   
          )`,
        }}
      />

      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
